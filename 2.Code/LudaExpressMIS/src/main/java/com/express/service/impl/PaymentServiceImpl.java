package com.express.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.djbh.mapper.contract.ContractMapper;
import com.djbh.mapper.project.PaymentMapper;
import com.djbh.mapper.project.ProjectMapper;
import com.djbh.model.contract.Contract;
import com.djbh.model.project.Payment;
import com.djbh.model.project.Project;
import com.djbh.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	ProjectMapper projectmapper;
	
	@Autowired
	ContractMapper contractmapper;
	
	@Autowired
	PaymentMapper paymentmapper;
	
	@Override
	public int save(Payment pay) {
		int staut = 0;
		Project pro = projectmapper.getByPid(pay.getP_id().getP_id());
		double money = pay.getPay_money();
		double paymoney = pro.getPayable_money();
		double yfmoney = pro.getPayment_money();
		double progress = Double.parseDouble(String.format("%.2f", (money + yfmoney) / paymoney * 100));
		String planning_type = "IT0401";
		pay.setP_money(yfmoney);
		if (progress > 0 && progress < 100) {
			planning_type = "IT0402";
		} else if (progress >= 100) {
			planning_type = "IT0403";
		}
		
		if (money > paymoney - yfmoney) {
			staut = 2;
		} else if (money < 0) {
			staut = 3;
		} else {
			if (paymentmapper.save(pay)
					&& projectmapper.updateMoney(pro.getP_id(), money + yfmoney, progress, planning_type)) {
				if("签订合同".equals(pro.getP_tagle()) && "软件".equals(pro.getOverall_type()) || "硬件".equals(pro.getOverall_type())) {
					projectmapper.updateTagle(pro.getP_id(), "IT0106");
				}
				if(progress < 100) {
					List<Contract> list = contractmapper.getListByPId(pro.getP_id());
					for(int i = 0; i < list.size(); i++) {
						Contract con = list.get(i);
						con.setTagle("1");
						if(Integer.parseInt(con.getMode()) <= con.getPaylist().size()) {
							int num = Integer.parseInt(con.getMode()) + 1;
							con.setMode(num+"");
						}
						
						
						contractmapper.updateByTagle(con);
					}
				}else {
					List<Contract> list = contractmapper.getListByPId(pro.getP_id());
					for(int i = 0; i < list.size(); i++) {
						Contract con = list.get(i);
						con.setTagle("0");
						if(Integer.parseInt(con.getMode()) <= con.getPaylist().size()) {
							int num = Integer.parseInt(con.getMode()) + 1;
							con.setMode(num+"");
						}
						contractmapper.updateByTagle(con);
					}
				}
				staut = 1;
			}
		}
		return staut;
	}


	
}

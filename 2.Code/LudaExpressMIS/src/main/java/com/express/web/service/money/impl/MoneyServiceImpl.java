package com.express.web.service.money.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.money.MoneyMapper;
import com.express.web.mapper.order_mapper.DeliverGoodMapper;
import com.express.web.model.money.ColumnarMoney;
import com.express.web.model.money.Money;
import com.express.web.model.money.MoneyTable;
import com.express.web.service.money.MoneyService;

/**
 * 发货管理业务层实现类
 * 
 * @author Administrator
 *
 */
@Service
public class MoneyServiceImpl implements MoneyService {

	@Autowired
	MoneyMapper moneyMapper;
	@Autowired
	DeliverGoodMapper deliverMapper;

	@Override
	public List<Money> getMoneyList() {
		return moneyMapper.getMoneyList();
	}

	@Override
	public List<ColumnarMoney> getMoneyColumn() {
		List<ColumnarMoney> list = new ArrayList<ColumnarMoney>();
		String month = "";
		for(int i = 1;i< 13;i++) {
			if(i < 10) {
				month = "0"+i;
			}else {
				month = i+"";
			}
			ColumnarMoney col  = deliverMapper.getColumnar("2019", month);
			if(col == null) {
				col = new ColumnarMoney();
				col.setDateMonth(month);
				col.setMoney(0d);
			}
			list.add(col);
		}
		return list;
	}

	@Override
	public List<ColumnarMoney> getMoneyColumnYear() {
		List<ColumnarMoney> list = new ArrayList<ColumnarMoney>();
		Calendar calendar = Calendar.getInstance();
		int year = Integer.parseInt(String.valueOf(calendar.get(calendar.YEAR)));
		for(int i = year;i > year-5 ;i--) {
			ColumnarMoney col  = deliverMapper.getColumnarYear(i+"");
			if(col == null) {
				col = new ColumnarMoney();
				col.setDateMonth(i+"");
				col.setMoney(0d);
			}
			list.add(col);
		}
		return list;
	}

	@Override
	public List<MoneyTable> getMoneyTable() {
		List<MoneyTable> list = deliverMapper.getMoneyTable();
		if(list != null) {
			for (MoneyTable moneyTable : list) {
				if(moneyTable.getOrderState() == 0) {
					moneyTable.setOrderStateName("预约");
				}else if(moneyTable.getOrderState() == 1) {
					moneyTable.setOrderStateName("揽件");
				}else if(moneyTable.getOrderState() == 2) {
					moneyTable.setOrderStateName("运输中");
				}else if(moneyTable.getOrderState() == 3) {
					moneyTable.setOrderStateName("派送中");
				}else {
					moneyTable.setOrderStateName("已签收");
				}
			}
		}
		return list;
	}
}

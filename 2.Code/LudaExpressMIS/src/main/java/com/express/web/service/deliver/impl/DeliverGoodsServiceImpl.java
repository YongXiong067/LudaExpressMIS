package com.express.web.service.deliver.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.company.DotMapper;
import com.express.web.mapper.order_mapper.DeliverGoodMapper;
import com.express.web.mapper.sys.SysUserMapper;
import com.express.web.model.company.Dot;
import com.express.web.model.order_model.Orders;
import com.express.web.model.sys.SysUser;
import com.express.web.service.deliver.DeliverGoodsService;
/**
 * 	发货管理业务层实现类
 * @author Administrator
 *
 */
@Service
public class DeliverGoodsServiceImpl implements DeliverGoodsService {

	@Autowired
	DeliverGoodMapper deliverMapper;
	@Autowired
	private SysUserMapper userMapper;
    @Autowired
    private DotMapper dotMapper;
	 
	@Override
	public List<Orders> getDeliverList(String search,int state,Long currId) {
		List<Orders> list = deliverMapper.getDeliverList(search,state,currId);
		for (Orders od : list) {
			Dot dot =  dotMapper.getDotById(od.getDotId());
            if(null!=dot){
                od.setDotName(dot.getDotName());
            }
			if(od.getCurrentUser() != null) {
            	SysUser user = userMapper.getLogin(Long.parseLong(od.getCurrentUser()));
            	if(user != null) {
            		od.setUserName(user.getUserName());
            	}
            }
		}
		return list;
	}

	@Override
	public boolean updateOrderState(Long orderId, Integer state) {
		return deliverMapper.update(orderId, state);
	}

	@Override
	public Orders getById(Long orderId) {
		return deliverMapper.getById(orderId);
	}

	@Override
	public boolean updateContent(Long orderid, String content) {
		return deliverMapper.updateContent(orderid, content);
	}
	
}

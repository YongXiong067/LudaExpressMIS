package com.express.web.service.deliver.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.order_mapper.DeliverGoodMapper;
import com.express.web.model.order_model.orders;
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
	
	@Override
	public List<orders> getDeliverList(String search,int state,Long currId) {
		List<orders> list = deliverMapper.getDeliverList(search,state,currId);
		return list;
	}

	@Override
	public boolean updateOrderState(Long orderId, Integer state) {
		return deliverMapper.update(orderId, state);
	}

	@Override
	public orders getById(Long orderId) {
		return deliverMapper.getById(orderId);
	}

	@Override
	public boolean updateContent(Long orderid, String content) {
		return deliverMapper.updateContent(orderid, content);
	}
	
}

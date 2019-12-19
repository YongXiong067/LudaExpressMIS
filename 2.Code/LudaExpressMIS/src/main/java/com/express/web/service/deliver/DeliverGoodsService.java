package com.express.web.service.deliver;

import java.util.List;

/**
 * 	发货管理业务层接口
 * @author Administrator
 *
 */
import com.express.web.model.order_model.orders;
public interface DeliverGoodsService {
	/**
	 * 	根据状态获取所有的订单列表
	 * 0预约，1揽件，2运输，3派送，4签收
	 * @param search
	 * @param state
	 * @return
	 */
	List<orders> getDeliverList(String search,int state);
	
	/**
	 * 	修改订单状态
	 * @param orderId 订单id
	 * @param state  订单状态
	 * @return
	 */
	boolean updateOrderState(Long orderId,Integer state);
	
}
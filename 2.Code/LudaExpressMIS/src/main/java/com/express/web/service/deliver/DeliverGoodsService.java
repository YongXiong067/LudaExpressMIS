package com.express.web.service.deliver;

import java.util.List;

/**
 * 	发货管理业务层接口
 * @author Administrator
 *
 */
import com.express.web.model.order_model.Orders;
public interface DeliverGoodsService {
	/**
	 * 	根据状态获取所有的订单列表
	 * 0预约，1揽件，2运输，3派送，4签收
	 * @param search
	 * @param state
	 * @return
	 */
	List<Orders> getDeliverList(String search,int state,Long currId);
	
	/**
	 * 	修改订单状态
	 * @param orderId 订单id
	 * @param state  订单状态
	 * @return
	 */
	boolean updateOrderState(Long orderId,Integer state);
	
	/**
	 * 根据订单id获取到详细的数据
	 * @param orderId
	 * @return
	 */
	Orders getById(Long orderId);
	
	/**
	 * 根据订单id修改订单步骤内容
	 * @param orderid
	 * @param content
	 * @return
	 */
	boolean updateContent(Long orderid,String content);
}

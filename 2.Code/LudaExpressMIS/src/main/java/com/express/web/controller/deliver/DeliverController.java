package com.express.web.controller.deliver;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.express.web.model.order_model.orders;
import com.express.web.service.deliver.DeliverGoodsService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * 	发货管理和揽件管理控制器
 * @author Administrator
 *
 */
@Api(value = "发货管理+揽件管理控制器",description ="发货管理+揽件管理控制器")
@Controller
@RequestMapping("/api/deliver")
public class DeliverController {
	@Autowired
	DeliverGoodsService deliverService;
	@Autowired
	HttpServletRequest request;

	/**
	 * 	获取所有待发货订单
	 * @param search  可根据订单号进行查询，采用模糊匹配
	 * @return
	 */
	@ApiOperation(value = "getCulture", notes = "查询出所有待发货列表")
	@PostMapping("/getDeliver")
	@ResponseBody
	public List<orders> getDeliverList(@ApiParam(value = "可根据订单号进行查询，采用模糊匹配，如若查全部，请传空字符串" ,required=true )@RequestParam String ordernum){
		System.out.println(ordernum);
		return deliverService.getDeliverList(ordernum,1);
	}
	
	/**
	 * 	选择订单，将订单的状态改为运输中
	 * @return
	 */
	@ApiOperation(value = "deliverGoods", notes = "将所选择的订单进行发货处理")
	@PostMapping("/deliverGoods")
	@ResponseBody
	public boolean deliverGoods(@ApiParam(value = "订单id" ,required=true )@RequestParam Long orderId) {
		return deliverService.updateOrderState(orderId, 2);
	}
}

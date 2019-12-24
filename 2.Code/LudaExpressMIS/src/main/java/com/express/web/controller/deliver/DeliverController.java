package com.express.web.controller.deliver;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
	 * 	获取所有订单
	 * 	0代表预约中的状态，为待揽件
	 * 	1代表揽件状态，等待发货
	 * @param search  可根据订单号进行查询，采用模糊匹配
	 * @return
	 */
	@ApiOperation(value = "getCulture", notes = "查询出所有待发货列表")
	@GetMapping("/getDeliver")
	@ResponseBody
	public List<orders> getDeliverList(@ApiParam(value = "可根据订单号进行查询，采用模糊匹配，如若查全部，请传空字符串" ,required=true )
	@RequestParam String ordernum,@RequestParam Integer state,@RequestParam String type){
		Long currentuser = null;
		//获取存储在session中的用户角色id
		HttpSession session = request.getSession(true);
		if(type.equals("op")) {
			currentuser = (Long)session.getAttribute("userId");
		}
		return deliverService.getDeliverList(ordernum,state,currentuser);
	}
	
	/**
	 * 	选择订单，将订单的状态改为运输中
	 *  如果状态是0预约，则改为1揽件  揽件
	 *  如果状态是1揽件，则改为2运输中  发货
	 * @return
	 */
	@ApiOperation(value = "deliverGoods", notes = "将所选择的订单进行发货处理")
	@GetMapping("/deliverGoods")
	@ResponseBody
	public boolean deliverGoods(@ApiParam(value = "订单id" ,required=true )@RequestParam Long orderId, @RequestParam Integer state) {
		boolean bool = false;
		try {
			String inintVule = null;
			switch (state){
				case 0: inintVule = "预约";break;
				case 1: inintVule = "揽件";break;
				case 2: inintVule = "运输中";break;
				case 3: inintVule = "派送中";break;
				case 4: inintVule = "已签收";break;
			}
			//时间格式化
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date();
			String nowDate = sdf.format(date);
			//获取存储在session中的用户角色id
			HttpSession session = request.getSession(true);
			Long userId = (Long)session.getAttribute("userId");
			String name = (String)session.getAttribute("userName");
			//查询出该订单的详细信息
			orders order = deliverService.getById(orderId);
			String content = "";
			//判断是否有该订单
			if(order != null) {
				//获取到原有的content值,先判断是否为空
				if(order.getContent() != null) {
					content = order.getContent();
					//如果值为空，则是第一次存储，需要去掉前面的；号
					if(content == "") {
						content +=name+","+inintVule+","+nowDate+"";
					}else {
						content +=";"+name+","+inintVule+","+nowDate+"";
					}
				}
			}
			//如果内容不为空，则根据id更改content值
			if(content != "") {
				deliverService.updateContent(orderId, content);
			}
			//更改订单的状态
			bool = deliverService.updateOrderState(orderId, state);
		}catch(Exception e) {
			bool = false;
		}
		return bool;
	}
}

package com.express.web.controller.order;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.express.web.model.order_model.Orders;
import com.express.web.service.order.orderServie;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import net.sf.json.JSONObject;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/18
 * @Description: 订单
 */
@RestController
@Api(value = "订单控制器",description ="订单控制器")
@RequestMapping("/api/order")
public class orderController {

    @Autowired
    private orderServie orderServie;

    @Autowired
    HttpServletRequest request;


    @ApiOperation(value = "getOrders", notes = "查找订单")
    @GetMapping("/getOrders")
    public List<Orders> getOrders(@ApiParam(value = "查询参数，可根据内容自动匹配" ,required=false )@RequestParam String search){
        return orderServie.listByAll(search);
    }



    /**
     * 修改订单
     * @param orders
     * @return  只有管理员才能修改
     */
    @ApiOperation(value = "updateOrders", notes = "修改订单")
    @PostMapping("/updateOrders")
    public Boolean updateOrders(@RequestBody  Orders orders){
        Boolean result = false;
        HttpSession session = request.getSession(true);
        int ruleId = (int)session.getAttribute("rolu");
        String name = (String)session.getAttribute("userName");
        //用户角色 0系统管理员，1普通用户，2快递员
        if(ruleId==0){
            if(orderServie.updaterOrder(orders,name)>0){
                result = true;
                return result;
            } else {
                System.out.println("修改失败");
                return result;
            }
        }else{
            System.out.println("修改失败,非管理不能修改");
            return result;
        }
    }


    /**
     * 添加订单
     * @param orders
     * @return
     */
    @ApiOperation(value = "addorders", notes = "添加订单")
    @PostMapping("/addorders")
    public Boolean addorders(@RequestBody Orders orders){
        Boolean result = false;
        HttpSession session = request.getSession(true);
        if(null!=session){
            Long userId = (Long) session.getAttribute("userId");
            orders.setCurrentUser(userId+"");
            orders.setUserId(userId);
        }
        int resultflag = orderServie.addOrder(orders);
        if(resultflag>0){
            result = true;
            return result;
        }else{
            return result;
        }
    }

    /**
     * 删除订单
     * @param orders
     * @return
     */
    @ApiOperation(value = "deleterOrders", notes = "删除订单")
    @GetMapping("/deleterOrders")
    public Boolean deleterOrders(Orders orders){
        //TODO 不需要删除订单?
         return false;
    }
    
    /**
	 * 获取到某个订单的流程信息
	 * @return
	 */
    @ApiOperation(value = "getContent", notes = "获取到某个订单的流程信息")
	@GetMapping("/getContent")
	@ResponseBody
	public List<JSONObject> getContent(@RequestParam Long orderId){
		return orderServie.getContent(orderId);
	}
}

package com.express.web.controller.order;


import com.express.web.model.order_model.orders;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.express.web.service.order.orderServie;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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



    /**
     * 查找订单根据参数查找,后台返回整条信息,前端取需
     * @param orders
     * @return
     */
    @ApiOperation(value = "selectOrder", notes = "查找订单")
    @RequestMapping("/selectOrder")
    public orders selectOrder(orders orders){
       return  orderServie.selectOrder(orders);
    }


    /**
     * 修改订单
     * @param orders
     * @return  只有管理员才能修改
     */
    @ApiOperation(value = "updateOrders", notes = "修改订单")
    @RequestMapping("/updateOrders")
    public Boolean updateOrders(orders orders){
        Boolean result = false;
        HttpSession session = request.getSession(true);
        int ruleId = (int)session.getAttribute("rolu");
        //用户角色 0系统管理员，1普通用户，2快递员
        if(ruleId==0){
            if(orderServie.updaterOrder(orders)>0){
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
    @RequestMapping("/addorders")
    public Boolean addorders(orders orders){
        Boolean result = false;
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
    @RequestMapping("/deleterOrders")
    public Boolean deleterOrders(orders orders){
        //TODO 不需要删除订单?
         return false;
    }
}

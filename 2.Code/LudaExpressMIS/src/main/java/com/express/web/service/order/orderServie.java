package com.express.web.service.order;

import java.util.List;

import com.express.web.model.order_model.Orders;

import net.sf.json.JSONObject;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/18
 * @Description: 订单业务层接口
 */
public interface orderServie {



    /**
     * 	根据查询条件获取信息
     * @param search
     * @return
     */
    List<Orders> listByAll(String search);


    /**
     * 查看订单
     * @param orders
     */
    Orders selectOrder(Orders orders);


    /**
     * 查寻多条订单
     * @param orders
     */
//    List<orders> selectMoreOrder(orders orders);

    /**
     * 添加订单
     * @param orders
     */
    int addOrder(Orders orders);

    /**
     * 删除订单
     * @param orders
     */
    int deleterOrder(Orders orders);
    /**
     * 修改订单
     * @param orders
     */
    int updaterOrder(Orders orders,String name);

    /**
     * 获取到某个订单的流程信息
     * @param orderid
     * @return
     */
    List<JSONObject> getContent(Long orderid);
}

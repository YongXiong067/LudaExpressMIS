package com.express.web.service.order;

import com.express.web.model.order_model.orders;

import java.util.List;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/18
 * @Description: 订单业务层接口
 */
public interface orderServie {


    /**
     * 查看订单
     * @param orders
     */
    orders selectOrder(orders orders);


    /**
     * 查寻多条订单
     * @param orders
     */
    List<orders> selectMoreOrder(orders orders);

    /**
     * 添加订单
     * @param orders
     */
    int addOrder(orders orders);

    /**
     * 删除订单
     * @param orders
     */
    int deleterOrder(orders orders);
    /**
     * 修改订单
     * @param orders
     */
    int updaterOrder(orders orders);

}

package com.express.web.service.order.impl;

import com.express.web.model.order_model.orders;
import com.express.web.service.order.orderServie;
import org.springframework.beans.factory.annotation.Autowired;
import com.express.web.mapper.order_mapper.ordersMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/18
 * @Description:
 */
@Service
public class orderServiceImp implements orderServie {

    @Autowired
    private ordersMapper ordersMapper;


    /**
     * 根据参数查找订单
     * @param orders
     * @return
     */
    public orders selectOrder(orders orders) {
        return ordersMapper.selectOrder(orders);
    }

    /**
     * 查看订单+
    /**
     * 查寻多条订单
     * @param orders
     */
    public List<orders> selectMoreOrder(orders orders) {

        return ordersMapper.listByAll(orders);
    }

    /**
     * 添加订单
     * @param orders
     */
    public int addOrder(orders orders) {
        return ordersMapper.insert(orders);
    }

    /**
     * 删除订单
     * @param orders
     * @return
     */
    public int deleterOrder(orders orders) {
        return ordersMapper.deleteById(orders.getOrderid());
    }

    /**
     * 修改订单
     * @param orders
     * @return
     */
    public int updaterOrder(orders orders) {

        return ordersMapper.update(orders);
    }
}

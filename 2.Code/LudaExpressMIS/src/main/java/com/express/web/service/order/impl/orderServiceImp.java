package com.express.web.service.order.impl;

import com.express.web.model.message.leavingMessage;
import com.express.web.model.order_model.orders;
import com.express.web.service.order.orderServie;
import org.springframework.beans.factory.annotation.Autowired;
import com.express.web.mapper.order_mapper.ordersMapper;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
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


    @Override
    public List<orders> listByAll(String search) {
        return ordersMapper.listByAll(search);
    }

    /**
     * 根据参数查找订单
     * @param orders
     * @return
     */
    public orders selectOrder(orders orders) {

        return ordersMapper.selectOrder(orders);
    }

    /**
//     * 查看订单+
//    /**
//     * 查寻多条订单
//     * @param orders
//     */
//    public List<orders> selectMoreOrder(orders orders) {
//
//        return ordersMapper.listByAll(orders);
//    }

    /**
     * 添加订单
     * @param orders
     */
    public int addOrder(orders orders) {
        //自动生成订单id 格式年月日是分秒时间戳
        Long orderNums =  new Date().getTime();
        orders.setOrdernum(String.valueOf(orderNums));
        //生成订单时间
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sd = sdf.format(new Date(orderNums));
        orders.setOrderdate(sd);
        orders.setState(String.valueOf(0));
        //处理步骤记录 :格式为: 处理人姓名 + 订单状态 + 所产生步奏时间
        String content = orders.getCurrentuser() +","+orders.getState()=="0"?"预约":"其他"+","+sd;
        orders.setContent(content);
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

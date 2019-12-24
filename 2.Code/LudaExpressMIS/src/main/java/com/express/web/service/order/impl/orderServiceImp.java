package com.express.web.service.order.impl;

import com.express.web.mapper.company.DotMapper;
import com.express.web.model.company.Dot;
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
    @Autowired
    private DotMapper dotMapper;


    @Override
    public List<orders> listByAll(String search) {
        List<orders> list =  ordersMapper.listByAll(search);
        if(list.size()>0){
            for (orders od :list) {
                Dot dot =  dotMapper.getDotById(od.getDotid());
                if(null!=dot){
                    od.setDotName(dot.getDotName());
                }
            }
        }
        return list;
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
        Dot dor =dotMapper.getDot(orders.getDotName());
        if(null!=dor){
            orders.setDotid(dor.getDotId());
            return ordersMapper.insert(orders);
        }else{
            return 0;
        }
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
    public int updaterOrder(orders orders ,String name) {
        String inintVule = null;
        switch (Integer.valueOf(orders.getState())){
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
        String content = "";
        //判断是否有该订单
        if(orders != null) {
            //获取到原有的content值,先判断是否为空
            if(orders.getContent() != null) {
                content = orders.getContent();
                //如果值为空，则是第一次存储，需要去掉前面的；号
                if(content == "") {
                    content +=name+","+inintVule+","+nowDate+"";
                }else {
                    content +=";"+name+","+inintVule+","+nowDate+"";
                }
            }
        }
        orders.setContent(content);
        //检查网点

        Dot dor =dotMapper.getDot(orders.getDotName());
        if(null!=dor){
            orders.setDotid(dor.getDotId());
            return ordersMapper.update(orders);
        }else{
            return 0;
        }
    }
}

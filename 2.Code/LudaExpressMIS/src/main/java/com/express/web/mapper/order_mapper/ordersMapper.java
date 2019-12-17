package com.express.web.mapper.order_mapper;

import com.express.web.model.order_model.orders;


/**
 * @Author: YIHUI HE
 * @Date: 2019/12/17
 * @Description: 
 */
public interface ordersMapper {
    int insert(orders record);

    int insertSelective(orders record);
}
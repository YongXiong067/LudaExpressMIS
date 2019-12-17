package com.express.web.mapper.order_mapper;

import com.express.web.model.order_model.orders;

public interface ordersMapper {
    int insert(orders record);

    int insertSelective(orders record);
}
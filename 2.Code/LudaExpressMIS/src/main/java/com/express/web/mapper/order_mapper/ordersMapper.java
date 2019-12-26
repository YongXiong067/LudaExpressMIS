package com.express.web.mapper.order_mapper;

import com.express.web.model.order_model.Orders;
import org.apache.ibatis.annotations.*;

import java.util.List;


/**
 * @Author: YIHUI HE
 * @Date: 2019/12/17
 * @Description:  订单接口
 */
@Mapper
public interface ordersMapper {

    /**
     * sql参数
     */
    final static String param = "*";

    /**
     * 
     * @param
     * @return
     */
    @Select("<script>"
            + "select "+ param +" from sys_user "
            + "where 1=1 "
            +"<if test= 'orderNum != null'> and orderNum = #{orderNum} </if>"
            +"</script>")
    Orders selectOrder(Orders orders);
    
    
    /**
     * 获取全部数据
     * @param
     * @return
     */
    /**
     * 	获取待发货订单，可传查询参数
     * @param search
     * @return
     */
    @Select("<script>"
            + "select "+ param +" from orders "
            + "where 1=1 "
            +"<if test= 'search != null'> and ( orderNum like concat('%',#{search},'%')) </if>"
            +"</script>")
    @Results(id="ordersList",
            value={
                    @Result(id=true,property="orderId",column="orderId"),
                    @Result(property="dotId",column="dotId"),
                    @Result(property="userId",column="userId"),
                    @Result(property="sendTel",column="sendTel"),
                    @Result(property="sendAddr",column="sendAddr"),
                    @Result(property="orderDate",column="orderDate"),
                    @Result(property="receiveTel",column="receiveTel"),
                    @Result(property="receiveAddr",column="receiveAddr"),
                    @Result(property="orderNum",column="orderNum"),
                    @Result(property="weight",column="weight"),
                    @Result(property="money",column="money"),
                    @Result(property="state",column="state"),
                    @Result(property="currentUser",column="currentUser"),
                    @Result(property="content",column="content")
            }
    )
    List<Orders> listByAll(String search);

    /**
     * 插入记录
     * @param orders
     */
    @Insert("insert into orders(userId,dotId,sendTel,sendAddr,orderdate,receiveTel,receiveAddr,orderNum," +
            "weight,money,state,currentUser,content) value(#{userId},#{dotId},#{sendTel},#{sendAddr},#{orderDate}," +
            "#{receiveTel},#{receiveAddr},#{orderNum},#{weight},#{money},#{state},#{currentUser},#{content})")
    int insert(Orders orders);

    /**
     * 修改信息
     * @return
     */
    @Update("update orders set dotId = #{dotid},sendTel =#{sendtel},sendAddr=#{sendaddr},orderdate =#{orderdate}," +
            "receiveTel = #{receiveTel},receiveAddr =#{receiveAddr},orderNum = #{orderNum}," +
            "weight=#{weight} ,money =#{money},state =#{state} ,currentUser =#{currentUser},content = #{content}" +
            "where orderId = #{orderId}")
    int update(Orders orders);

    /**
     * 删除信息
     * @param id
     * @return
     */
    @Delete("DELETE from orders where orderId = #{orderId}")
    int deleteById(long orderid);
}
package com.express.web.mapper.order_mapper;

import com.express.web.model.order_model.orders;
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
     * 根据账号密码获取到用户信息
     * @param
     * @return
     */
    @Select("<script>"
            + "select "+ param +" from sys_user "
            + "where 1=1 "
            +"<if test= 'ordernum != null'> and ordernum = #{ordernum} </if>"
            +"</script>")
    orders selectOrder(orders orders);
    /**
     * 获取全部数据
     * @param
     * @return
     */
    List<orders> listByAll(orders orders);

    /**
     * 插入记录
     * @param orders
     */
    @Insert("insert into orders(userId,dotId,sendTel,sendAddr,orderdate,receiveTel,receiveAddr,orderNum," +
            "weight,money,state,currentUser,content) value(#{userid},#{dotid},#{sendtel},#{sendaddr},#{orderdate}," +
            "#{receivetel},#{receiveaddr},#{ordernum},#{weight},#{money},#{state},#{currentuser},#{content})")
    int insert(orders orders);

    /**
     * 修改信息
     * @return
     */
    @Update("update orders set dotId = #{dotid},sendTel =#{sendtel},sendAddr=#{sendaddr},orderdate =#{orderdate}," +
            "receiveTel = #{receivetel},receiveAddr =#{receiveaddr},orderNum = #{ordernum}," +
            "weight=#{weight} ,money =#{money},state =#{state} ,currentUser =#{currentuser},content = #{content}" +
            "where orderId = #{orderid}")
    int update(orders orders);

    /**
     * 删除信息
     * @param id
     * @return
     */
    @Delete("DELETE from orders where orderId = #{orderid}")
    int deleteById(long orderid);
}
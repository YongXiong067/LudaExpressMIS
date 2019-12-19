package com.express.web.mapper.order_mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.express.web.model.order_model.orders;



/**
 *	发货管理Mapper接口
 * @author Administrator
 *
 */
@Mapper
public interface DeliverGoodMapper {

	/**
	 * sql参数
	 */
	final static String param = "*";
	/**
	 * 	获取待发货订单，可传查询参数
	 * @param search
	 * @return
	 */
	@Select("<script>"
			+ "select "+ param +" from orders "	
			+ "where 1=1 and state = #{state} "
			+"<if test= 'ordernum != null'> and ordernum like concat('%',#{ordernum},'%') </if>"
			+"</script>")
	@Results(id="DeliverGoodsMap",
	value={
		@Result(id=true,property="orderid",column="orderId"),
		@Result(property="dotid",column="dotId"),
		@Result(property="userid",column="userId"),
		@Result(property="sendtel",column="sendTel"),
		@Result(property="sendaddr",column="sendAddr"),
		@Result(property="orderdate",column="orderDate"),
		@Result(property="receivetel",column="receiveTel"),
		@Result(property="receiveaddr",column="receiveAddr"),
		@Result(property="ordernum",column="orderNum"),
		@Result(property="weight",column="weight"),
		@Result(property="money",column="money"),
		@Result(property="state",column="state"),
		@Result(property="currentuser",column="currentUser"),
		@Result(property="content",column="content")
		}
	)
	List<orders> getDeliverList(@Param("ordernum") String ordernum,int state);
	
	/**
	 * 根据订单id查询出订单详细信息
	 * @param orderId
	 * @return
	 */
	@Select("select * from orders where orderId = #{orderId}")
	orders getById(@Param("orderId") Long orderId);
	/**
	 * 	修改状态
	 * @return
	 */
	@Update("update orders set state = #{state} "
			+ " where orderid = #{orderid}")
	boolean update(Long orderid,int state);
}

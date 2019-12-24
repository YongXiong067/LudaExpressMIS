package com.express.web.mapper.money;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.One;

import com.express.web.model.money.Money;

@Mapper
public interface MoneyMapper {
	/**
	 * 获取到财务信息列表
	 * @return
	 */
	@Select("<script>"
			+ "select * from finance "
			+ "where 1=1 "
			+"</script>")
	@Results({
			@Result(column = "orderId", property = "orderId",
					one=@One(select="com.express.web.mapper.order_mapper.DeliverGoodMapper.getById"))
	})
	List<Money> getMoneyList();

}

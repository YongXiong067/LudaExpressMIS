package com.express.web.service.money;

import java.util.List;

import com.express.web.model.money.ColumnarMoney;
import com.express.web.model.money.Money;
import com.express.web.model.money.MoneyTable;

public interface MoneyService {
	/**
	 * 获取到财务信息列表
	 * @return
	 */
	List<Money> getMoneyList();
	
	/**
	 * 	查询财务折线图数据
	 * @param user
	 * @return
	 */
	List<ColumnarMoney> getMoneyColumn();
	/**
	 * 	查询财务柱状图数据
	 * @param user
	 * @return
	 */
	List<ColumnarMoney> getMoneyColumnYear();
	
	/**
	 * 查询财务管理表格界面的数据
	 * @return
	 */
	List<MoneyTable> getMoneyTable();
}

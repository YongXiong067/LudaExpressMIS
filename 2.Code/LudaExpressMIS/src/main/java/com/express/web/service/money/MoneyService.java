package com.express.web.service.money;

import java.util.List;

import com.express.web.model.money.Money;

public interface MoneyService {
	/**
	 * 获取到财务信息列表
	 * @return
	 */
	List<Money> getMoneyList();
}

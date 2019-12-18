package com.express.web.service.money.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.money.MoneyMapper;
import com.express.web.model.money.Money;
import com.express.web.service.money.MoneyService;
/**
 * 	发货管理业务层实现类
 * @author Administrator
 *
 */
@Service
public class MoneyServiceImpl implements MoneyService {

	@Autowired
	MoneyMapper moneyMapper;

	@Override
	public List<Money> getMoneyList() {
		return moneyMapper.getMoneyList();
	}
	
}

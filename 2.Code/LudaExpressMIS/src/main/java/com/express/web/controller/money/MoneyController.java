package com.express.web.controller.money;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.express.web.model.money.ColumnarMoney;
import com.express.web.model.money.Money;
import com.express.web.model.money.MoneyTable;
import com.express.web.service.deliver.DeliverGoodsService;
import com.express.web.service.money.MoneyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


/**
 *	财务控制器
 * @author Charlene
 *
 */
@Api(value = "财务控制器",description ="财务控制器")
@Controller
@RequestMapping("/api/money")
public class MoneyController {
	@Autowired
	HttpServletRequest request;
	@Autowired
	MoneyService moneyService;
	@Autowired
	DeliverGoodsService deliverService;
	/**
	 * 	查询财务记录
	 * @param user
	 * @return
	 */
	@ApiOperation(value = "getMoneyList", notes = "查询所有财务记录")
	@PostMapping("/getMoney")
	@ResponseBody
	public List<Money> getMoney() {
		return moneyService.getMoneyList();
	}
	
	/**
	 * 	查询财务折线图数据
	 * @param user
	 * @return
	 */
	@ApiOperation(value = "getMoneyColumn", notes = "查询财务折线图数据，按月")
	@GetMapping("/getMoneyColumn")
	@ResponseBody
	public List<ColumnarMoney> getMoneyColumn() {
		return moneyService.getMoneyColumn();
	}
	/**
	 * 	查询财务柱状图数据
	 * @param user
	 * @return
	 */
	@ApiOperation(value = "getMoneyColumnYear", notes = "查询财务柱状图数据，按年")
	@GetMapping("/getMoneyColumnYear")
	@ResponseBody
	public List<ColumnarMoney> getMoneyColumnByYear() {
		return moneyService.getMoneyColumnYear();
	}
	
	/**
	 * 查询财务管理表格界面的数据
	 * @return
	 */
	@ApiOperation(value = "getMoneyTable", notes = "查询财务管理表格界面的数据")
	@GetMapping("/getMoneyTable")
	@ResponseBody
	public List<MoneyTable> getMoneyTable() {
		return moneyService.getMoneyTable();
	}
}

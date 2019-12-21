package com.express.web.model.money;

/**
 * 	柱状图类
 * @author Administrator
 *
 */
public class ColumnarMoney {
	private String dateMonth;
	private Double money;
	public String getDateMonth() {
		return dateMonth;
	}
	public void setDateMonth(String dateMonth) {
		this.dateMonth = dateMonth;
	}
	public Double getMoney() {
		return money;
	}
	public void setMoney(Double money) {
		this.money = money;
	}
	@Override
	public String toString() {
		return "ColumnarMoney [dateMonth=" + dateMonth + ", money=" + money + "]";
	}
	
}

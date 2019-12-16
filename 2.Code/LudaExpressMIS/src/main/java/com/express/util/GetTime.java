package com.express.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 获取系统时间
 * @author Charlene
 *
 */
public class GetTime {
	
	/**
	 * 获取当前系统时间
	 * @return yyyy-MM-dd HH:mm:ss
	 */
	public static String getSystemTime() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		return df.format(new Date());
	}
}

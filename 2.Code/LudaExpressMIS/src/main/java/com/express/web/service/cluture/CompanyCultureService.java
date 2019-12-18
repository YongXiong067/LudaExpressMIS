package com.express.web.service.cluture;

import java.util.List;

import com.express.web.model.culture.CompanyCulture;

/**
 * 企业文化业务层接口
 * @author Administrator
 *
 */
public interface CompanyCultureService {
	/**
	 * 根据查询条件获取信息
	 * @param search
	 * @return
	 */
	List<CompanyCulture> listByAll(String search);
	/**
	 * 添加文化信息
	 * @param culture
	 */
	void insert(CompanyCulture culture);
	/**
	 * 修改文化信息
	 * @param culture
	 */
	void update(CompanyCulture culture);
	/**
	 * 删除文化信息
	 * @param id
	 * @return
	 */
	boolean delete(long id);
}

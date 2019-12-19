package com.express.web.service.company;

import java.util.List;

import com.express.web.model.company.NoticeCulture;

/**
 * 企业文化业务层接口
 * @author Administrator
 *
 */
public interface NoticeCultureService {
	/**
	 * 	根据查询条件获取信息
	 * @param search
	 * @return
	 */
	List<NoticeCulture> listByAll(String search,Integer type);
	/**
	 * 添加文化信息
	 * @param culture
	 */
	void insert(NoticeCulture culture);
	/**
	 * 修改文化信息
	 * @param culture
	 */
	void update(NoticeCulture culture);
	/**
	 * 删除文化信息
	 * @param id
	 * @return
	 */
	boolean delete(long id);
}

package com.express.web.service.cluture;

import java.util.List;

import com.express.web.model.culture.Dot;

/**
 * 网点管理业务层接口
 * @author Administrator
 *
 */
public interface DotService {
	/**
	 * 根据网点id查询出网点信息
	 * @param dotId
	 * @return
	 */
	Dot getDot(String dotName);
	
	/**
	 * 根据父id查询出网点信息
	 * 父网点pid为-1，子网点根据左侧父网点的dotid来取
	 * @param parentId
	 * @return
	 */
	List<Dot> getDotParentList(Long parentId);
	
	
	/**
	 * 新增网点信息
	 * @param dot
	 * @return
	 */
	void insertDot(String dotName,Long parentId);
	/**
	 * 修改网点信息
	 * @param dot
	 * @return
	 */
	void updateDot(Dot dot);
	/**
	 * 根据id修改网点信息
	 * @param dotId
	 * @return
	 */
	boolean deleteDot(Long dotId);
}

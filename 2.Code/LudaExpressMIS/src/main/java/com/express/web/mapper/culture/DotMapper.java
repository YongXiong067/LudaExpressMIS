package com.express.web.mapper.culture;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.express.web.model.culture.Dot;
/**
 * 网点Mapper接口
 * @author Administrator
 *
 */
@Mapper
public interface DotMapper {
	/**
	 * 根据网点名称查询出网点信息
	 * @param dotId
	 * @return
	 */
	@Select("select * from dots where dotName = #{dotName}")
	Dot getDot(@Param("dotName") String dotName);
	/**
	 * 根据网点名称和父id查询出网点信息
	 * 父网点pid为-1，子网点根据左侧父网点的dotid来取
	 * @param dotName
	 * @param parentId
	 * @return
	 */
	@Select("<script>"
			+ "select * from dots where 1 = 1"
			+ "<if test = 'parentId != null'> and parentId = #{parentId} </if>"
			+ "</script>")
	List<Dot> getDotParentList(Long parentId);
	
	
	/**
	 * 新增网点信息
	 * @param dot
	 * @return
	 */
	@Insert("insert into dots(parentId, dotName) value(#{parentId}, #{dotName})")
	void insertDot(String dotName,Long parentId);
	/**
	 * 修改网点信息
	 * @param dot
	 * @return
	 */
	@Update("update dots set parentId = #{parentId}, dotName = #{dotName} where dotId = #{dotId}")
	void updateDot(Dot dot);
	/**
	 * 根据id修改网点信息
	 * @param dotId
	 * @return
	 */
	@Delete("DELETE from dots where dotId = #{dotId}")
	boolean deleteDot(Long dotId);
}

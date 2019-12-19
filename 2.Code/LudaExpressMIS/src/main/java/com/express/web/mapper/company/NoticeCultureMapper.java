package com.express.web.mapper.company;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.express.web.model.company.NoticeCulture;



/**
 * 企业文化Mapper接口
 * @author Administrator
 *
 */
@Mapper
public interface NoticeCultureMapper {

	/**
	 * sql参数
	 */
	final static String param = "*";
	/**
	 * 获取全部数据
	 * @param search
	 * @return
	 */
	@Select("<script>"
			+ "select "+ param +" from notice_culture "	
			+ "where 1=1 "
			+"<if test= 'type != null'> and type = #{type} </if>"
			+"<if test= 'search != null'> and (title like concat('%',#{search},'%')  or content like concat('%',#{search},'%')) </if>"
			+"</script>")
	@Results(id="NoticeCultureMap",
	value={
		@Result(id=true,property="ncId",column="ncId"),
		@Result(property="title",column="title"),
		@Result(property="content",column="content"),
		@Result(property="type",column="type")
		}
	)
	List<NoticeCulture> listByAll(@Param("search") String search,@Param("type") String type);
	
	/**
	 * 插入记录
	 * @param companyModel
	 */
	@Insert("insert into notice_culture(title, content,type) value(#{title}, #{content},#{type})")
	void insert(NoticeCulture companyModel);
	
	/**
	 * 修改信息
	 * @return
	 */
	@Update("update notice_culture set title = #{title}, content = #{content},type = #{type}"
			+ " where ncId = #{ncId}")
	boolean update(NoticeCulture companyModel);

	/**
	 * 删除信息
	 * @param id
	 * @return
	 */
	@Delete("DELETE from notice_culture where ncId = #{ncId}")
	boolean deleteById(long ncId);
}

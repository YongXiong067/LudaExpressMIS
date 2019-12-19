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
			+ "select "+ param +" from company_culture "	
			+ "where 1=1 "
			+"<if test= 'search != null'> and title like concat('%',#{search},'%')  or content like concat('%',#{search},'%') </if>"
			+ "<if test= 'type != null'> and type = #{type} </if>"
			+"</script>")
	@Results(id="CompanyCultureMap",
	value={
		@Result(id=true,property="cultureId",column="cultureId"),
		@Result(property="title",column="title"),
		@Result(property="content",column="content")
		}
	)
	List<NoticeCulture> listByAll(@Param("search") String search,Integer type);
	
	/**
	 * 插入记录
	 * @param companyModel
	 */
	@Insert("insert into company_culture(title, content) value(#{title}, #{content})")
	void insert(NoticeCulture companyModel);
	
	/**
	 * 修改信息
	 * @return
	 */
	@Update("update company_culture set title = #{title}, content = #{content}"
			+ " where cultureId = #{cultureId}")
	boolean update(NoticeCulture companyModel);

	/**
	 * 删除信息
	 * @param id
	 * @return
	 */
	@Delete("DELETE from company_culture where cultureId = #{cultureId}")
	boolean deleteById(long cultureId);
}

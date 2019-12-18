package com.express.web.mapper.culture;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.express.web.model.culture.CompanyCulture;



/**
 * 企业文化Mapper接口
 * @author Administrator
 *
 */
@Mapper
public interface CompanyCultureMapper {

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
			+"<if test= 'search != null'> and userName like concat('%',#{search},'%')  or phone like concat('%',#{search},'%') </if>"
			+"</script>")
	@Results(id="CompanyCultureMap",
	value={
		@Result(id=true,property="cultureId",column="cultureId"),
		@Result(property="title",column="title"),
		@Result(property="content",column="content")
		}
	)
	List<CompanyCulture> listByAll(@Param("search") String search);
	
	/**
	 * 插入记录
	 * @param companyModel
	 */
	@Insert("insert into company_culture(title, content) value(#{title}, #{content})")
	void insert(CompanyCulture companyModel);
	
	/**
	 * 修改信息
	 * @return
	 */
	@Update("update company_culture set title = #{title}, content = #{content}"
			+ " where cultureId = #{cultureId}")
	boolean update(CompanyCulture companyModel);

	/**
	 * 删除信息
	 * @param id
	 * @return
	 */
	@Delete("DELETE from company_culture where cultureId = #{cultureId}")
	boolean deleteById(long cultureId);
}

package com.express.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.djbh.model.project.Project;
import com.djbh.model.project.Screen;



/**
 * 项目类Mapper接口
 * @author Charlene
 *
 */
@Mapper
public interface ProjectMapper {
//	/**
//	 * sql参数
//	 */
//	final static String param = "p_id, p_name, position, declare_money, warehousing_time, warehousing_fileName, "
//			+ "warehousing_fileUrl, p_tagle, examine_money, approval_time, approval_fileName, approval_fileUrl, "
//			+ "overall_type, planning_type, functional_subjects, economic_subjects, delivery_time, actual_delivery_time, indicator_description, "
//			+ "contractor, bid_money, bid_time, bid_fileName, sup_person, sup_text, sup_time, project_situation, feedback_person, feedback_text, "
//			+ "acceBefore_opinion, acceBefore_time, acceBefore_fileName, acceBefore_fileUrl, is_acceBefore";
//	
	/**
	 * sql参数
	 */
	final static String param = "*";
	/**
	 * 分页语法 * 
	 */
	final static String listByLimit = " order by p_id desc LIMIT #{page_no}, #{page_line}";
	/**
	 * 判断页面状态 * 
	 */
	final static String listByTagle = " and p_tagle = #{p_tagle}";
	/**
	 * 模糊匹配语法
	 */
	final static String listByLike = " and CONCAT(IFNULL(p_name,''), IFNULL(declare_money,''), IFNULL(warehousing_fileName,''), IFNULL(examine_money,''), IFNULL(approval_fileName,'')) LIKE #{search}";
	/**
	 *  判断参数position
	 */
	final static String listByPosition = " and position = #{position}";
	/**
	 *  判断参数w_year
	 */
	final static String listByWYear = " and warehousing_time BETWEEN #{w_year}'-01-01' and #{w_year}'-12-31'";

	/**
	 *  判断参数a_year
	 */
	final static String listByAYear = " and approval_time BETWEEN #{a_year}'-01-01' and #{a_year}'-12-31'";
	/**
	 *  判断参数overall_type
	 */
	final static String listByOverall_type = " and overall_type = #{overall_type}";
	
	/**
	 * 动态sql语句获取数据
	 * @param p_tagle
	 * @param position
	 * @param search
	 * @param w_year
	 * @param page_no
	 * @param page_line
	 * @return
	 */
	@Select("<script>"
			+ "select "+ param +" from project_info "	
			+ "where  "
			+"<if test= 'state != null'> state = 1</if>"
			+"<if test= 'state == null'> state = 0</if>"
			+"<if test= 'p_tagle != null'> and p_tagle = #{p_tagle} </if>"
			+"<if test= 'position != null'> and position = #{position} </if>"
			+"<if test= 'search != null'>"+ listByLike +"</if>"
			+"<if test= 'w_year != null'>"+ listByWYear +"</if>"
			+"<if test= 'a_year != null'>"+ listByAYear +"</if>"
			+listByLimit
			+"</script>")
	@Results({
		@Result(column = "position", property = "position", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "overall_type", property = "overall_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "p_tagle", property = "p_tagle", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
	})
	List<Project> listByLimit(@Param("state") String state, @Param("p_tagle") String p_tagle, @Param("position") String position, @Param("search") String search, @Param("w_year") String w_year, @Param("a_year") String a_year, @Param("page_no") int page_no, @Param("page_line") int page_line);


	
	@Select("<script>"
			+ "select "+ param +" from project_info "	
			+ "where  "
			+"<if test= 'state != null'> state = 1</if>"
			+"<if test= 'state == null'> state = 0</if>"
			+"<if test= 'p_tagle != null'> and p_tagle = #{p_tagle} </if>"
			+"<if test= 'position != null'> and position = #{position} </if>"
			+"<if test= 'search != null'> and CONCAT(IFNULL(p_name,'')) LIKE #{search} </if>"
			+"<if test= 'overall_type != null'> and overall_type = #{overall_type}</if>"
			+"<if test= 'warehousing_time != null'> and warehousing_time BETWEEN #{warehousing_time}'-01-01' and #{warehousing_time}'-12-31'</if>"
			+"<if test= 'approval_time != null'> and approval_time BETWEEN #{approval_time}'-01-01' and #{approval_time}'-12-31' </if>"
			+"<if test= 'bid_time != null'> and bid_time BETWEEN #{bid_time}'-01-01' and #{bid_time}'-12-31' </if>"
			+"<if test= 'acceBefore_time != null'> and acceBefore_time BETWEEN #{acceBefore_time}'-01-01' and #{acceBefore_time}'-12-31' </if>"
			+"<if test= 'is_acceBefore != null'> and is_acceBefore = #{is_acceBefore} </if>"
			+"<if test= 'acce_time != null'> and acce_time BETWEEN #{acce_time}'-01-01' and #{acce_time}'-12-31' </if>"
			+listByLimit
			+"</script>")
	@Results({
		@Result(column = "position", property = "position", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "overall_type", property = "overall_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "p_tagle", property = "p_tagle", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "planning_type", property = "planning_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
	})
	List<Project> listByLimit_(Screen scr);


	@Select("<script>"
			+ "select "+ param +" from project_info "	
			+ "where  "
			+"<if test= 'state != null'> state = 1</if>"
			+"<if test= 'state == null'> state = 0</if>"
			+" and p_tagle in ('IT0105', 'IT0106', 'IT0107', 'IT0108', 'IT0109')"
			+"<if test= 'position != null'>"+ listByPosition +"</if>"
			+"<if test= 'search != null'>"+ listByLike +"</if>"
			+"<if test= 'overall_type != null'> and overall_type = #{overall_type}</if>"
			+"<if test= 'warehousing_time != null'> and warehousing_time BETWEEN #{warehousing_time}'-01-01' and #{warehousing_time}'-12-31'</if>"
			+"<if test= 'approval_time != null'> and approval_time BETWEEN #{approval_time}'-01-01' and #{approval_time}'-12-31' </if>"
			+"<if test= 'bid_time != null'> and bid_time BETWEEN #{bid_time}'-01-01' and #{bid_time}'-12-31' </if>"
			+"<if test= 'acceBefore_time != null'> and acceBefore_time BETWEEN #{acceBefore_time}'-01-01' and #{acceBefore_time}'-12-31' </if>"
			+"<if test= 'is_acceBefore != null'> and is_acceBefore BETWEEN #{is_acceBefore}'-01-01' and #{is_acceBefore}'-12-31' </if>"
			+"<if test= 'acce_time != null'> and acce_time BETWEEN #{acce_time}'-01-01' and #{acce_time}'-12-31' </if>"
			+listByLimit
			+"</script>")
	@Results({
		@Result(column = "position", property = "position", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "overall_type", property = "overall_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "p_tagle", property = "p_tagle", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "planning_type", property = "planning_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
	})
	List<Project> listByPayment(Screen scr);
	
	/**
	 * 删除-项目（隐藏）
	 * @param pro
	 * @return
	 */
	@Update("update project_info set state = 0 where p_id = #{p_id} and state = 1")
	boolean delete(@Param("p_id") int p_id);
	
	
	/**
	 * 删除-项目（隐藏）
	 * @param pro
	 * @return
	 */
	@Update("update project_info set state = 1 where p_id = #{p_id} and state = 0")
	boolean recovery(@Param("p_id") int p_id);
	
	
	/**
	 * 修改项目状态
	 * @param pro
	 * @return
	 */
	@Update("update project_info set p_tagle = #{p_tagle} where p_id = #{p_id} and state = 1")
	boolean updateTagle(@Param("p_id") int p_id, @Param("p_tagle") String p_tagle);
	
	/**
	 * 修改项目字段
	 * @param pro
	 * @return
	 */
	@Update("update project_info set ${key} = #{value} where p_id = #{p_id} and state = 1")
	boolean updateValue(@Param("p_id") int p_id, @Param("key") String key, @Param("value") String value);
	
	/**
	 * 修改项目金额
	 * @param pro
	 * @return
	 */
	@Update("update project_info set payment_money = #{payment_money}, progress = #{progress}, planning_type = #{planning_type} where p_id = #{p_id} and state = 1")
	boolean updateMoney(@Param("p_id") int p_id, @Param("payment_money") double payment_money, @Param("progress") double progress, @Param("planning_type") String planning_type);
	
	/**
	 * 根据p_id获取项目
	 * @param p_id
	 * @return
	 */
	@Select("select "+ param +" from project_info where state = 1 and p_id = #{p_id}")
	@Results({
		@Result(column = "position", property = "position", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "overall_type", property = "overall_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "p_tagle", property = "p_tagle", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "planning_type", property = "planning_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
	})
	Project getByPid(@Param("p_id") int p_id);
	
	
	/**
	 * 根据p_id获取项目
	 * @param p_id
	 * @return
	 */
	@Select("select p_name from project_info where state = 1 and p_id = #{p_id}")
	String getNameByPid(@Param("p_id") int p_id);
	
	/**
	 * 获取页面全部数据
	 * @param p_tagle
	 * @return
	 */
	@Select("select "+ param +" from project_info where state = 1 and p_tagle = #{p_tagle} order by p_id desc")
	@Results({
		@Result(column = "position", property = "position", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "overall_type", property = "overall_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "p_tagle", property = "p_tagle", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
	})
	List<Project> listByDropdown(@Param("p_tagle") String p_tagle);
	
	
	/**
	 * 获取合同关联的项目列表
	 * @param c_id
	 * @return
	 */
	@Select("select "+ param +" from project_info where state = 1 and p_id in (select p_id from project_contract where c_id = #{c_id}) order by p_id desc")
	@Results({
		@Result(column = "position", property = "position", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "overall_type", property = "overall_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "p_tagle", property = "p_tagle", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
	})
	List<Project> getListByCId(@Param("c_id") int c_id);
	
	
	/**
	 * 获取合同关联的项目列表
	 * @param c_id
	 * @return
	 */
	@Select("select "+ param +" from project_info where state = 1 and p_id in (select p_id from submit_app_project where sub_id = #{sub_id}) order by p_id desc")
	@Results({
		@Result(column = "position", property = "position", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "overall_type", property = "overall_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "p_tagle", property = "p_tagle", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
	})
	List<Project> getListBySubId(@Param("sub_id") int sub_id);
	
	/**
	 * 获取全部数据
	 * @param p_tagle
	 * @return
	 */
	@Select("select "+ param +" from project_info where state = 1 order by p_id desc")
	@Results({
		@Result(column = "position", property = "position", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "overall_type", property = "overall_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "p_tagle", property = "p_tagle", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
	})
	List<Project> listByAll();
	
	
	
	/**
	 * 获取页面全部数据
	 * @param p_tagle
	 * @return
	 */
	@Select("select "+ param +" from project_info where state = 1 and p_tagle = #{p_tagle} or p_tagle = #{p_tagle_}  order by p_id desc")
	@Results({
		@Result(column = "position", property = "position", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "overall_type", property = "overall_type", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
		@Result(column = "p_tagle", property = "p_tagle", 
				one=@One(select="com.djbh.mapper.db.DropdownMapper.getValueByCode")),
	})
	List<Project> listByPaymentPro(@Param("p_tagle") String p_tagle, @Param("p_tagle_") String p_tagle_);
	
	
	
	/**
	 * 修改-项目
	 * @param pro
	 * @return
	 */
	@Update("<script>"
			+ "update project_info set"
			+ "<if test= 'p_tagle != null'> p_tagle = #{p_tagle}, </if>"
			+ "<if test= 'position != null'> position = #{position}, </if>"
			+ "<if test= 'declare_money != null'> declare_money = #{declare_money}, </if>"
			+ "<if test= 'warehousing_time != null'> warehousing_time = #{warehousing_time}, </if>"
			+ "<if test= 'warehousing_fileName != null'> warehousing_fileName = #{warehousing_fileName}, </if>"
			+ "<if test= 'warehousing_fileUrl != null'> warehousing_fileUrl = #{warehousing_fileUrl}, </if>"
			+ "<if test= 'overall_type != null'> overall_type = #{overall_type}, </if>"
			+ "<if test= 'examine_money != null'> examine_money = #{examine_money}, </if>"
			+ "<if test= 'approval_time != null'> approval_time = #{approval_time}, </if>"
			+ "<if test= 'approval_fileName != null'> approval_fileName = #{approval_fileName}, </if>"
			+ "<if test= 'approval_fileUrl != null'> approval_fileUrl = #{approval_fileUrl}, </if>"
			+ "<if test= 'contractor != null'> contractor = #{contractor}, </if>"
			+ "<if test= 'bid_money != null'> bid_money = #{bid_money}, </if>"
			+ "<if test= 'bid_time != null'> bid_time = #{bid_time}, </if>"
			+ "<if test= 'bid_fileName != null'> bid_fileName = #{bid_fileName}, </if>"
			+ "<if test= 'bid_fileUrl != null'> bid_fileUrl = #{bid_fileUrl}, </if>"
			+ "<if test= 'acceBefore_opinion != null'> acceBefore_opinion = #{acceBefore_opinion}, </if>"
			+ "<if test= 'acceBefore_time != null'> acceBefore_time = #{acceBefore_time}, </if>"
			+ "<if test= 'acceBefore_fileName != null'> acceBefore_fileName = #{acceBefore_fileName}, </if>"
			+ "<if test= 'acceBefore_fileUrl != null'> acceBefore_fileUrl = #{acceBefore_fileUrl}, </if>"
			+ "<if test= 'is_acceBefore != null'> is_acceBefore = #{is_acceBefore}, </if>"
			+ "<if test= 'acce_time != null'> acce_time = #{acce_time}, </if>"
			+ "<if test= 'acce_user_opinion != null'> acce_user_opinion = #{acce_user_opinion}, </if>"
			+ "<if test= 'acce_build_opinion != null'> acce_build_opinion = #{acce_build_opinion}, </if>"
			+ "<if test= 'acce_organ_opinion != null'> acce_organ_opinion = #{acce_organ_opinion}, </if>"
			+ "<if test= 'acce_fileName != null'> acce_fileName = #{acce_fileName}, </if>"
			+ "<if test= 'acce_fileUrl != null'> acce_fileUrl = #{acce_fileUrl}, </if>"
			+ "<if test= 'acce_result != null'> acce_result = #{acce_result}, </if>"
			+ "<if test= 'payable_money != null'> payable_money = #{payable_money}, </if>"
			+ "<if test= 'payment_money != null'> payment_money = #{payment_money}, </if>"
			+ "<if test= 'progress != null'> progress = #{progress}, </if>"
			+ "<if test= 'planning_type != null'> planning_type = #{planning_type}, </if>"
			+ "<if test= 'payment_agreement != null'> payment_agreement = #{payment_agreement}, </if>"
			+ "<if test= 'supplementary_Payment != null'> supplementary_Payment = #{supplementary_Payment}, </if>"
			+ "<if test= 'payment_fileName != null'> payment_fileName = #{payment_fileName}, </if>"
			+ "<if test= 'payment_fileUrl != null'> payment_fileUrl = #{payment_fileUrl}, </if>"
			+ "<if test= 'approval_fileName != null and approval_fileUrl != null'> approval_fileName = #{approval_fileName}, approval_fileUrl= #{approval_fileUrl}, </if>"
			+ " p_name = #{p_name}, document = #{document} where p_id = #{p_id} and state = 1"
			+ "</script>")
	boolean update(Project pro);
}

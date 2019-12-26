package com.express.web.mapper.sys;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.express.web.model.sys.SysUser;



/**
 * 项目类Mapper接口
 * @author Charlene
 *
 */
@Mapper
public interface SysUserMapper {

	/**
	 * sql参数
	 */
	final static String param = "*";
	
	/**
	 * 获取全部数据
	 * @param p_tagle
	 * @return
	 */
	@Select("<script>"
			+ "select "+ param +" from sys_user "	
			+ "where 1=1 "
			+"<if test= 'search != null'> and userName like concat('%',#{search},'%') or phone like concat('%',#{search},'%')</if>"
			+"</script>")
	@Results(id="SysUserMap",
	value={
		@Result(id=true,property="userId",column="userId"),
		@Result(property="userName",column="userName"),
		@Result(property="password",column="password"),
		@Result(property="phone",column="phone"),
		@Result(property="rolu",column="rolu")
		}
	)
	List<SysUser> listByAll(@Param("search") String search);
	
	/**
	 * 根据账号密码获取到用户信息
	 * @param p_id
	 * @return
	 */
	@Select("select "+ param +" from sys_user where userName = #{userName} and password = #{password}")
	SysUser getSysUserInfo(@Param("userName") String userName,@Param("password") String password);
	/**
	 * 根据账号密码获取到用户信息
	 * @param p_id
	 * @return
	 */
	@Select("select "+ param +" from sys_user where userName = #{userName}")
	SysUser validateName(@Param("userName") String userName);
	/**
	 * 根据ID获取到用户信息
	 * @param p_id
	 * @return
	 */
	@Select("select "+ param +" from sys_user where userId = #{userId}")
	SysUser getLogin(@Param("userId") long userId);

	/**
	 * 插入记录
	 * @param logModel
	 */
	@Insert("insert into sys_user(userName, password, phone, rolu) value(#{userName}, #{password}, #{phone}, #{rolu})")
	void insertUser(SysUser userModel);
	
	/**
	 * 删除用户
	 * @param ids
	 * @return
	 */
	@Delete("DELETE from sys_user where userId = #{userId}")
	boolean deleteById(long userId);
	
	/**
	 * 修改用户信息
	 * @param pro
	 * @return
	 */
	@Update("update sys_user set userName = #{userName}, password = #{password}, phone = #{phone}, rolu = #{rolu}"
			+ " where userId = #{userId}")
	boolean update(SysUser user);
	
	/**
	 * 用户修改个人信息
	 * @param pro
	 * @return
	 */
	@Update("update sys_user set userName = #{userName}, password = #{password}, phone = #{phone}, rolu = #{rolu}, "
			+ "address = #{address}, sex = #{sex}"
			+ " where userId = #{userId}")
	void userUpdateInfo(SysUser user);
	/**
	 * 用户修改个人头像
	 * @param pro
	 * @return
	 */
	@Update("update sys_user set imgurl = #{imgurl}"
			+ " where userId = #{userId}")
	void userUpdateImg(Long userId,String imgurl);
}

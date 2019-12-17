package com.express.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.express.web.model.SysUser;



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
	@Select("select "+ param +" from sys_user order by userId desc")
	@Results(id="SysUserMap",
	value={
		@Result(id=true,property="id",column="id"),
		@Result(property="userName",column="userName"),
		@Result(property="password",column="password"),
		@Result(property="phone",column="phone"),
		@Result(property="rolu",column="rolu"),
		}
	)
	List<SysUser> listByAll();
	
	/**
	 * 根据账号密码获取到用户信息
	 * @param p_id
	 * @return
	 */
	@Select("select "+ param +" from sys_user where userName = #{userName} and password = #{password}")
	SysUser getSysUserInfo(@Param("userName") String userName,@Param("password") String password);

	/**
	 * 根据ID获取到用户信息
	 * @param p_id
	 * @return
	 */
	@Select("select "+ param +" from sys_user where userId = #{userId}")
	SysUser getLogin(@Param("userId") String userId);

	/**
	 * 插入记录
	 * @param logModel
	 */
	@Insert("insert into sys_user(userName, password, phone, rolu) value(#{userName}, #{password}, #{phone}, #{rolu})")
	void insertLog(SysUser userModel);
	
	/**
	 * 批量删除用户
	 * @param ids
	 * @return
	 */
	@Delete("DELETE from sys_user where userId in #{ids}")
	boolean deleteUserById(long[] ids);
	
	/**
	 * 修改用户信息
	 * @param pro
	 * @return
	 */
	@Update("update sys_user set userName = #{userName}, password = #{password}, phone = #{phone}, rolu = #{rolu}"
			+ " where userId = #{userId}")
	boolean update(SysUser user);
}

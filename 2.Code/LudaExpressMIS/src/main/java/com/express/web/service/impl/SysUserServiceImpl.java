package com.express.web.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.SysUserMapper;
import com.express.web.model.SysUser;
import com.express.web.service.SysUserService;
/**
 * 系统用户业务层实现类
 * @author Administrator
 *
 */
@Service
public class SysUserServiceImpl implements SysUserService {
	@Autowired
	SysUserMapper sysUserMapper;
	
	@Override
	public SysUser getUser(String userName, String password) {
		return sysUserMapper.getSysUserInfo(userName, password);
	}

	@Override
	public SysUser getLogin(long userId) {
		return sysUserMapper.getLogin(userId);
	}

	@Override
	public SysUser validateName(String userName) {
		return sysUserMapper.validateName(userName);
	}

	@Override
	public void insertUser(SysUser user) {
		sysUserMapper.insertUser(user);
	}

	@Override
	public void update(SysUser user) {
		sysUserMapper.update(user);
	}

	@Override
	public List<SysUser> listByAll(String search) {
		return sysUserMapper.listByAll(search);
	}

	@Override
	public boolean deleteById(long userId) {
		return sysUserMapper.deleteById(userId);
	}

}

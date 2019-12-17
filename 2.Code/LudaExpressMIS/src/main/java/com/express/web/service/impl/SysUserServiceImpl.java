package com.express.web.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.SysUserMapper;
import com.express.web.model.SysUser;
import com.express.web.service.SysUserService;
@Service
public class SysUserServiceImpl implements SysUserService {
	@Autowired
	SysUserMapper sysUserMapper;
	
	@Override
	public SysUser getUser(String userName, String password) {
		return sysUserMapper.getSysUserInfo(userName, password);
	}

	@Override
	public SysUser getLogin(Integer userId) {
		return null;
	}

}

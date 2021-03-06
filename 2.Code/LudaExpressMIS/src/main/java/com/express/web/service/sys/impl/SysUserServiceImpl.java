package com.express.web.service.sys.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.sys.SysUserMapper;
import com.express.web.model.sys.SysUser;
import com.express.web.service.sys.SysUserService;
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
		sysUserMapper.userUpdateInfo(user);
	}

	@Override
	public List<SysUser> listByAll(String search) {
		 List<SysUser> list = sysUserMapper.listByAll(search);
		 for (SysUser sysUser : list) {
			if(sysUser.getRolu() == 0) {
				sysUser.setRoluName("管理员");
			}else if(sysUser.getRolu() == 1) {
				sysUser.setRoluName("用户");
			}else {
				sysUser.setRoluName("快递员");
			}
		}
		return list;
	}

	@Override
	public boolean deleteById(long userId) {
		return sysUserMapper.deleteById(userId);
	}

	@Override
	public void userUpdateInfo(SysUser user) {
		sysUserMapper.userUpdateInfo(user);
	}

	@Override
	public void userUpdateImg(Long userId, String imgurl) {
		sysUserMapper.userUpdateImg(userId, imgurl);
	}

	@Override
	public int userUpdateTime(Long userId, String loginTime) {
		return sysUserMapper.userUpdateTime(userId, loginTime);
	}

}

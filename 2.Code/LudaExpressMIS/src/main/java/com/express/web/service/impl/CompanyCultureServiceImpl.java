package com.express.web.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.CompanyCultureMapper;
import com.express.web.model.CompanyCulture;
import com.express.web.service.CompanyCultureService;
/**
 * 企业文化业务层实现类
 * @author Administrator
 *
 */
@Service
public class CompanyCultureServiceImpl implements CompanyCultureService {

	@Autowired
	CompanyCultureMapper cultureMapper;
	
	@Override
	public List<CompanyCulture> listByAll(String search) {
		return cultureMapper.listByAll(search);
	}

	@Override
	public void insert(CompanyCulture culture) {
		cultureMapper.insert(culture);
	}

	@Override
	public void update(CompanyCulture culture) {
		cultureMapper.update(culture);
	}

	@Override
	public boolean delete(long id) {
		return cultureMapper.deleteById(id);
	}

}

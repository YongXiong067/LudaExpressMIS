package com.express.web.service.company.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.company.NoticeCultureMapper;
import com.express.web.model.company.NoticeCulture;
import com.express.web.service.company.NoticeCultureService;
/**
 * 企业文化业务层实现类
 * @author Administrator
 *
 */
@Service
public class NoticeCultureServiceImpl implements NoticeCultureService {

	@Autowired
	NoticeCultureMapper cultureMapper;
	
	@Override
	public List<NoticeCulture> listByAll(String search,String type) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
		List<NoticeCulture> list = cultureMapper.listByAll(search,type);
		if(list != null) {
			for (NoticeCulture noticeCulture : list) {
				if(noticeCulture.getRecordTime() != null) {
					noticeCulture.setRecordTimeStr(sdf.format(noticeCulture.getRecordTime()));
				}
			}
		}
		return list;
	}

	@Override
	public void insert(NoticeCulture culture) {
		cultureMapper.insert(culture);
	}

	@Override
	public void update(NoticeCulture culture) {
		cultureMapper.update(culture);
	}

	@Override
	public boolean delete(long id) {
		return cultureMapper.deleteById(id);
	}

}

package com.express.web.service.company.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.company.DotMapper;
import com.express.web.model.company.Dot;
import com.express.web.service.company.DotService;

/**
 * 网点管理业务层实现类
 * @author Administrator
 *
 */
@Service
public class DotServiceImpl implements DotService {
	@Autowired
	DotMapper dotMapper;
	
	@Override
	public Dot getDot(String dotName) {
		return dotMapper.getDot(dotName);
	}

	@Override
	public List<Dot> getDotParentList(Long parentId) {
		return dotMapper.getDotParentList(parentId);
	}
	@Override
	public void insertDot(String dotName,Long parentId) {
		dotMapper.insertDot(dotName,parentId);
	}

	@Override
	public void updateDot(Dot dot) {
		dotMapper.updateDot(dot);
	}

	@Override
	public boolean deleteDot(Long dotId) {
		return dotMapper.deleteDot(dotId);
	}

}

package com.express.web.service.cluture.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.culture.DotMapper;
import com.express.web.model.culture.Dot;
import com.express.web.service.cluture.DotService;

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
	public Dot getDot(Long dotId) {
		return dotMapper.getDot(dotId);
	}

	@Override
	public List<Dot> getDotParentList(String dotName,Long parentId) {
		return dotMapper.getDotParentList(dotName, parentId);
	}
	@Override
	public void insertDot(Dot dot) {
		dotMapper.insertDot(dot);
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

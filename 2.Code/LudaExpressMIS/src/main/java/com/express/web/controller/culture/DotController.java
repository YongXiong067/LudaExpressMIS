package com.express.web.controller.culture;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.express.web.model.culture.Dot;
import com.express.web.service.cluture.DotService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * 网点管理控制器
 * @author Administrator
 *
 */
@Api(value="网点管理控制器",description = "网点管理控制器")
@Controller
@RequestMapping("/api/dot")
public class DotController {
	@Autowired
	DotService dotService;
	
	@ApiOperation(value = "getDot", notes = "根据网点id查询出网点信息")
	@GetMapping("/getDot")
	@ResponseBody
	public Dot getDot(@ApiParam(value = "网点id" ,required=true )@RequestParam String dotName) {
		return dotService.getDot(dotName);
	}

	@ApiOperation(value = "getDotParentList", notes = "根据网点名称和父id查询出网点信息 父网点pid为-1，子网点根据左侧父网点的dotid来取")
	@GetMapping("/getDotParentList")
	@ResponseBody
	public List<Dot> getDotParentList(@ApiParam(value = "父id" ,required=true ) @RequestParam Long parentId) {
		return dotService.getDotParentList(parentId);
	}
	
	@ApiOperation(value = "insertDot", notes = "新增网点信息")
	@GetMapping("/insertDot")
	@ResponseBody
	public int insertDot(@ApiParam(value = "网点对象" ,required=true ) @RequestParam String dotName,@RequestParam Long parentId) {
		int success = 0;
		try {
			Dot dot = dotService.getDot(dotName);
			if(dot != null) {
				success = -1;
			}else {
				dotService.insertDot(dotName,parentId);
				success = 1;
			}
		}catch(Exception e) {
			return success;
		}
		return success;
	}
	@ApiOperation(value = "updateDot", notes = "更新网点信息")
	@PostMapping("/updateDot")
	@ResponseBody
	public boolean updateDot(@ApiParam(value = "网点对象" ,required=true ) @RequestBody Dot dot) {
		boolean bool = false;
		try {
			dotService.updateDot(dot);
			bool = true;
		}catch(Exception e) {
			return bool;
		}
		return bool;
	}
	@ApiOperation(value = "deleteDot", notes = "根据网点id删除网点信息")
	@GetMapping("/deleteDot")
	@ResponseBody
	public boolean deleteDot(@ApiParam(value = "网点id" ,required=true ) @RequestParam Long dotId) {
		 List<Dot> dot = dotService.getDotParentList(dotId);
		 if(dot != null) {
			 for (Dot dot2 : dot) {
				 dotService.deleteDot(dot2.getDotId());
			}
		 }
		return dotService.deleteDot(dotId);
	}
}

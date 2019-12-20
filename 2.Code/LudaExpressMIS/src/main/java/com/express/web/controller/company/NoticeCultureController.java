package com.express.web.controller.company;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.express.web.model.company.NoticeCulture;
import com.express.web.service.company.NoticeCultureService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * 企业文化、公告管理控制器
 * @author Administrator
 *
 */
@Controller
@Api(value = "企业文化、公告控制器",description ="企业文化、公告控制器")
@RequestMapping("/api/company")
public class NoticeCultureController {
	@Autowired
	NoticeCultureService cultureService;
	@Autowired
	HttpServletRequest request;

	@ApiOperation(value = "getCulture", notes = "查询出企业文化、公告列表")
	@GetMapping("/getCulture")
	@ResponseBody
	public List<NoticeCulture> getCulture(@ApiParam(value = "查询参数，可根据标题或者内容自动匹配" ,required=false )@RequestParam String search,@ApiParam(value = "类型" ,required=false )@RequestParam String type){
		if(type == "") {
			type = "1";
		}
		return cultureService.listByAll(search,type);
	}

	@ApiOperation(value = "insertCulture", notes = "添加企业文化、公告")
	@PostMapping("/insertCulture")
	@ResponseBody
	public boolean insertCulture(@ApiParam(value = "企业文化、公告实体类" ,required=true )@RequestBody NoticeCulture culture){
		boolean bool = false;
		try {
			cultureService.insert(culture);
			bool = true;
		}catch(Exception e) {
			return bool;
		}
		return bool;
	}

	@ApiOperation(value = "updateCulture", notes = "修改企业文化、公告")
	@PostMapping("/updateCulture")
	@ResponseBody
	public boolean updateCulture(@ApiParam(value = "根据企业文化、公告的id修改企业文化、公告内容" ,required=true )@RequestBody NoticeCulture culture){
		boolean bool = false;
		try {
			cultureService.update(culture);
			bool = true;
		}catch(Exception e) {
			System.out.println(e);
			return bool;
		}
		return bool;
	}

	@ApiOperation(value = "deleteCulture", notes = "删除企业文化、公告")
	@GetMapping("/deleteCulture")
	@ResponseBody
	public boolean deleteCulture(@ApiParam(value = "根据企业文化、公告的id删除企业文化、公告内容" ,required=true )@RequestParam long id) {
		boolean bool = false;
		try {
			cultureService.delete(id);
			bool = true;
		}catch(Exception e) {
			return bool;
		}
		return bool;
	}
}

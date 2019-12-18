Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@yihuihe-mine 
1
12YongXiong067/LudaExpressMIS
 Code Issues 0 Pull requests 0 Actions Projects 0 Wiki Security Insights
LudaExpressMIS/2.Code/LudaExpressMIS/src/main/java/com/express/web/controller/culture/CompanyCultureController.java
@YongXiong067 YongXiong067 加入包名
569e3b6 13 hours ago
84 lines (74 sloc)  2.64 KB
  
package com.express.web.controller.culture;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.express.web.model.culture.CompanyCulture;
import com.express.web.service.cluture.CompanyCultureService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * 企业文化管理控制器
 * @author Administrator
 *
 */
@Controller
@Api(value = "企业文化控制器",description ="企业文化控制器")
@RequestMapping("/api/company")
public class CompanyCultureController {
	@Autowired
	CompanyCultureService cultureService;
	@Autowired
	HttpServletRequest request;

	@ApiOperation(value = "getCulture", notes = "查询出企业文化列表")
	@PostMapping("/getCulture")
	@ResponseBody
	public List<CompanyCulture> getCulture(@ApiParam(value = "查询参数，可根据标题或者内容自动匹配" ,required=false )@RequestParam String search){
		return cultureService.listByAll(search);
	}

	@ApiOperation(value = "insertCulture", notes = "添加企业文化")
	@PostMapping("/insertCulture")
	@ResponseBody
	public boolean insertCulture(@ApiParam(value = "企业文化实体类" ,required=true )@RequestBody CompanyCulture culture){
		boolean bool = false;
		try {
			cultureService.insert(culture);
			bool = true;
		}catch(Exception e) {
			return bool;
		}
		return bool;
	}

	@ApiOperation(value = "updateCulture", notes = "修改企业文化")
	@PostMapping("/updateCulture")
	@ResponseBody
	public boolean updateCulture(@ApiParam(value = "根据企业文化的id修改企业文化内容" ,required=true )@RequestBody CompanyCulture culture){
		boolean bool = false;
		try {
			cultureService.update(culture);
			bool = true;
		}catch(Exception e) {
			return bool;
		}
		return bool;
	}

	@ApiOperation(value = "deleteCulture", notes = "删除企业文化")
	@PostMapping("/deleteCulture")
	@ResponseBody
	public boolean deleteCulture(@ApiParam(value = "根据企业文化的id删除企业文化内容" ,required=true )@RequestParam long id) {
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

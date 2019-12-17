package com.express.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.express.web.model.CompanyCulture;
import com.express.web.service.CompanyCultureService;

/**
 * 企业文化管理控制器
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/api/company")
public class CompanyCultureController {
	@Autowired
	CompanyCultureService cultureService;
	@Autowired
	HttpServletRequest request;

	@PostMapping("/getCulture")
	@ResponseBody
	public List<CompanyCulture> getCulture(@RequestParam String search){
		return cultureService.listByAll(search);
	}

	@PostMapping("/insertCulture")
	@ResponseBody
	public boolean insertCulture(@RequestBody CompanyCulture culture){
		boolean bool = false;
		try {
			cultureService.insert(culture);
			bool = true;
		}catch(Exception e) {
			return bool;
		}
		return bool;
	}

	@PostMapping("/updateCulture")
	@ResponseBody
	public boolean updateCulture(@RequestBody CompanyCulture culture){
		boolean bool = false;
		try {
			cultureService.update(culture);
			bool = true;
		}catch(Exception e) {
			return bool;
		}
		return bool;
	}

	@PostMapping("/deleteCulture")
	@ResponseBody
	public boolean deleteCulture(@RequestParam long id) {
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

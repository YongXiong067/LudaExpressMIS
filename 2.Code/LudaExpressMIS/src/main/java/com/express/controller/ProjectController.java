package com.express.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.djbh.jzt.util.GetScreen;
import com.djbh.mapper.db.DropdownMapper;
import com.djbh.mapper.project.ProjectMapper;
import com.djbh.model.project.Project;
import com.djbh.model.project.Screen;
import com.djbh.service.Sys_LogService;

/**
 * 项目信息控制器
 * @author Charlene
 *
 */

@Controller
@RequestMapping("/api/v2/project")
public class ProjectController {


	@Autowired
	ProjectMapper projectmapper;

	@Autowired
	DropdownMapper dropdownmapper;
	
	@Autowired
	GetScreen getscreen;

	@Autowired
	Sys_LogService service;
	
	/**
	 * 分页获取详细列表
	 * @param p_tagle
	 * @param page_no
	 * @param page_line
	 * @return
	 */
	@GetMapping("/getListByLimit")
	@ResponseBody
	public List<Project> listByLimit(@RequestParam String state, @RequestParam String p_tagle, @RequestParam int page_no, @RequestParam int page_line,
			@RequestParam String position, @RequestParam String search, @RequestParam String w_year, @RequestParam String a_year) {


		if("0".equals(state)) {
			state = null;
		}
		//判断页面状态p_tagle
		if("0".equals(p_tagle)) {
			p_tagle = null;
		}else {
			p_tagle =  dropdownmapper.getCodeByValue(p_tagle);
		}
		//判断参数position是否为空，
		if("0".equals(position)) {
			position = null;
		}
		//判断参数search是否为空，
		if("".equals(search)) {
			search = null;
		}else {
			search = "%"+search+"%";
		}
		//判断参数入库时间是否为空，
		if("0".equals(w_year)) {
			w_year = null;
		}
		//判断参数立项时间是否为空，
		if("0".equals(a_year)) {
			a_year = null;
		}

		//按参数查询
		return projectmapper.listByLimit(state, p_tagle, position, search, w_year, a_year, (page_no-1)*page_line, page_line);

	}

	/**
	 * 分页获取详细列表
	 * @param p_tagle
	 * @param page_no
	 * @param page_line
	 * @return
	 */
	@PostMapping("/getListByLimit")
	@ResponseBody
	public List<Project> listByLimit(@RequestBody Screen scr) {
		
		Screen screen = getscreen.getScreen(scr);

		//按参数查询
		return projectmapper.listByLimit_(screen);

	}

	/**
	 * 分页获取详细列表
	 * @param p_tagle
	 * @param page_no
	 * @param page_line
	 * @return
	 */
	@PostMapping("/listByLimitPayment")
	@ResponseBody
	public List<Project> listByLimitPayment(@RequestBody Screen scr) {
		
		Screen screen = getscreen.getScreen(scr);

		//按参数查询
		return projectmapper.listByPayment(screen);

	}
	
	/**
	 * 删除数据（隐藏）
	 * @param p_id
	 * @return
	 */
	@GetMapping("/delete")
	@ResponseBody
	public boolean delete(@RequestParam int p_id){

		if(projectmapper.delete(p_id)) {
			service.insertLog("删除项目："+p_id, 1);
			return true;
		}
		
		return false;
	}

	/**
	 * 恢复数据（显示）
	 * @param p_id
	 * @return
	 */
	@GetMapping("/recovery")
	@ResponseBody
	public boolean recovery(@RequestParam int p_id){

		return projectmapper.recovery(p_id);
	}

	/**
	 * 项目下拉列表
	 * @param p_tagle
	 * @return
	 */
	@GetMapping("/getListByDropdown")
	@ResponseBody
	public List<Project> listByDropdown(@RequestParam String p_tagle){
		//判断页面状态p_tagle
		p_tagle =  dropdownmapper.getCodeByValue(p_tagle);

		//按参数查询
		return projectmapper.listByDropdown(p_tagle);
	}

	/**
	 * 获取合同关联的项目列表
	 * @param p_tagle
	 * @return
	 */
	@GetMapping("/getListByCId")
	@ResponseBody
	public List<Project> getListByCId(@RequestParam int c_id){

		//按参数查询
		return projectmapper.getListByCId(c_id);
	}
	
	
	/**
	 * 获取呈批件关联的项目列表
	 * @param p_tagle
	 * @return
	 */
	@GetMapping("/getListBySubId")
	@ResponseBody
	public List<Project> getListBySubId(@RequestParam int sub_id){

		//按参数查询
		return projectmapper.getListBySubId(sub_id);
	}
	
	
	/**
	 * 获取呈批件关联的项目列表
	 * @param p_tagle
	 * @return
	 */
	@GetMapping("/getListByAll")
	@ResponseBody
	public List<Project> getListByAll(){
		
		//按参数查询
		return projectmapper.listByAll();
	}
	
	/**
	 * 项目下拉列表
	 * @param p_tagle
	 * @return
	 */
	@GetMapping("/getListByPaymentPro")
	@ResponseBody
	public List<Project> listByPaymentPro(@RequestParam String p_tagle, @RequestParam String p_tagle_){
		//按参数查询
		return projectmapper.listByPaymentPro(p_tagle, p_tagle_);
	}
	
	
	/**
	 * 恢复数据（显示）
	 * @param p_id
	 * @return
	 */
	@PostMapping("/updatePro")
	@ResponseBody
	public boolean updatePro(@RequestBody Project pro){
		String posi = dropdownmapper.getCodeByValue(pro.getPosition());
		pro.setPosition(posi);
		String over = dropdownmapper.getCodeByValue(pro.getOverall_type());
		pro.setOverall_type(over);
		String tagle = dropdownmapper.getCodeByValue(pro.getP_tagle());
		pro.setP_tagle(tagle);
		String pla = dropdownmapper.getCodeByValue(pro.getPlanning_type());
		pro.setPlanning_type(pla);
		return projectmapper.update(pro);
	}


}

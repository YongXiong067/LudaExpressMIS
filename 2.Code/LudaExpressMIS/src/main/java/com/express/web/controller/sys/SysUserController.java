package com.express.web.controller.sys;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.express.web.model.sys.SysUser;
import com.express.web.service.sys.SysUserService;

import io.swagger.annotations.Api;


/**
 * 用户控制器
 * @author Charlene
 *
 */
@Api(value = "用户控制器",description ="用户控制器")
@Controller
@RequestMapping("/api/user")
public class SysUserController {

	@Autowired
	SysUserService service;
	@Autowired
	HttpServletRequest request;
	
	

	/**
	 * 用户登录
	 * @param userName
	 * @param password
	 * @return
	 */
	@PostMapping("/login")
	@ResponseBody
	public int login(@RequestBody SysUser user) {
		//按参数查询
		SysUser sysUser = service.getUser(user.getUserName(),user.getPassword() );
		if(sysUser != null) {
			HttpSession session = request.getSession(true);
			session.setAttribute("userId", sysUser.getUserId());
			session.setAttribute("userName", sysUser.getUserName());
			session.setAttribute("rolu", sysUser.getRolu());
	        //生成时间,登录时创建新的时间
			Long orderNums =  new Date().getTime();
	        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        String sd = sdf.format(new Date(orderNums));
			service.userUpdateTime(sysUser.getUserId(), sd);
			return 11;
		}
		return -1;
	}
	/**
	 * 注销登录
	 * @return
	 */
	@GetMapping("/cancellation")
	@ResponseBody
	public int cancellation() {
		HttpSession session = request.getSession(true);
		session.setAttribute("userId", null);
		session.setAttribute("userName", null);
		session.setAttribute("rolu", null);
		return 1;
	}
	/**
	 *  注册用户
	 * @return
	 */
	@PostMapping("/register")
	@ResponseBody
	public int register(@RequestBody SysUser user) {
		try {
			//验证
			SysUser sysUser = service.validateName(user.getUserName());
			if(sysUser != null) {
				return -1;
			}else {
				user.setRolu(1);
				user.setImgurl("images/img.jpg");
				service.insertUser(user);
				return 11;
			}
		}catch(Exception e) {
			return -1;
		}
	}
	/**
	 *  管理员添加用户
	 * @return
	 */
	@PostMapping("/insertUser")
	@ResponseBody
	public int insertUser(@RequestBody SysUser user) {
		try {
			//验证
			SysUser sysUser = service.validateName(user.getUserName());
			if(sysUser != null) {
				return -1;
			}else {
				if(user.getRolu() == -1) {
					user.setRolu(1);
				}
				user.setImgurl("images/img.jpg");
				service.insertUser(user);
				return 11;
			}
		}catch(Exception e) {
			return -1;
		}
	}
	/**
	 * 修改密码
	 * @return
	 */
	@GetMapping("/updatePwd")
	@ResponseBody
	public int updatePwd() {
		try {
			String oldPwd = request.getParameter("oldPwd");
			String newPwd = request.getParameter("newpwd");
			HttpSession session = request.getSession(true);
			String userName = (String) session.getAttribute("userName");
			//验证
			SysUser sysUser = service.getUser(userName, oldPwd);
			SysUser user = new SysUser();
			if(sysUser != null) {
				user.setPassword(newPwd);
				user.setPhone(sysUser.getPhone());
				user.setRolu(sysUser.getRolu());
				user.setUserName(userName);
				user.setUserId(sysUser.getUserId());
				service.update(user);
				return 1;
			}else {
				return -1;
			}
		}catch(Exception e) {
			return -1;
		}
	}
	/**
	 * 	修改用户信息
	 * @return
	 */
	@PostMapping("/update")
	@ResponseBody
	public int update(@RequestBody SysUser sysUser) {
		try {
			//验证
			if(sysUser != null ) {
				service.update(sysUser);
				return 11;
			}else {
				return -1;
			}
		}catch(Exception e) {
			return -1;
		}
	}
	/**
	 * 查询所有用户或根据条件模糊匹配查询用户
	 * @return
	 */
	@GetMapping("/getAllUser")
	@ResponseBody
	public List<SysUser> getAllUser(@RequestParam String search){
		List<SysUser> userList = service.listByAll(search);
		return userList;
	}
	/**
	 * 删除用户信息
	 * @return
	 */
	@GetMapping("/deleteUser")
	@ResponseBody
	public boolean deleteUser() {
		boolean bool = false;
		long id = Integer.parseInt(request.getParameter("userId"));
		try {
			bool = service.deleteById(id);
		}catch(Exception e ) {
			bool = false;
		}
		return bool;
	}
	
	/**
	 * 获取单个用户
	 * @return
	 */
	@GetMapping("/getUser")
	@ResponseBody
	public SysUser getUser(){
		HttpSession session = request.getSession(true);
		SysUser user = null;
		if((Long) session.getAttribute("userId")!= null) {
			user = service.getLogin((long) session.getAttribute("userId"));
		}else {
			user = new SysUser();
			user.setUserId(0);
		}
		return user;
	}
	
	/**
	 * 用户修改自己的信息
	 * @return
	 */
	@PostMapping("/uploadImg")
	@ResponseBody
	public int userUpdateInfo(@RequestParam("lefile") MultipartFile[] file) {
		HttpSession session = request.getSession(true);
		Long userId = (long) session.getAttribute("userId");
		//图片上传
        if(!file[0].isEmpty()){
            try {
            	for (MultipartFile m:file) {
                	//上传图片并返回路径
                   String pathName =  uploadDesignChangeImg(m);
                   String path = pathName.substring(pathName.indexOf("upload/"),pathName.length());
                   service.userUpdateImg(userId, path);
                   return 1;
                }
            }catch(Exception e) {
            	return 0;
            }
        }
		return -1;
	}
	
	//将文件写入到本地并返回路径名
    public String uploadDesignChangeImg(MultipartFile file){
        //文件名
        String fileName = file.getOriginalFilename();
        System.out.println(file.getName());
        //生成时间戳
        long currentDate = System.currentTimeMillis();

        int index = fileName.lastIndexOf(".");
        //文件后缀
        String suffix  = fileName.substring(index + 1);
        //文件路径
        String contentPath = getClass().getResource("/").getPath();
		String path = contentPath.substring(1,contentPath.length()) +"static/upload/";
        String filePath = path + currentDate+"."+suffix ;

        FileOutputStream out = null;
        try {
            byte[] bytes = file.getBytes();
            File newFile = new File(filePath);
            if (!newFile.exists()) {
                newFile.getParentFile().mkdirs();
                //创建文件
                newFile.createNewFile();
            }
            out = new FileOutputStream(newFile);
            out.write(bytes);
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return filePath;
    }
}

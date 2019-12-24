package com.express.web.controller.message;

import com.express.web.model.message.leavingMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.express.web.service.message.leavingMessageService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/22
 * @Description:
 */

@Api(value = "留言管理",description ="留言管理控制器")
@RestController
@RequestMapping("/api/leavingMesaage")
public class leavingMessageController {

    @Autowired
    private leavingMessageService leavingMessageService;
    @Autowired
    HttpServletRequest request;

    @ApiOperation(value = "getMessage", notes = "查询留言表")
    @GetMapping("/getMessage")
    public List<leavingMessage> getMessage(@ApiParam(value = "查询参数，可根据内容自动匹配" ,required=false )@RequestParam String search){
        return leavingMessageService.listByAll(search);
    }


    @PostMapping("/insertMessage")
    @ApiOperation(value = "insertMessage", notes = "添加留言表")
    public boolean insertMessage(@RequestBody leavingMessage Message){
        boolean bool = false;
        try {
            HttpSession session = request.getSession(true);
            Long userId = (Long)session.getAttribute("userId");
            int rule = (int)session.getAttribute("rolu");
            Message.setUserId(userId.intValue());
            if(rule==0){
                Message.setState(2);
            }else if(rule==1){
                Message.setState(1);
            }
            leavingMessageService.insert(Message);
            bool = true;
        }catch(Exception e) {
            return bool;
        }
        return bool;
    }

    @ApiOperation(value = "updateMessage", notes = "修改留言")
    @PostMapping("/updateMessage")
    public boolean updateMessage(@ApiParam(value = "根据留言id修改留言内容" ,required=true )@RequestBody leavingMessage leavingMessage){
        boolean bool = false;
        try {
            HttpSession session = request.getSession(true);
            int ruleId = (int)session.getAttribute("rolu");
            if(ruleId == 0){
                leavingMessage.setState(2);
                leavingMessageService.update(leavingMessage);
                bool = true;
            }else{
                System.out.println("非管理员，禁止修改");
                return bool;
            }
        }catch(Exception e) {
            System.out.println(e);
            return bool;
        }
        return bool;
    }

    @ApiOperation(value = "deleteMessage", notes = "删除留言")
    @GetMapping("/deleteMessage")
    public boolean deleteMessage(@ApiParam(value = "根据留言id删除留言内容" ,required=true )@RequestParam long id) {
        boolean bool = false;
        try {
            HttpSession session = request.getSession(true);
            int ruleId = (int)session.getAttribute("rolu");
            if(ruleId == 0){
                leavingMessageService.delete(id);
                bool = true;
            }else{
                System.out.println("非管理员，禁止删除");
                return bool;
            }
        }catch(Exception e) {
            return bool;
        }
        return bool;
    }
}

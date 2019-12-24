package com.express.web.service.message.impl;

import com.express.web.mapper.SysUserMapper;
import com.express.web.mapper.message.leavingMessageMapper;
import com.express.web.model.SysUser;
import com.express.web.model.message.leavingMessage;
import com.express.web.service.message.leavingMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/22
 * @Description:
 */
@Service
public class leavingMessageServiceImpl implements leavingMessageService {

    @Autowired
    private leavingMessageMapper leavingMessageMapper;

    @Autowired
    private SysUserMapper sysUserMapper;

    @Override
    public List<leavingMessage> listByAll(String search) {
        List<leavingMessage> resultList = leavingMessageMapper.listByAll(search);
        if(resultList.size()>0){
            for (leavingMessage ms:resultList) {
                SysUser sysUser =  sysUserMapper.getLogin(ms.getUserId());
                ms.setName(sysUser.getUserName());
                ms.setStateName(ms.getState()==1?"已留言":"已回复");
            }
        }
        return resultList;
    }

    @Override
    public void insert(leavingMessage leavingMessage) {
        leavingMessageMapper.insert(leavingMessage);
    }

    @Override
    public void update(leavingMessage leavingMessage) {
        leavingMessageMapper.update(leavingMessage);
    }

    @Override
    public boolean delete(long id) {
        return leavingMessageMapper.deleteById(id);
    }
}

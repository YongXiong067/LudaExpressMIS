package com.express.web.service.message;
import com.express.web.model.message.leavingMessage;

import java.util.List;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/22
 * @Description:
 */
public interface leavingMessageService {

    /**
     * 	根据查询条件获取信息
     * @param search
     * @return
     */
    List<leavingMessage> listByAll(String search,Long userId);
    /**
     * 添加留言信息
     * @param culture
     */
    void insert(leavingMessage leavingMessage);
    /**
     * 修改留言信息
     * @param culture
     */
    void update(leavingMessage leavingMessage);
    /**
     * 删除留言信息
     * @param id
     * @return
     */
    boolean delete(long id);
}

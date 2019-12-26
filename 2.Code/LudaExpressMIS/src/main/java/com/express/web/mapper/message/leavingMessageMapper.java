package com.express.web.mapper.message;

import com.express.web.model.message.leavingMessage;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/22
 * @Description:
 */
@Mapper
public interface leavingMessageMapper {

    /**
     * sql参数
     */
    final static String param = "*";
    /**
     * 获取全部数据
     * @param search
     * @return
     */
    @Select("<script>"
            + "select "+ param +" from leaving_message "
            + "where 1=1 "
            +"<if test= 'userId != null'> and userId = #{userId} </if>"
            +"<if test= 'search != null'> and ( Content like concat('%',#{search},'%')) </if>"
            +"</script>")
    @Results(id="MessageMap",
            value={
                    @Result(id=true,property="leavingId",column="leavingId"),
                    @Result(property="userId",column="userId"),
                    @Result(property="state",column="state"),
                    @Result(property="content",column="content"),
                    @Result(property="rsContert",column="resultContent")
            }
    )
    List<leavingMessage> listByAll(@Param("search") String search,Long userId);

    /**
     * 插入记录
     * @param companyModel
     */
    @Insert("insert into leaving_message(userId, State,Content,resultContent) value(#{userId}, #{state},#{content},#{rsContert})")
    void insert(leavingMessage leavingMessage);

    /**
     * 修改信息
     * @return
     */
    @Update("update leaving_message set resultContent = #{rsContert},State = #{state}"
            + " where leavingId = #{leavingId}")
    boolean update(leavingMessage leavingMessage);

    /**
     * 删除信息
     * @param id
     * @return
     */
    @Delete("DELETE from leaving_message where leavingId = #{leavingId}")
    boolean deleteById(long ncId);
}

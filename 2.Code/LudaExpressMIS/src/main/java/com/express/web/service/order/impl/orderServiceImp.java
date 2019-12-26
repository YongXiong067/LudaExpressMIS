package com.express.web.service.order.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.express.web.mapper.company.DotMapper;
import com.express.web.mapper.order_mapper.DeliverGoodMapper;
import com.express.web.mapper.order_mapper.ordersMapper;
import com.express.web.mapper.sys.SysUserMapper;
import com.express.web.model.company.Dot;
import com.express.web.model.order_model.Orders;
import com.express.web.model.sys.SysUser;
import com.express.web.service.order.orderServie;

import net.sf.json.JSONObject;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/18
 * @Description:
 */
@Service
public class orderServiceImp implements orderServie {

    @Autowired
    private ordersMapper ordersMapper;
    @Autowired
    private DotMapper dotMapper;
    @Autowired
    private SysUserMapper userMapper;
    @Autowired
    private DeliverGoodMapper goodMapper;
    
    @Override
    public List<Orders> listByAll(String search,Long userId) {
        List<Orders> list =  ordersMapper.listByAll(search,userId);
        if(list.size()>0){
            for (Orders od :list) {
                Dot dot =  dotMapper.getDotById(od.getDotId());
                if(null!=dot){
                    od.setDotName(dot.getDotName());
                }
                if(od.getCurrentUser() != null) {
                	SysUser user = userMapper.getLogin(Long.parseLong(od.getCurrentUser()));
                	if(user != null) {
                		od.setUserName(user.getUserName());
                	}
                }
            }
        }
        return list;
    }

    /**
     * 根据参数查找订单
     * @param orders
     * @return
     */
    public Orders selectOrder(Orders orders) {

        return ordersMapper.selectOrder(orders);
    }

    /**
//     * 查看订单+
//    /**
//     * 查寻多条订单
//     * @param orders
//     */
//    public List<orders> selectMoreOrder(orders orders) {
//
//        return ordersMapper.listByAll(orders);
//    }

    /**
     * 添加订单
     * @param orders
     */
    public int addOrder(Orders orders) {
        //自动生成订单id 格式年月日是分秒时间戳
        Long orderNums =  new Date().getTime();
        orders.setOrderNum(String.valueOf(orderNums));
        //生成订单时间
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sd = sdf.format(new Date(orderNums));
        orders.setOrderDate(sd);
        orders.setState(String.valueOf(0));
        //处理步骤记录 :格式为: 处理人姓名 + 订单状态 + 所产生步奏时间
        String content = orders.getCurrentUser() +","+orders.getState()+","+sd;
        orders.setContent(content);
        return ordersMapper.insert(orders);
    }

    /**
     * 删除订单
     * @param orders
     * @return
     */
    public int deleterOrder(Orders orders) {
        return ordersMapper.deleteById(orders.getOrderId());
    }

    /**
     * 修改订单
     * @param orders
     * @return
     */
    public int updaterOrder(Orders orders ,Long userId) {
        //时间格式化
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        String nowDate = sdf.format(date);
        String content = "";
        //判断是否有该订单
        if(orders != null) {
            //获取到原有的content值,先判断是否为空
            if(orders.getContent() != null) {
                content = orders.getContent();
                //如果值为空，则是第一次存储，需要去掉前面的；号
                if(content == "") {
                    content +=userId+","+orders.getState()+","+nowDate+"";
                }else {
                	String[] contArr = content.split(";");
                	for(int i = 0;i<contArr.length;i++) {
                		content = "";
                		if(contArr[i].split(",")[1].equals(orders.getState())) {
                			System.out.println(111);
                			contArr[i] = userId+","+orders.getState()+","+nowDate+"";
                		}
                		System.out.println(contArr[i]);
                		content += contArr[i]+";";
                	}
                	content = content.substring(0, content.length()-1);
                	System.out.println(content);
                }
            }
        }
        orders.setContent(content);
        return ordersMapper.update(orders);
    }

	@Override
	public List<JSONObject> getContent(Long orderId) {
		//存放数据的地方
		List<JSONObject> jsonList = new ArrayList<JSONObject>();
		//根据传过来的订单id获取到订到的内容信息
		Orders od = goodMapper.getById(orderId);
		if(od != null && od.getContent() != null) {
			String content = od.getContent();
			//对内容进行切割
			String[] contentArr = content.split(";");
			for (int i = 0;i<contentArr.length; i++) {
				JSONObject json = new JSONObject();
				String[] conArr = contentArr[i].split(",");
				//获取到用户信息
				SysUser user = userMapper.getLogin(Long.parseLong(conArr[0]));
				json.put("user",user.getUserName());
				switch(user.getRolu()) {
				case 0: user.setRoluName("管理员");break;
				case 1: user.setRoluName("用户");break;
				case 2: user.setRoluName("快递员");break;
				default: user.setRoluName("未知");break;
				}
				json.put("roluName",user.getRoluName());
				json.put("userImg",user.getImgurl());
				String state = "";
				//对状态进行转换
				switch (Integer.valueOf(conArr[1])){
		            case 0: state = "预约";break;
		            case 1: state = "揽件";break;
		            case 2: state = "运输中";break;
		            case 3: state = "派送中";break;
		            case 4: state = "已签收";break;
		            default:state = "其他";break;
				}
				json.put("state",state);
				json.put("time",conArr[2]);
				jsonList.add(json);
			}
		}
		return jsonList;
	}
}

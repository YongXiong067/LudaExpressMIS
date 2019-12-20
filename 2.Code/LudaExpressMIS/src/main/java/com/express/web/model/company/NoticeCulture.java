package com.express.web.model.company;

/**
 * 企业文化实体类
 * @author Administrator
 *
 */
public class NoticeCulture {
	/**
	 * 企业文化id
	 */
	private Long ncId;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 内容
	 */
	private String content;
	/**
	 * 类型 1为公告2为企业文化
	 */
	private Integer type;
	
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Long getNcId() {
		return ncId;
	}
	public void setNcId(Long ncId) {
		this.ncId = ncId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	@Override
	public String toString() {
		return "NoticeCulture [ncId=" + ncId + ", title=" + title + ", content=" + content + ", type=" + type + "]";
	}
	
}

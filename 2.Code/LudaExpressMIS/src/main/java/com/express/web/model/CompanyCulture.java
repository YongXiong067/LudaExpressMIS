package com.express.web.model;

/**
 * 企业文化实体类
 * @author Administrator
 *
 */
public class CompanyCulture {
	/**
	 * 企业文化id
	 */
	private long cultureId;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 内容
	 */
	private String content;
	public long getCultureId() {
		return cultureId;
	}
	public void setCultureId(long cultureId) {
		this.cultureId = cultureId;
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
		return "CompanyCulture [cultureId=" + cultureId + ", title=" + title + ", content=" + content + "]";
	}
	
	
}

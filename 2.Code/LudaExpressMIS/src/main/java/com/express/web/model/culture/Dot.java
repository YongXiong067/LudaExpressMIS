package com.express.web.model.culture;

/**
 * 网点实体类
 * @author Administrator
 *
 */
public class Dot {
	/**
	 * 网点id
	 */
	private Long dotId;
	/**
	 * 网点的父id
	 */
	private Long parentId;
	/**
	 * 网点名称
	 */
	private String dotName;
	public Long getDotId() {
		return dotId;
	}
	public void setDotId(Long dotId) {
		this.dotId = dotId;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public String getDotName() {
		return dotName;
	}
	public void setDotName(String dotName) {
		this.dotName = dotName;
	}
	@Override
	public String toString() {
		return "Dot [dotId=" + dotId + ", parentId=" + parentId + ", dotName=" + dotName + "]";
	}
	
	
}

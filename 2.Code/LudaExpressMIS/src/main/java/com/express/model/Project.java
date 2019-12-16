package com.express.model;

/**
 * 项目实体类
 * @author Charlene
 *
 */
public class Project {
	
	private String p_tagle;
	/*----------------项目入库-------------- */
	/**
	 * 项目id
	 */
	private int p_id;
	/**
	 * 项目名称
	 */
	private String p_name;
	/**
	 * 归属处室
	 */
	private String position;
	/**
	 * 申报金额
	 */
	private double declare_money;
	/**
	 * 入库时间
	 */
	private String warehousing_time;
	/**
	 * 入库文件名称
	 */
	private String warehousing_fileName;
	/**
	 * 入库文件路径
	 */
	private String warehousing_fileUrl;
	/**
	 * 文档存放
	 */
	private String document;
	/**
	 * 统筹类型
	 */
	private String overall_type;
	/**
	 * 存在标识
	 */
	private String state;
	
	/*----------------项目立项-------------- */
	/**
	 * 资金来源
	 */
	
	/**
	 * 指标文号
	 */
	
	/**
	 * 采购方式
	 */
	
	/**
	 * 审核金额
	 */
	private double examine_money;
	/**
	 * 立项时间
	 */
	private String approval_time;
	/**
	 * 立项资料名称
	 */
	private String approval_fileName;
	/**
	 * 立项资料路径
	 */
	private String approval_fileUrl;
	
	/*----------------指标登录-------------- */
	
	/**
	 * 支出功能科目
	 */
	private String functional_subjects;
	/**
	 * 支出经济科目
	 */
	private String economic_subjects;
	/**
	 * 应下达时间
	 */
	private String delivery_time;
	/**
	 * 实际下达时间
	 */
	private String actual_delivery_time;
	/**
	 * 指标说明
	 */
	private String indicator_description;
	
	/*----------------项目招标-------------- */
	/**
	 * 供应商
	 */
	private String contractor;
	/**
	 * 中标金额
	 */
	private double bid_money;
	/**
	 * 中标时间
	 */
	private String bid_time;
	/**
	 * 中标资料
	 */
	private String bid_fileName;
	/**
	 * 中标资料路径
	 */
	private String bid_fileUrl;
	
	/*----------------项目督办-------------- */
	/**
	 * 督办人
	 */
	private String sup_person;
	/**
	 * 督办内容
	 */
	private String sup_text;
	/**
	 * 督办时间
	 */
	private String sup_time;
	/**
	 * 项目进度情况
	 */
	private String project_situation;
	/**
	 * 反馈人
	 */
	private String feedback_person;
	/**
	 * 反馈内容
	 */
	private String feedback_text;
	
	/*----------------验收-------------- */
	/**
	 * 验收初步意见
	 */
	private String acceBefore_opinion;
	/**
	 * 预验收时间
	 */
	private String acceBefore_time;
	/**
	 * 预验收文档
	 */
	private String acceBefore_fileName;
	/**
	 * 预验收文档路径
	 */
	private String acceBefore_fileUrl;
	/**
	 * 是否同意验收
	 */
	private String is_acceBefore;
	/**
	 * 验收时间
	 */
	private String acce_time;
	/**
	 * 用户方意见
	 */
	private String acce_user_opinion;
	/**
	 * 建设方意见
	 */
	private String acce_build_opinion;
	/**
	 * 组织方意见
	 */
	private String acce_organ_opinion;
	/**
	 * 验收报告文档
	 */
	private String acce_fileName;
	/**
	 * 验收报告文档路径
	 */
	private String acce_fileUrl;
	/**
	 * 验收结论
	 */
	private String acce_result;
	/*----------------付款进度-------------- */
	/**
	 * 应付款
	 */
	private double payable_money;
	/**
	 * 已付款
	 */
	private double payment_money;
	/**
	 * 付款进度
	 */
	private double progress;
	
	/**
	 * 项目付款状态
	 */
	private String planning_type;
	/**
	 * 付款约定信息
	 */
	private String payment_agreement;
	/**
	 * 补进付款信息
	 */
	private String supplementary_Payment;
	/**
	 * 付款附件
	 */
	private String payment_fileName;
	/**
	 * 付款附件路径
	 */
	private String payment_fileUrl;
	/**
	 * 
	 */
	
	public Project() {
		
	}


	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public String getP_tagle() {
		return p_tagle;
	}


	public void setP_tagle(String p_tagle) {
		this.p_tagle = p_tagle;
	}


	public int getP_id() {
		return p_id;
	}


	public void setP_id(int p_id) {
		this.p_id = p_id;
	}


	public String getP_name() {
		return p_name;
	}


	public void setP_name(String p_name) {
		this.p_name = p_name;
	}


	public String getPosition() {
		return position;
	}


	public void setPosition(String position) {
		this.position = position;
	}


	public double getDeclare_money() {
		return declare_money;
	}


	public void setDeclare_money(double declare_money) {
		this.declare_money = declare_money;
	}


	public String getWarehousing_time() {
		return warehousing_time;
	}


	public void setWarehousing_time(String warehousing_time) {
		this.warehousing_time = warehousing_time;
	}


	public String getWarehousing_fileName() {
		return warehousing_fileName;
	}


	public void setWarehousing_fileName(String warehousing_fileName) {
		this.warehousing_fileName = warehousing_fileName;
	}


	public String getWarehousing_fileUrl() {
		return warehousing_fileUrl;
	}


	public void setWarehousing_fileUrl(String warehousing_fileUrl) {
		this.warehousing_fileUrl = warehousing_fileUrl;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}
	


	public double getExamine_money() {
		return examine_money;
	}


	public void setExamine_money(double examine_money) {
		this.examine_money = examine_money;
	}


	public String getApproval_time() {
		return approval_time;
	}


	public void setApproval_time(String approval_time) {
		this.approval_time = approval_time;
	}


	public String getApproval_fileName() {
		return approval_fileName;
	}


	public void setApproval_fileName(String approval_fileName) {
		this.approval_fileName = approval_fileName;
	}


	public String getApproval_fileUrl() {
		return approval_fileUrl;
	}


	public void setApproval_fileUrl(String approval_fileUrl) {
		this.approval_fileUrl = approval_fileUrl;
	}


	public String getPlanning_type() {
		return planning_type;
	}


	public void setPlanning_type(String planning_type) {
		this.planning_type = planning_type;
	}


	public String getOverall_type() {
		return overall_type;
	}


	public void setOverall_type(String overall_type) {
		this.overall_type = overall_type;
	}


	public String getFunctional_subjects() {
		return functional_subjects;
	}


	public void setFunctional_subjects(String functional_subjects) {
		this.functional_subjects = functional_subjects;
	}


	public String getEconomic_subjects() {
		return economic_subjects;
	}


	public void setEconomic_subjects(String economic_subjects) {
		this.economic_subjects = economic_subjects;
	}


	public String getDelivery_time() {
		return delivery_time;
	}


	public void setDelivery_time(String delivery_time) {
		this.delivery_time = delivery_time;
	}


	public String getActual_delivery_time() {
		return actual_delivery_time;
	}


	public void setActual_delivery_time(String actual_delivery_time) {
		this.actual_delivery_time = actual_delivery_time;
	}


	public String getIndicator_description() {
		return indicator_description;
	}


	public void setIndicator_description(String indicator_description) {
		this.indicator_description = indicator_description;
	}


	public String getContractor() {
		return contractor;
	}


	public void setContractor(String contractor) {
		this.contractor = contractor;
	}


	public double getBid_money() {
		return bid_money;
	}


	public void setBid_money(double bid_money) {
		this.bid_money = bid_money;
	}


	public String getBid_time() {
		return bid_time;
	}


	public void setBid_time(String bid_time) {
		this.bid_time = bid_time;
	}


	public String getBid_fileName() {
		return bid_fileName;
	}


	public void setBid_fileName(String bid_fileName) {
		this.bid_fileName = bid_fileName;
	}


	public String getBid_fileUrl() {
		return bid_fileUrl;
	}


	public void setBid_fileUrl(String bid_fileUrl) {
		this.bid_fileUrl = bid_fileUrl;
	}


	public String getSup_person() {
		return sup_person;
	}


	public void setSup_person(String sup_person) {
		this.sup_person = sup_person;
	}


	public String getSup_text() {
		return sup_text;
	}


	public void setSup_text(String sup_text) {
		this.sup_text = sup_text;
	}


	public String getProject_situation() {
		return project_situation;
	}


	public void setProject_situation(String project_situation) {
		this.project_situation = project_situation;
	}


	public String getFeedback_person() {
		return feedback_person;
	}


	public void setFeedback_person(String feedback_person) {
		this.feedback_person = feedback_person;
	}


	public String getFeedback_text() {
		return feedback_text;
	}


	public void setFeedback_text(String feedback_text) {
		this.feedback_text = feedback_text;
	}


	public String getAcceBefore_opinion() {
		return acceBefore_opinion;
	}


	public void setAcceBefore_opinion(String acceBefore_opinion) {
		this.acceBefore_opinion = acceBefore_opinion;
	}


	public String getAcceBefore_time() {
		return acceBefore_time;
	}


	public void setAcceBefore_time(String acceBefore_time) {
		this.acceBefore_time = acceBefore_time;
	}


	public String getAcceBefore_fileName() {
		return acceBefore_fileName;
	}


	public void setAcceBefore_fileName(String acceBefore_fileName) {
		this.acceBefore_fileName = acceBefore_fileName;
	}


	public String getAcceBefore_fileUrl() {
		return acceBefore_fileUrl;
	}


	public void setAcceBefore_fileUrl(String acceBefore_fileUrl) {
		this.acceBefore_fileUrl = acceBefore_fileUrl;
	}


	public String getIs_acceBefore() {
		return is_acceBefore;
	}


	public void setIs_acceBefore(String is_acceBefore) {
		this.is_acceBefore = is_acceBefore;
	}


	public String getAcce_time() {
		return acce_time;
	}


	public void setAcce_time(String acce_time) {
		this.acce_time = acce_time;
	}


	public String getAcce_user_opinion() {
		return acce_user_opinion;
	}


	public void setAcce_user_opinion(String acce_user_opinion) {
		this.acce_user_opinion = acce_user_opinion;
	}


	public String getAcce_build_opinion() {
		return acce_build_opinion;
	}


	public void setAcce_build_opinion(String acce_build_opinion) {
		this.acce_build_opinion = acce_build_opinion;
	}


	public String getAcce_organ_opinion() {
		return acce_organ_opinion;
	}


	public void setAcce_organ_opinion(String acce_organ_opinion) {
		this.acce_organ_opinion = acce_organ_opinion;
	}


	public String getAcce_fileName() {
		return acce_fileName;
	}


	public void setAcce_fileName(String acce_fileName) {
		this.acce_fileName = acce_fileName;
	}


	public String getAcce_fileUrl() {
		return acce_fileUrl;
	}


	public void setAcce_fileUrl(String acce_fileUrl) {
		this.acce_fileUrl = acce_fileUrl;
	}


	public String getAcce_result() {
		return acce_result;
	}


	public void setAcce_result(String acce_result) {
		this.acce_result = acce_result;
	}


	public String getSup_time() {
		return sup_time;
	}


	public void setSup_time(String sup_time) {
		this.sup_time = sup_time;
	}


	public double getPayable_money() {
		return payable_money;
	}


	public void setPayable_money(double payable_money) {
		this.payable_money = payable_money;
	}


	public double getPayment_money() {
		return payment_money;
	}


	public void setPayment_money(double payment_money) {
		this.payment_money = payment_money;
	}


	public double getProgress() {
		return progress;
	}


	public void setProgress(double progress) {
		this.progress = progress;
	}


	public String getPayment_agreement() {
		return payment_agreement;
	}


	public void setPayment_agreement(String payment_agreement) {
		this.payment_agreement = payment_agreement;
	}


	public String getSupplementary_Payment() {
		return supplementary_Payment;
	}


	public void setSupplementary_Payment(String supplementary_Payment) {
		this.supplementary_Payment = supplementary_Payment;
	}


	public String getPayment_fileName() {
		return payment_fileName;
	}


	public void setPayment_fileName(String payment_fileName) {
		this.payment_fileName = payment_fileName;
	}


	public String getPayment_fileUrl() {
		return payment_fileUrl;
	}


	public void setPayment_fileUrl(String payment_fileUrl) {
		this.payment_fileUrl = payment_fileUrl;
	}


	@Override
	public String toString() {
		return "Project [p_tagle=" + p_tagle + ", p_id=" + p_id + ", p_name=" + p_name + ", position=" + position
				+ ", declare_money=" + declare_money + ", warehousing_time=" + warehousing_time
				+ ", warehousing_fileName=" + warehousing_fileName + ", warehousing_fileUrl=" + warehousing_fileUrl
				+ ", overall_type=" + overall_type + ", state=" + state + ", examine_money=" + examine_money
				+ ", approval_time=" + approval_time + ", approval_fileName=" + approval_fileName
				+ ", approval_fileUrl=" + approval_fileUrl + ", functional_subjects=" + functional_subjects
				+ ", economic_subjects=" + economic_subjects + ", delivery_time=" + delivery_time
				+ ", actual_delivery_time=" + actual_delivery_time + ", indicator_description=" + indicator_description
				+ ", contractor=" + contractor + ", bid_money=" + bid_money + ", bid_time=" + bid_time
				+ ", bid_fileName=" + bid_fileName + ", bid_fileUrl=" + bid_fileUrl + ", sup_person=" + sup_person
				+ ", sup_text=" + sup_text + ", sup_time=" + sup_time + ", project_situation=" + project_situation
				+ ", feedback_person=" + feedback_person + ", feedback_text=" + feedback_text + ", acceBefore_opinion="
				+ acceBefore_opinion + ", acceBefore_time=" + acceBefore_time + ", acceBefore_fileName="
				+ acceBefore_fileName + ", acceBefore_fileUrl=" + acceBefore_fileUrl + ", is_acceBefore="
				+ is_acceBefore + ", acce_time=" + acce_time + ", acce_user_opinion=" + acce_user_opinion
				+ ", acce_build_opinion=" + acce_build_opinion + ", acce_organ_opinion=" + acce_organ_opinion
				+ ", acce_fileName=" + acce_fileName + ", acce_fileUrl=" + acce_fileUrl + ", acce_result=" + acce_result
				+ ", payable_money=" + payable_money + ", payment_money=" + payment_money + ", progress=" + progress
				+ ", planning_type=" + planning_type + ", payment_agreement=" + payment_agreement
				+ ", supplementary_Payment=" + supplementary_Payment + ", payment_fileName=" + payment_fileName
				+ ", payment_fileUrl=" + payment_fileUrl + "]";
	}



	
}

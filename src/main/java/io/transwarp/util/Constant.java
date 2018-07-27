package io.transwarp.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Constant {

	// 项目状态汇总 表名
	@Value("${table.xmgl.tn_aftersale}")
	public String XMGL_TN_AFTERSALE;
	
	@Value("${table.xmgl.tn_ywsupport}")
	public String XMGL_TN_YWSUPPORT;
	
	@Value("${table.xmgl.tn_ltsupport}")
	public String XMGL_TN_LTSUPPORT;
	
	@Value("${table.xmgl.tn_yxsupport}")
	public String XMGL_TN_YXSUPPORT;
	
	@Value("${table.xmgl.tn_nbsupport}")
	public String XMGL_TN_NBSUPPORT;
	
	@Value("${table.xmgl.afterSaleColumnList}")
	public String XMGL_AFTERSALECOLUMNLIST;
	
	@Value("${table.xmgl.ywcolumnList}")
	public String XMGL_YWCOLUMNLIST;
	
	@Value("${table.xmgl.ltcolumnList}")
	public String XMGL_LTCOLUMNLIST;
	
	@Value("${table.xmgl.yxcolumnList}")
	public String XMGL_YXCOLUMNLIST;
	
	@Value("${table.xmgl.nbcolumnList}")
	public String XMGL_NBCOLUMNLIST;
	

}


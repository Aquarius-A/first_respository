var 易维会话ID;
var 项目名称;
var 维保版本;
var tdh版本;
var 项目环境;
var 项目状态;
var 客户姓名;
var 客户联系方式;
var 会话级别;
var 问题描述;
var 过程简述;
var 处理人;
var 处理结果;
var 工单创建时间;
var 客服响应时间;
var 工单关闭时间;

var getNowFormatDate = function(fmt) {
	var date = new Date();
	 var o = {   
		        "M+" : date.getMonth()+1,                 // 月份
		        "d+" : date.getDate(),                    // 日
		        "h+" : date.getHours(),                   // 小时
		        "m+" : date.getMinutes(),                 // 分
		        "s+" : date.getSeconds(),                 // 秒
		        "q+" : Math.floor((date.getMonth()+3)/3), // 季度
		        "S"  : date.getMilliseconds()             // 毫秒
		    };   
		    if(/(y+)/.test(fmt)) {  
		            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
		    }  
		     for(var k in o) {  
		        if(new RegExp("("+ k +")").test(fmt)){  
		             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
		         }  
		     }  
		    return fmt;  
};
var ywStartTime= "1845-05-07 14:31";
var ywEndTime= getNowFormatDate('yyyyMMddhhmmss');

Ext.define('app.view.ywsupport.YwSupportController', {
	
	extend : 'Ext.app.ViewController',
	
	alias : 'controller.ywsupport',

	itemclicked : function(view,record,item,index,e){
		易维会话ID = record.data.易维会话ID;
		项目名称 = record.data.项目名称;
		维保版本 = record.data.维保版本;
		tdh版本 = record.data.tdh版本;
		项目环境 = record.data.项目环境;
		项目状态 = record.data.项目状态;
		客户姓名 = record.data.客户姓名;
		客户联系方式 = record.data.客户联系方式;
		会话级别 = record.data.会话级别;
		问题描述 = record.data.问题描述;
		过程简述 = record.data.过程简述;
		处理人 = record.data.处理人;
		处理结果 = record.data.处理结果;
		工单创建时间 = record.data.工单创建时间;
		客服响应时间 = record.data.客服响应时间;
		工单关闭时间 = record.data.工单关闭时间;
	},
	itemdbclicked : function(view,record,item,index,e){
		var showPanel = Ext.create("Ext.form.Panel", {
			renderTo : Ext.getBody(),
			items : [{
                 bodyStyle:"padding-left:60px;padding-top:5px",    
			     items : [{
	            	 xtype : "textarea",
	                 fieldLabel : "问题描述",
	                 name : "describe",
	                 allowBlank : false,
	                 editable : false,
	                 value : 问题描述,
	                 blankText : '不能为空',
	                 width : 800,
	                 height : 250 
	             },{
	            	 xtype : "textarea",
	                 fieldLabel : "过程简述",
	                 name : "sketch",
	                 value : 过程简述,
	                 editable : false,
	                 width : 800,
	                 height : 250 
	             }]
			}]
		});
		var syswin = Ext.create('Ext.window.Window',{
			title : "问题详情",
			// height : 220,
			width : 1000,
			iconCls : "addicon",
			resizable : false,
			collapsible : true,
			closeAction : 'close',
			closable : true,
			y : 20,
			modal : 'true',
			buttonAlign : "center",
			items : [{    
                items : showPanel
			}],
			buttons : [{
				xtype : "button",
				text : "确认",
				listeners : {
					click : function(){
						syswin.close();
					}				
				}
			},' ',' ',' ', ' ',{
				xtype : "button",
				text : "取消",
				listeners : {
					click : function(){
						syswin.close();
					}
				}
			}]
		});
		syswin.show();

},
	ywsearch : function() {
		var grid = this.getView().down('grid');
		var page = Ext.ComponentQuery.query('pagingtoolbar', grid);
		page[0].moveFirst();
		var toolbar = this.getView().down('toolbar');
		var textfields = Ext.ComponentQuery.query('textfield', toolbar);
		if(textfields[0].getValue() == null){
			ywStartTime = "";
		}else{
			ywStartTime = textfields[0].getValue();
		}
		if(textfields[0].getValue() == null){
			ywEndTime = "";
		}else{
			ywEndTime = textfields[1].getValue();
		}
		if(ywStartTime == "" || ywEndTime == "" || ywStartTime > ywEndTime){
			Ext.MessageBox.alert("系统提示","请输入正确的时间范围");
		}else{
			var store = Ext.data.StoreMgr.lookup('ywsupport');
			store.getProxy().url = "getDataListByTime_ywsupport?startTime="+ywStartTime+"&endTime="+ywEndTime;
			store.removeAll();
			store.load();
		}
		Ext.getCmp('ywExcel').show();
	},
	ywrepeat : function() {
		var grid = this.getView().down('grid');
		var page = Ext.ComponentQuery.query('pagingtoolbar', grid);
		page[0].moveFirst();
		var toolbar = this.getView().down('toolbar');
		var textfields = Ext.ComponentQuery.query('textfield', toolbar);
		for(var i = 0; i < textfields.length; i++) {
			textfields[i].setValue("");
		}
		var store = Ext.data.StoreMgr.lookup('ywsupport');
		store.getProxy().url = "getDataList_ywsupport";
		store.load();
		Ext.getCmp('ywExcel').hide();
	},	
	ywadd : function() {
		var createTime = "createTime" + getNowFormatDate('yyyyMMddhhmmss');
		var responseTime = "responseTime" + getNowFormatDate('yyyyMMddhhmmss');
		var closeTime = "closeTime" + getNowFormatDate('yyyyMMddhhmmss');
		var createTimeEl = createTime + "-inputEl";
		var responseTimeEl = responseTime + "-inputEl";
		var closeTimeEl = closeTime + "-inputEl";
		var showform = function() {
			var addPanel = Ext.create("Ext.form.Panel", {
						renderTo : Ext.getBody(),
						items : [{
	                         bodyStyle:"padding-left:60px;padding-top:5px",    
						     items : [{
				            	 xtype : "textfield",
				                 fieldLabel : "项目名称",
				                 name : "projectname",
				                 allowBlank : false,
				                 blankText : '不能为空',
				                 width : 360
				             },{
				            	 xtype : "combobox",
				                 fieldLabel : "维保版本",
				                 displayField : 'supportedition',
				                 name : "supportedition",
				                 allowBlank:false,
				                 blankText:'不能为空',
				                 editable : false,
				                 store : Ext.create('Ext.data.Store',{
				                	 fields : [{name : 'supportedition'}],
				                	 data : [{
				                		 "supportedition" : "标准版"
				                	 },{
				                		 "supportedition" : "高级版"
				                	 }]
				                 }),
				                 width : 360
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "tdh版本",
				                 name : "edition",
				                 allowBlank:false,
				                 blankText:'不能为空',
				                 width : 360
				             },{
				            	 xtype : "combobox",
				                 fieldLabel : "项目环境",
				                 displayField : 'environment',
				                 name : "environment",
				                 allowBlank:false,
				                 blankText:'不能为空',
				                 editable : false,
				                 store : Ext.create('Ext.data.Store',{
				                	 fields : [{name : 'environment'}],
				                	 data : [{
				                		 "environment" : "生产"
				                	 },{
				                		 "environment" : "测试"
				                	 }]
				                 }),
				                 width : 360
				             },{
				            	xtype : "combobox",
				            	fieldLabel : "项目状态",
				            	displayField : 'status',
				            	name : "status",
				            	allowBlank:false,
				            	blankText:'项目状态不能为空',
				            	editable : false,
				            	store : Ext.create('Ext.data.Store',{
				            		fields : [{
				            			name : 'status'
				            		}],
				            		data : [{
				            			"status" : "过保"
				            		},{
				            			"status" : "维保"
				            		},{
				            			"status" : "社区版"
				            		},{
				            			"status" : "POC"
				            		},{
				            			"status" : "实施中"
				            		},{
				            			"status" : "试用"
				            		},{
				            			"status" : "黑名单"
				            		},{
				            			"status" : "白名单"
				            		},]
				            	}),
				            	width : 360
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "客户姓名",
				                 name : "name",
				                 allowBlank:false,
				                 blankText:'不能为空',
				                 width : 360 
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "客户联系方式",
				                 name : "phone",
				                 allowBlank:false,
				                 blankText:'不能为空',
				                 width : 360 
				             },{
				            	 xtype : "combobox",
				                 fieldLabel : "会话级别",
				                 displayField : 'level',
				                 name : "level",
				                 allowBlank:false,
				                 blankText:'不能为空',
				                 editable : false,
				                 store : Ext.create('Ext.data.Store',{
				                	 fields : [{name : 'level'}],
				                	 data : [{
				                		 "level" : "1"
				                	 },{
				                		 "level" : "2"
				                	 },{
				                		 "level" : "3"
				                	 },{
				                		 "level" : "4"
				                	 },{
				                		 "level" : "5"
				                	 }]
				                 }),
				                 width : 360
				             },{
				            	 xtype : "textarea",
				                 fieldLabel : "问题描述",
				                 name : "describe",
				                 allowBlank : false,
				                 blankText : '不能为空',
				                 width : 360 
				             },{
				            	 xtype : "textarea",
				                 fieldLabel : "过程简述",
				                 name : "sketch",
				                 width : 360 
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "处理人",
				                 name : "operator",
				                 allowBlank:false,
				                 blankText:'不能为空',
				                 width : 360 
				             },{
				            	 xtype : "combobox",
				                 fieldLabel : "处理结果",
				                 displayField : 'result',
				                 name : "result",
				                 allowBlank:false,
				                 blankText:'不能为空',
				                 editable : false,
				                 store : Ext.create('Ext.data.Store',{
				                	 fields : [{name : 'result'}],
				                	 data : [{
				                		 "result" : "已完成"
				                	 },{
				                		 "result" : "未完成"
				                	 }]
				                 }),
				                 width : 360
				             },{
				            	 id : createTime,
					     		 name : 'createTime',
					     		 fieldLabel : "工单创建时间",
					     		 allowBlank : false,
					     		 editable : false,
					             blankText : '不能为空',
					             width : 360,
					     	     xtype : 'textfield',
					     		 listeners : {
					     			render: function (p) {
					     				p.getEl().on('click', function () {
					     					WdatePicker({
					     						el: createTimeEl,
					     						lang: 'zh-cn',
					     						dateFmt: 'yyyy-MM-dd HH:mm',
					     						startDate: '%y-%M-%d 00:00'
					     					});
					     				});
					     			 }
					     		 }
				             },{
				            	 id : responseTime,
					     		 name : 'responseTime',
					     		 fieldLabel : "客服响应时间",
					     		 allowBlank : false,
					     		 editable : false,
					             blankText : '不能为空',
					             width : 360,
					     	     xtype : 'textfield',
					     		 listeners : {
					     			render: function (p) {
					     				p.getEl().on('click', function () {
					     					WdatePicker({
					     						el: responseTimeEl,
					     						lang: 'zh-cn',
					     						dateFmt: 'yyyy-MM-dd HH:mm',
					     						startDate: '%y-%M-%d 00:00'
					     					});
					     				});
					     			 }
					     		 }
				             },{
				            	 id : closeTime,
					     		 name : 'closeTime',
					     		 fieldLabel : "客服响应时间",
					     		 allowBlank : false,
					     		 editable : false,
					             blankText : '不能为空',
					             width : 360,
					     	     xtype : 'textfield',
					     		 listeners : {
					     			render: function (p) {
					     				p.getEl().on('click', function () {
					     					WdatePicker({
					     						el: closeTimeEl,
					     						lang: 'zh-cn',
					     						dateFmt: 'yyyy-MM-dd HH:mm',
					     						startDate: '%y-%M-%d 00:00'
					     					});
					     				});
					     			 }
					     		 }
				             }]
						}]
					});
			var syswin = Ext.create('Ext.window.Window',{
					title : "新增界面",
					// height : 220,
					width : 600,
					iconCls : "addicon",
					resizable : false,
					collapsible : true,
					closeAction : 'close',
					closable : true,
					y : 200,
					modal : 'true',
					buttonAlign : "center",
					items : [{    
                        items : addPanel
					}],
					buttons : [{
						xtype : "button",
						text : "保存",
						listeners : {
							click : function(){				
								var form = addPanel.getForm();
								if(form.isValid()){
									var formValues = addPanel.getForm().getValues();
									 var value = {
											   // id : formValues["id"],
											    projectname : formValues["projectname"],
											    supportedition : formValues["supportedition"],
											    edition : formValues["edition"],
											    environment : formValues["environment"],
											    status : formValues["status"],
											    name : formValues["name"],
											    phone : formValues["phone"],
											    level : formValues["level"],
											    describe : formValues["describe"],
											    sketch : formValues["sketch"],
											    operator : formValues["operator"],
											    result : formValues["result"],
											    
											    createTime : formValues["createTime"],
											    responseTime : formValues["responseTime"],
											    closeTime : formValues["closeTime"]
										};
										Ext.Ajax.request({
											url : "addYwSupport",
											params : {data : Ext.encode(value)},
											success : function(data){
											    if(data.responseText == "true"){
										           Ext.MessageBox.alert("状态","新增成功");
													syswin.close();
													var store = Ext.data.StoreMgr.lookup('ywsupport');
												     store.reload();
											     }else{
														Ext.MessageBox.alert("状态","新增失败");
											     }
										    }
									    });
								}else{
									Ext.MessageBox.alert("提示","请输入完整的注册信息");
								}
							}				
						}
					},' ',' ',' ', ' ',{
						xtype : "button",
						text : "退出",
						listeners : {
							click : function(){
								syswin.close();
							}
						}
					}]
				});
				syswin.show();
				
			};
			showform();
	},
	ywedit: function() {
		if(项目名称 == null){
			Ext.MessageBox.alert("系统提示","选择需要修改的记录");
		}else{
			var getNowFormatDate = function(fmt) {
				var date = new Date();
				 var o = {   
					        "M+" : date.getMonth()+1,                 // 月份
					        "d+" : date.getDate(),                    // 日
					        "h+" : date.getHours(),                   // 小时
					        "m+" : date.getMinutes(),                 // 分
					        "s+" : date.getSeconds(),                 // 秒
					        "q+" : Math.floor((date.getMonth()+3)/3), // 季度
					        "S"  : date.getMilliseconds()             // 毫秒
					    };   
					    if(/(y+)/.test(fmt)) {  
					            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
					    }  
					     for(var k in o) {  
					        if(new RegExp("("+ k +")").test(fmt)){  
					             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
					         }  
					     }  
					    return fmt;  
			};
			var createTime = "createTime" + getNowFormatDate('yyyyMMddhhmmss');
			var responseTime = "responseTime" + getNowFormatDate('yyyyMMddhhmmss');
			var closeTime = "closeTime" + getNowFormatDate('yyyyMMddhhmmss');
			var createTimeEl = createTime + "-inputEl";
			var responseTimeEl = responseTime + "-inputEl";
			var closeTimeEl = closeTime + "-inputEl";
			var showform = function() {
				var editPanel = Ext.create("Ext.form.Panel", {
					renderTo : Ext.getBody(),
					items : [{
                         bodyStyle:"padding-left:60px;padding-top:5px",    
					     items : [{
			            	 xtype : "textfield",
			                 fieldLabel : "项目名称",
			                 name : "projectname",
			                 allowBlank : false,
			                 value : 项目名称,
			                 blankText : '不能为空',
			                 width : 360
			             },{
			            	 xtype : "combobox",
			                 fieldLabel : "维保版本",
			                 displayField : 'supportedition',
			                 name : "supportedition",
			                 allowBlank:false,
			                 value : 维保版本,
			                 blankText:'不能为空',
			                 editable : false,
			                 store : Ext.create('Ext.data.Store',{
			                	 fields : [{name : 'supportedition'}],
			                	 data : [{
			                		 "supportedition" : "标准版"
			                	 },{
			                		 "supportedition" : "高级版"
			                	 }]
			                 }),
			                 width : 360
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "tdh版本",
			                 name : "edition",
			                 allowBlank:false,
			                 value : tdh版本,
			                 blankText:'不能为空',
			                 width : 360
			             },{
			            	 xtype : "combobox",
			                 fieldLabel : "项目环境",
			                 displayField : 'environment',
			                 name : "environment",
			                 allowBlank:false,
			                 value : 项目环境,
			                 blankText:'不能为空',
			                 editable : false,
			                 store : Ext.create('Ext.data.Store',{
			                	 fields : [{name : 'environment'}],
			                	 data : [{
			                		 "environment" : "生产"
			                	 },{
			                		 "environment" : "测试"
			                	 }]
			                 }),
			                 width : 360
			             },{
			            	xtype : "combobox",
			            	fieldLabel : "项目状态",
			            	displayField : 'status',
			            	name : "status",
			            	allowBlank:false,
			            	value : 项目状态,
			            	blankText:'项目状态不能为空',
			            	editable : false,
			            	store : Ext.create('Ext.data.Store',{
			            		fields : [{
			            			name : 'status'
			            		}],
			            		data : [{
			            			"status" : "过保"
			            		},{
			            			"status" : "维保"
			            		},{
			            			"status" : "社区版"
			            		},{
			            			"status" : "POC"
			            		},{
			            			"status" : "实施中"
			            		},{
			            			"status" : "试用"
			            		},{
			            			"status" : "黑名单"
			            		},{
			            			"status" : "白名单"
			            		},]
			            	}),
			            	width : 360
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "客户姓名",
			                 name : "name",
			                 allowBlank:false,
			                 value : 客户姓名,
			                 blankText:'不能为空',
			                 width : 360 
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "客户联系方式",
			                 name : "phone",
			                 allowBlank:false,
			                 value : 客户联系方式,
			                 blankText:'不能为空',
			                 width : 360 
			             },{
			            	 xtype : "combobox",
			                 fieldLabel : "会话级别",
			                 displayField : 'level',
			                 name : "level",
			                 allowBlank:false,
			                 blankText:'不能为空',
			                 editable : false,
			                 value : 会话级别,
			                 store : Ext.create('Ext.data.Store',{
			                	 fields : [{name : 'level'}],
			                	 data : [{
			                		 "level" : "1"
			                	 },{
			                		 "level" : "2"
			                	 },{
			                		 "level" : "3"
			                	 },{
			                		 "level" : "4"
			                	 },{
			                		 "level" : "5"
			                	 }]
			                 }),
			                 width : 360
			             },{
			            	 xtype : "textarea",
			                 fieldLabel : "问题描述",
			                 name : "describe",
			                 allowBlank : false,
			                 value : 问题描述,
			                 blankText : '不能为空',
			                 width : 360 
			             },{
			            	 xtype : "textarea",
			                 fieldLabel : "过程简述",
			                 name : "sketch",
			                 value : 过程简述,
			                 width : 360 
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "处理人",
			                 name : "operator",
			                 allowBlank:false,
			                 value : 处理人,
			                 blankText:'不能为空',
			                 width : 360 
			             },{
			            	 xtype : "combobox",
			                 fieldLabel : "处理结果",
			                 displayField : 'result',
			                 name : "result",
			                 allowBlank:false,
			                 value : 处理结果,
			                 blankText:'不能为空',
			                 editable : false,
			                 store : Ext.create('Ext.data.Store',{
			                	 fields : [{name : 'result'}],
			                	 data : [{
			                		 "result" : "已完成"
			                	 },{
			                		 "result" : "未完成"
			                	 }]
			                 }),
			                 width : 360
			             },{
			            	 id : createTime,
				     		 name : 'createTime',
				     		 fieldLabel : "工单创建时间",
				     		 allowBlank : false,
				     		 value : 工单创建时间,
				     		 editable : false,
				             blankText : '不能为空',
				             width : 360,
				     	     xtype : 'textfield',
				     		 listeners : {
				     			render: function (p) {
				     				p.getEl().on('click', function () {
				     					WdatePicker({
				     						el: createTimeEl,
				     						lang: 'zh-cn',
				     						dateFmt: 'yyyy-MM-dd HH:mm',
				     						startDate: '%y-%M-%d 00:00'
				     					});
				     				});
				     			 }
				     		 }
			             },{
			            	 id : responseTime,
				     		 name : 'responseTime',
				     		 fieldLabel : "客服响应时间",
				     		 allowBlank : false,
				     		 value : 客服响应时间,
				     		 editable : false,
				             blankText : '不能为空',
				             width : 360,
				     	     xtype : 'textfield',
				     		 listeners : {
				     			render: function (p) {
				     				p.getEl().on('click', function () {
				     					WdatePicker({
				     						el: responseTimeEl,
				     						lang: 'zh-cn',
				     						dateFmt: 'yyyy-MM-dd HH:mm',
				     						startDate: '%y-%M-%d 00:00'
				     					});
				     				});
				     			 }
				     		 }
			             },{
			            	 id : closeTime,
				     		 name : 'closeTime',
				     		 fieldLabel : "工单关闭时间",
				     		 allowBlank : false,
				     		 value : 工单关闭时间,
				     		 editable : false,
				             blankText : '不能为空',
				             width : 360,
				     	     xtype : 'textfield',
				     		 listeners : {
				     			render: function (p) {
				     				p.getEl().on('click', function () {
				     					WdatePicker({
				     						el: closeTimeEl,
				     						lang: 'zh-cn',
				     						dateFmt: 'yyyy-MM-dd HH:mm',
				     						startDate: '%y-%M-%d 00:00'
				     					});
				     				});
				     			 }
				     		 }
			             }]
					}]
				});
				var syswin = Ext.create('Ext.window.Window',{
					title : "修改界面",
					// height : 220,
					width : 600,
					iconCls : "addicon",
					resizable : false,
					collapsible : true,
					closeAction : 'close',
					closable : true,
					y : 200,
					modal : 'true',
					buttonAlign : "center",
					items : [{    
                        items : editPanel
					}],
					buttons : [{
						xtype : "button",
						text : "确认",
						listeners : {
							click : function(){
									var formValues = editPanel.getForm().getValues();
									 var value = {
											    id : 易维会话ID,
											    projectname : formValues["projectname"],
											    supportedition : formValues["supportedition"],
											    edition : formValues["edition"],
											    environment : formValues["environment"],
											    status : formValues["status"],
											    name : formValues["name"],
											    phone : formValues["phone"],
											    level : formValues["level"],
											    describe : formValues["describe"],
											    sketch : formValues["sketch"],
											    operator : formValues["operator"],
											    result : formValues["result"],
											    
											    createTime : formValues["createTime"],
											    responseTime : formValues["responseTime"],
											    closeTime : formValues["closeTime"]
										};
								Ext.Ajax.request({
									//url : "editUser?username="+name+"&usergroup="+editPanel.getForm().getValues()["usergroup"],
									url : "editYwSupport",
									params : {data : Ext.encode(value)},
									success : function(){
										Ext.MessageBox.alert("状态","修改成功");
										syswin.close();
										var store = Ext.data.StoreMgr.lookup('ywsupport');
								        store.reload();
									}
								});	
							}				
						}
					},' ',' ',' ', ' ',{
						xtype : "button",
						text : "取消",
						listeners : {
							click : function(){
								syswin.close();
							}
						}
					}]
				});
				syswin.show();
		    }
			showform();
		}
	},
	ywdelete : function() {
		if(name == null){
			Ext.MessageBox.alert("系统提示","选择需要删除的记录");
		}else{
			var showform = function() {
				var deletePanel = Ext.create("Ext.form.Panel", {
					renderTo : Ext.getBody(),
					items : [{
                         bodyStyle:"padding-left:60px;padding-top:5px",    
					     items : [{
			            	 xtype : "textfield",
			                 fieldLabel : "项目名称",
			                 name : "projectname",
			                 allowBlank : false,
			                 value : 项目名称,
			                 blankText : '不能为空',
			                 width : 360
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "tdh版本",
			                 name : "edition",
			                 allowBlank:false,
			                 value : tdh版本,
			                 blankText:'不能为空',
			                 width : 360
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "客户姓名",
			                 name : "name",
			                 allowBlank:false,
			                 value : 客户姓名,
			                 blankText:'不能为空',
			                 width : 360 
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "客户联系方式",
			                 name : "phone",
			                 allowBlank:false,
			                 value : 客户联系方式,
			                 blankText:'不能为空',
			                 width : 360 
			             },{
			            	 xtype : "textarea",
			                 fieldLabel : "问题描述",
			                 name : "describe",
			                 allowBlank : false,
			                 value : 问题描述,
			                 blankText : '不能为空',
			                 width : 360 
			             },{
			            	 xtype : "textarea",
			                 fieldLabel : "过程简述",
			                 name : "sketch",
			                 value : 过程简述,
			                 width : 360 
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "处理人",
			                 name : "operator",
			                 allowBlank:false,
			                 value : 处理人,
			                 blankText:'不能为空',
			                 width : 360 
			             }]
					}]
				});
				var syswin = Ext.create('Ext.window.Window',{
						title : "删除界面",
						// height : 220,
						width : 600,
						iconCls : "addicon",
						resizable : false,
						collapsible : true,
						closeAction : 'close',
						closable : true,
						y : 200,
						modal : 'true',
						buttonAlign : "center",
						items : [{    
	                        items : deletePanel
						}],
						buttons : [{
							xtype : "button",
							text : "确认",
							listeners : {
								click : function(){
									Ext.Ajax.request({
										url : "deleteywsupport?易维会话ID="+易维会话ID,
										success : function(){
											Ext.MessageBox.alert("状态","删除成功");
											syswin.close();
											var store = Ext.data.StoreMgr.lookup('ywsupport');
									        store.reload();
										}
									});	
								}				
							}
						},' ',' ',' ', ' ',{
							xtype : "button",
							text : "取消",
							listeners : {
								click : function(){
									syswin.close();
								}
							}
						}]
					});
					syswin.show();
					
				};
				showform();
		}
	},

	exportExcel : function() {
		window.location.href = "exportYwExcel?startTime="+ywStartTime+"&endTime="+ywEndTime;
	}
	
});
/**
 * 
 * 
 */
var 论坛项目id;
var 标题;
var 发帖人;
var 问题描述;
var 处理人;
var 处理结果;
var 发帖时间;
var 首次回帖时间;
var 最后回帖时间;
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
var ltStartTime= "1845-05-07 14:31";
var ltEndTime= getNowFormatDate('yyyyMMddhhmmss');
Ext.define('app.view.ltsupport.LtSupportController', {
	
	extend : 'Ext.app.ViewController',
	
	alias : 'controller.ltsupport',
	
	itemclicked : function(view,record,item,index,e){
		论坛项目id = record.data.论坛项目id;
		标题 = record.data.标题;
		发帖人 = record.data.发帖人;
		问题描述 = record.data.问题描述;
		处理人 = record.data.处理人;
		处理结果 = record.data.处理结果;
		发帖时间 = record.data.发帖时间;
		首次回帖时间 = record.data.首次回帖时间;
		最后回帖时间 = record.data.最后回帖时间;
	},
	itemdbclicked : function(view,record,item,index,e){
		var showPanel = Ext.create("Ext.form.Panel", {
			renderTo : Ext.getBody(),
			items : [{
                 bodyStyle:"padding-left:60px;padding-top:5px",    
			     items : [{
	            	 xtype : "textarea",
	                 fieldLabel : "问题描述",
	                 name : "proDescrible",
	                 allowBlank : false,
	                 editable : false,
	                 value : 问题描述,
	                 blankText : '不能为空',
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
	ltsearch : function() {
		var grid = this.getView().down('grid');
		var page = Ext.ComponentQuery.query('pagingtoolbar', grid);
		page[0].moveFirst();
		var toolbar = this.getView().down('toolbar');
		var textfields = Ext.ComponentQuery.query('textfield', toolbar);
		if(textfields[0].getValue() == null){
			ltStartTime = "";
		}else{
			ltStartTime = textfields[0].getValue();
		}
		if(textfields[0].getValue() == null){
			ltEndTime = "";
		}else{
			ltEndTime = textfields[1].getValue();
		}
		if(ltStartTime == "" || ltEndTime == "" || ltStartTime > ltEndTime){
			Ext.MessageBox.alert("系统提示","请输入正确的时间范围");
		}else{
			var store = Ext.data.StoreMgr.lookup('ltsupport');
			store.getProxy().url = "getDataListByTime_ltsupport?startTime="+ltStartTime+"&endTime="+ltEndTime;
			store.removeAll();
			store.load();
		}
		Ext.getCmp('ltExcel').show();
	},
	
	ltrepeat : function() {
		var grid = this.getView().down('grid');
		var page = Ext.ComponentQuery.query('pagingtoolbar', grid);
		page[0].moveFirst();
		var toolbar = this.getView().down('toolbar');
		var textfields = Ext.ComponentQuery.query('textfield', toolbar);
		for(var i = 0; i < textfields.length; i++) {
			textfields[i].setValue("");
		}
		var store = Ext.data.StoreMgr.lookup('ltsupport');
		store.getProxy().url = "getDataList_ltsupport";
		store.load();
		Ext.getCmp('ltExcel').hide();
	},
	
	ltadd : function() {
		var startTime = "startTime" + getNowFormatDate('yyyyMMddhhmmss');
		var firstResponseTime = "firstResponseTime" + getNowFormatDate('yyyyMMddhhmmss');
		var lastResponseTime = "lastResponseTime" + getNowFormatDate('yyyyMMddhhmmss');
		var startTimeEl = startTime + "-inputEl";
		var firstResponseTimeEl = firstResponseTime + "-inputEl";
		var lastResponseTimeEl = lastResponseTime + "-inputEl";
		var showform = function() {
			var addPanel = Ext.create("Ext.form.Panel", {
						renderTo : Ext.getBody(),
						items : [{
	                         bodyStyle:"padding-left:60px;padding-top:5px",    
						     items : [{
				                 xtype : "textfield",
				                 fieldLabel : "标题",
				                 name : "title",
				                 allowBlank : false,
				                 blankText : '不能为空',
				                 width : 360
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "发帖人",
				                 name : "author",
				                 allowBlank : false,
				                 blankText : '不能为空',
				                 width : 360
				             },{
				            	 xtype : "textarea",
				                 fieldLabel : "问题描述",
				                 name : "proDescrible",
				                 allowBlank : false,
				                 blankText : '不能为空',
				                 width : 360
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "处理人",
				                 name : "operator",
				                 allowBlank : false,
				                 blankText : '不能为空',
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
				     			id : startTime,
				     			name : 'startTime',
				     			fieldLabel : "发帖时间",
				     			allowBlank : false,
				     			editable : false,
				                blankText : '不能为空',
				                width : 360,
				     			xtype : 'textfield',
				     			listeners : {
				     				render: function (p) {
				     					p.getEl().on('click', function () {
				     						WdatePicker({
				     							el: startTimeEl,
				     							lang: 'zh-cn',
				     							dateFmt: 'yyyy-MM-dd HH:mm',
				     							startDate: '%y-%M-%d 00:00'
				     						});
				     					});
				     				}
				     			}
				             },{
				            	 id : firstResponseTime,
					     		 name : 'firstResponseTime',
					     		 fieldLabel : "首次回帖时间",
					     		 allowBlank : false,
					     		 editable : false,
					             blankText : '不能为空',
					             width : 360,
					     		 xtype : 'textfield',
					     		 listeners : {
					     			 render: function (p) {
					     				 p.getEl().on('click', function () {
					     					 WdatePicker({
					     						 el: firstResponseTimeEl,
					     						 lang: 'zh-cn',
					     						 dateFmt: 'yyyy-MM-dd HH:mm',
					     						 startDate: '%y-%M-%d 00:00'
					     					 });
					     				 });
					     			 }
					     		 }
				             },{
				            	 id : lastResponseTime,
					     		 name : 'lastResponseTime',
					     		 fieldLabel : "最后回帖时间",
					     		 allowBlank : false,
					     		 editable : false,
					             blankText : '不能为空',
					             width : 360,
					     		 xtype : 'textfield',
					     		 listeners : {
					     			 render: function (p) {
					     				 p.getEl().on('click', function () {
					     					 WdatePicker({
					     						 el: lastResponseTimeEl,
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
											    title : formValues["title"],
											    author : formValues["author"],
											    proDescrible : formValues["proDescrible"],
											    operator : formValues["operator"],
											    result : formValues["result"],
											    startTime : formValues["startTime"],
											    firstResponseTime : formValues["firstResponseTime"],
											    lastResponseTime : formValues["lastResponseTime"]
										};
										Ext.Ajax.request({
											url : "addLtSupport",
											params : {data : Ext.encode(value)},
											success : function(data){
											    if(data.responseText == "true"){
										           Ext.MessageBox.alert("状态","新增成功");
													syswin.close();
													var store = Ext.data.StoreMgr.lookup('ltsupport');
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
	
	ltedit : function() {
		if(论坛项目id == null){
			Ext.MessageBox.alert("系统提示","选择需要修改的记录");
		}else{
		var getNowFormatDate = function(fmt) {
			var date = new Date();
			 var o = {   
				        "M+" : date.getMonth()+1,                 //月份   
				        "d+" : date.getDate(),                    //日   
				        "h+" : date.getHours(),                   //小时   
				        "m+" : date.getMinutes(),                 //分   
				        "s+" : date.getSeconds(),                 //秒   
				        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
				        "S"  : date.getMilliseconds()             //毫秒   
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
		var startTime = "startTime" + getNowFormatDate('yyyyMMddhhmmss');
		var firstResponseTime = "firstResponseTime" + getNowFormatDate('yyyyMMddhhmmss');
		var lastResponseTime = "lastResponseTime" + getNowFormatDate('yyyyMMddhhmmss');
		var startTimeEl = startTime + "-inputEl";
		var firstResponseTimeEl = firstResponseTime + "-inputEl";
		var lastResponseTimeEl = lastResponseTime + "-inputEl";
		var showform = function() {
			var editPanel = Ext.create("Ext.form.Panel", {
						renderTo : Ext.getBody(),
						items : [{
	                         bodyStyle:"padding-left:60px;padding-top:5px",    
						     items : [{
				                 xtype : "textfield",
				                 fieldLabel : "标题",
				                 name : "title",
				                 allowBlank : false,
				                 value : 标题,
				                 blankText : '不能为空',
				                 width : 360
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "发帖人",
				                 name : "author",
				                 allowBlank : false,
				                 value : 发帖人,
				                 blankText : '不能为空',
				                 width : 360
				             },{
				            	 xtype : "textarea",
				                 fieldLabel : "问题描述",
				                 name : "proDescrible",
				                 allowBlank : false,
				                 value : 问题描述,
				                 blankText : '不能为空',
				                 width : 360
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "处理人",
				                 name : "operator",
				                 allowBlank : false,
				                 value : 处理人,
				                 blankText : '不能为空',
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
				     			id : startTime,
				     			name : 'startTime',
				     			fieldLabel : "发帖时间",
				     			allowBlank : false,
				     			value : 发帖时间,
				     			editable : false,
				                blankText : '不能为空',
				                width : 360,
				     			xtype : 'textfield',
				     			listeners : {
				     				render: function (p) {
				     					p.getEl().on('click', function () {
				     						WdatePicker({
				     							el: startTimeEl,
				     							lang: 'zh-cn',
				     							dateFmt: 'yyyy-MM-dd HH:mm',
				     							startDate: '%y-%M-%d 00:00'
				     						});
				     					});
				     				}
				     			}
				             },{
				            	 id : firstResponseTime,
					     		 name : 'firstResponseTime',
					     		 fieldLabel : "首次回帖时间",
					     		 allowBlank : false,
					     		 value : 首次回帖时间,
					     		 editable : false,
					             blankText : '不能为空',
					             width : 360,
					     		 xtype : 'textfield',
					     		 listeners : {
					     			 render: function (p) {
					     				 p.getEl().on('click', function () {
					     					 WdatePicker({
					     						 el: firstResponseTimeEl,
					     						 lang: 'zh-cn',
					     						 dateFmt: 'yyyy-MM-dd HH:mm',
					     						 startDate: '%y-%M-%d 00:00'
					     					 });
					     				 });
					     			 }
					     		 }
				             },{
				            	 id : lastResponseTime,
					     		 name : 'lastResponseTime',
					     		 fieldLabel : "最后回帖时间",
					     		 allowBlank : false,
					     		 value : 最后回帖时间,
					     		 editable : false,
					             blankText : '不能为空',
					             width : 360,
					     		 xtype : 'textfield',
					     		 listeners : {
					     			 render: function (p) {
					     				 p.getEl().on('click', function () {
					     					 WdatePicker({
					     						 el: lastResponseTimeEl,
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
											 	id : 论坛项目id,
											    title : formValues["title"],
											    author : formValues["author"],
											    proDescrible : formValues["proDescrible"],
											    operator : formValues["operator"],
											    result : formValues["result"],
											    startTime : formValues["startTime"],
											    firstResponseTime : formValues["firstResponseTime"],
											    lastResponseTime : formValues["lastResponseTime"]
										};
										Ext.Ajax.request({
											url : "editLtSupport",
											params : {data : Ext.encode(value)},
											success : function(data){											   
												Ext.MessageBox.alert("状态","修改成功");
												syswin.close();
												var store = Ext.data.StoreMgr.lookup('ltsupport');
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
	
	ltdelete : function() {
		if(论坛项目id == null){
			Ext.MessageBox.alert("系统提示","选择需要删除的记录");
		}else{
			var showform = function() {
				var deletePanel = Ext.create("Ext.form.Panel", {
					renderTo : Ext.getBody(),
					items : [{
                         bodyStyle:"padding-left:60px;padding-top:5px",    
					     items : [{
			            	 xtype : "textfield",
			                 fieldLabel : "标题",
			                 name : "title",
			                 allowBlank : false,
			                 value : 标题,
			                 blankText : '不能为空',
			                 width : 360
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "发帖人",
			                 name : "author",
			                 allowBlank:false,
			                 value : 发帖人,
			                 blankText:'不能为空',
			                 width : 360
			             },{
			            	 xtype : "textarea",
			                 fieldLabel : "问题描述",
			                 name : "proDescrible",
			                 allowBlank : false,
			                 value : 问题描述,
			                 blankText : '不能为空',
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
										url : "deleteltsupport?论坛项目id="+论坛项目id,
										success : function(){
											Ext.MessageBox.alert("状态","删除成功");
											syswin.close();
											var store = Ext.data.StoreMgr.lookup('ltsupport');
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
		
		window.location.href = "exportLtExcel?startTime="+ltStartTime+"&endTime="+ltEndTime;
	}
});
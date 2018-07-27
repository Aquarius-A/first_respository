/**
 * 
 */
var 内部项目id;
var tdh版本;
var 姓名;
var 项目环境;
var 问题描述;
var 过程简述;
var 处理人;
var 处理结果;
var 接入时间;
var 结束时间;
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
var nbStartTime= "1845-05-07 14:31";
var nbEndTime= getNowFormatDate('yyyyMMddhhmmss');
Ext.define('app.view.nbsupport.NbSupportController', {
	
	extend : 'Ext.app.ViewController',
	
	alias : 'controller.nbsupport',
	
	itemclicked : function(view,record,item,index,e){
		内部项目id = record.data.内部项目id;
		tdh版本 = record.data.tdh版本;
		姓名 = record.data.姓名;
		项目环境 = record.data.项目环境;
		问题描述 = record.data.问题描述;
		过程简述 = record.data.过程简述;
		处理人 = record.data.处理人;
		处理结果 = record.data.处理结果;
		接入时间 = record.data.接入时间;
		结束时间 = record.data.结束时间;
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
			y : 30,
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
	nbsearch : function() {
		var grid = this.getView().down('grid');
		var page = Ext.ComponentQuery.query('pagingtoolbar', grid);
		page[0].moveFirst();
		var toolbar = this.getView().down('toolbar');
		var textfields = Ext.ComponentQuery.query('textfield', toolbar);
		if(textfields[0].getValue() == null){
			nbStartTime = "";
		}else{
			nbStartTime = textfields[0].getValue();
		}
		if(textfields[0].getValue() == null){
			nbEndTime = "";
		}else{
			nbEndTime = textfields[1].getValue();
		}
		if(nbStartTime == "" || nbEndTime == "" || nbStartTime > nbEndTime){
			Ext.MessageBox.alert("系统提示","请输入正确的时间范围");
		}else{
			var store = Ext.data.StoreMgr.lookup('nbsupport');
			store.getProxy().url = "getDataListByTime_nbsupport?startTime="+nbStartTime+"&endTime="+nbEndTime;
			store.removeAll();
			store.load();
		}
		Ext.getCmp('nbExcel').show();
	},
	nbrepeat : function() {
		var grid = this.getView().down('grid');
		var page = Ext.ComponentQuery.query('pagingtoolbar', grid);
		page[0].moveFirst();
		var toolbar = this.getView().down('toolbar');
		var textfields = Ext.ComponentQuery.query('textfield', toolbar);
		for(var i = 0; i < textfields.length; i++) {
			textfields[i].setValue("");
		}
		var store = Ext.data.StoreMgr.lookup('nbsupport');
		store.getProxy().url = "getDataList_nbsupport";
		store.load();
		Ext.getCmp('nbExcel').hide();
	},
	
	nbadd : function() {
		var showform = function() {
			var startTime = "startTime" + getNowFormatDate('yyyyMMddhhmmss');
			var endTime = "endTime" + getNowFormatDate('yyyyMMddhhmmss');
			var startTimeEl = startTime + "-inputEl";
			var endTimeEl = endTime + "-inputEl";
			var addPanel = Ext.create("Ext.form.Panel", {
						renderTo : Ext.getBody(),
						items : [{
	                         bodyStyle:"padding-left:60px;padding-top:5px",    
						     items : [{
						    	 xtype : "textfield",
				                 fieldLabel : "tdh版本",
				                 name : "edition",
				                 allowBlank:false,
				                 blankText:'不能为空',
				                 width : 360 
						     },{
						    	 xtype : "textfield",
				                 fieldLabel : "姓名",
				                 name : "name",
				                 allowBlank : false,
				                 blankText : '不能为空',
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
					     		 fieldLabel : "接入时间",
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
				            	 id : endTime,
					     			name : 'endTime',
					     			fieldLabel : "结束时间",
					     			allowBlank : false,
					     			editable : false,
					                blankText : '不能为空',
					                width : 360,
					     			xtype : 'textfield',
					     			listeners : {
					     				render: function (p) {
					     					p.getEl().on('click', function () {
					     						WdatePicker({
					     							el: endTimeEl,
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
											  edition : formValues["edition"],
											  name : formValues["name"],
											  environment : formValues["environment"],			
											  describe : formValues["describe"],
											  sketch : formValues["sketch"],
											  operator : formValues["operator"],
											  result : formValues["result"],
											  startTime : formValues["startTime"],
											  endTime : formValues["endTime"]
										};
										Ext.Ajax.request({
											url : "addNbSupport",
											params : {data : Ext.encode(value)},
											success : function(data){
											    if(data.responseText == "true"){
										           Ext.MessageBox.alert("状态","新增成功");
													syswin.close();
													var store = Ext.data.StoreMgr.lookup('nbsupport');
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

	nbedit : function(){
		if(内部项目id == null){
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
			var endTime = "endTime" + getNowFormatDate('yyyyMMddhhmmss');
			var startTimeEl = startTime + "-inputEl";
			var endTimeEl = endTime + "-inputEl";
			
			var showform = function() {
				var editPanel = Ext.create("Ext.form.Panel", {
							renderTo : Ext.getBody(),
							items : [{
								bodyStyle:"padding-left:60px;padding-top:5px",    
								items : [{
						    	 xtype : "textfield",
				                 fieldLabel : "tdh版本",
				                 name : "edition",
				                 allowBlank:false,
				                 value : tdh版本,
				                 blankText:'不能为空',
				                 width : 360 
						     },{
						    	 xtype : "textfield",
				                 fieldLabel : "姓名",
				                 name : "name",
				                 allowBlank : false,
				                 value : 姓名,
				                 blankText : '不能为空',
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
				                 allowBlank : false,
				                 blankText : '不能为空',
				                 value : 过程简述,
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
					     		 fieldLabel : "接入时间",
					     		 allowBlank : false,
					     		 value : 接入时间,
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
				            	 id : endTime,
					     			name : 'endTime',
					     			fieldLabel : "结束时间",
					     			allowBlank : false,
					     			value : 结束时间,
					     			editable : false,
					                blankText : '不能为空',
					                width : 360,
					     			xtype : 'textfield',
					     			listeners : {
					     				render: function (p) {
					     					p.getEl().on('click', function () {
					     						WdatePicker({
					     							el: endTimeEl,
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
											  id : 内部项目id,
											  edition : formValues["edition"],
											  name : formValues["name"],
											  environment : formValues["environment"],			
											  describe : formValues["describe"],
											  sketch : formValues["sketch"],
											  operator : formValues["operator"],
											  result : formValues["result"],
											  startTime : formValues["startTime"],
											  endTime : formValues["endTime"]
										};
										Ext.Ajax.request({
											url : "editNbSupport",
											params : {data : Ext.encode(value)},
											success : function(data){
											    if(data.responseText == "true"){
										           Ext.MessageBox.alert("状态","修改成功");
													syswin.close();
													var store = Ext.data.StoreMgr.lookup('nbsupport');
												     store.reload();
											     }else{
														Ext.MessageBox.alert("状态","修改失败");
											     }
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
	
	nbdelete : function(){
		if(内部项目id == null){
			Ext.MessageBox.alert("系统提示","选择需要删除的记录");
		}else{
			var showform = function() {
				var deletePanel = Ext.create("Ext.form.Panel", {
					renderTo : Ext.getBody(),
					items : [{
                         bodyStyle:"padding-left:60px;padding-top:5px",    
					     items : [{
			            	 xtype : "textfield",
			                 fieldLabel : "tdh版本",
			                 name : "edition",
			                 allowBlank : false,
			                 value : tdh版本,
			                 blankText : '不能为空',
			                 width : 360
			             },{
			            	 xtype : "textfield",
			                 fieldLabel : "姓名",
			                 name : "name",
			                 allowBlank:false,
			                 value : 姓名,
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
										url : "deletenbsupport?内部项目id="+内部项目id,
										success : function(){
											Ext.MessageBox.alert("状态","删除成功");
											syswin.close();
											var store = Ext.data.StoreMgr.lookup('nbsupport');
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
		
    	window.location.href = "exportNbExcel?startTime="+nbStartTime+"&endTime="+nbEndTime;
	}
});
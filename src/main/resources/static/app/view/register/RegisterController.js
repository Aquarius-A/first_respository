var name;
var password;
var email;
var usergroup;
var level;
Ext.define('app.view.register.RegisterController', {
	
	extend : 'Ext.app.ViewController',
	
	alias : 'controller.register',

	itemclicked : function(view,record,item,index,e){
		name = record.data.username;
		password = record.data.password;
		email = record.data.email;
		usergroup = record.data.usergroup;
		level = record.data.level;
	},
	
	addRegister : function(){
		
		var showform = function() {
			var addPanel = Ext.create("Ext.form.Panel", {
						renderTo : Ext.getBody(),
						items : [{
	                         bodyStyle:"padding-left:60px;padding-top:5px",    
						     items : [{
				                 xtype : "textfield",
				                 fieldLabel : "用户名",
				                 name : "name",
				                 allowBlank : false,
				                 blankText : '不能为空',
				                 width : 360
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "密码",
				                 name : "password",
				                 allowBlank : false,
				                 blankText : '不能为空',
				                 width : 360
				             },{
				            	 xtype : "textfield",
				                 fieldLabel : "邮箱",
				                 name : "email",
				                 allowBlank:false,
				                 blankText:'邮件不能为空',
				                 vtype:'email',
				                 vtypeText:'您输入的邮箱地址不合法',
				                 width : 360
				             },{
				            	xtype : "combobox",
				            	fieldLabel : "用户组",
				            	displayField : 'usergroup',
				            	name : "usergroup",
				            	allowBlank:false,
				            	blankText:'用户组不能为空',
				            	editable : false,
				            	store : Ext.create('Ext.data.Store',{
				            		fields : [{
				            			name : 'usergroup'
				            		}],
				            		data : [{
				            			"usergroup" : "L1"
				            		},{
				            			"usergroup" : "L2"
				            		},{
				            			"usergroup" : "L3"
				            		}]
				            	}),
				            	width : 360
				             },{
				            	 xtype : "combobox",
				                 fieldLabel : "用户等级",
				                 displayField : 'level',
				                 value : "普通用户",
				                 name : "level",
				                 allowBlank:false,
				                 blankText:'用户等级不能为空',
				                 editable : false,
				                 store : Ext.create('Ext.data.Store',{
										fields : [{
											name : 'level'
										}],
										data : [{
											"level" : "管理员"
										},{
											"level" : "普通用户"
										}]
									}),
				                 width : 360
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
											    username : formValues["name"],
											    password : formValues["password"],
											    usergroup : formValues["usergroup"],
											    email : formValues["email"],
											    level : formValues["level"]
											};
											Ext.Ajax.request({
												url : "addUser",
												params : {data : Ext.encode(value)},
												success : function(data){
													if(data.responseText == "true"){
													    Ext.MessageBox.alert("状态","新增成功");
													    syswin.close();
													    var store = Ext.data.StoreMgr.lookup('registerStore');
												        store.reload();
													}else{
														Ext.MessageBox.alert("状态","用户名已存在");
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
	editRegister : function() {
		if(name == null){
			Ext.MessageBox.alert("系统提示","选择需要修改的记录");
		}else{
			var showform = function() {
				var editPanel = Ext.create("Ext.form.Panel",{
					renderTo : Ext.getBody(),
					items : [{
						bodyStyle:"padding-left:60px;padding-top:5px",
						items :[{
							xtype : "textfield",
							fieldLabel : "用户名",
							value : name,
							width : 360,
							readOnly : true
						},{
							xtype : "combobox",
			            	fieldLabel : "用户组",
			            	displayField : 'usergroup',
			            	name : "usergroup",
			            	value : usergroup,
			            	allowBlank:false,
			            	blankText:'用户组不能为空',
			            	store : Ext.create('Ext.data.Store',{
			            		fields : [{
			            			name : 'usergroup'
			            		}],
			            		data : [{
			            			"usergroup" : "L1"
			            		},{
			            			"usergroup" : "L2"
			            		},{
			            			"usergroup" : "L3"
			            		}]
			            	}),
			            	width : 360
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
								Ext.Ajax.request({
									url : "editUser?username="+name+"&usergroup="+editPanel.getForm().getValues()["usergroup"],
									success : function(){
										Ext.MessageBox.alert("状态","修改成功");
										syswin.close();
										var store = Ext.data.StoreMgr.lookup('registerStore');
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
	deleteRegister : function() {
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
					                 fieldLabel : "用户名",
					                 value : name,
					                 width : 360,
					                 readOnly : true
					             },{
					            	 xtype : "textfield",
					                 fieldLabel : "邮箱",
					                 value : email,
					                 width : 360,
					                 readOnly : true
					             },{
					            	xtype : "textfield",
					            	fieldLabel : "用户组",
					            	value : usergroup,
					            	width : 360,
					            	readOnly : true
					             },{
					            	 xtype : "textfield",
					                 fieldLabel : "用户等级",
					                 value : level,				   
					                 width : 360,
					                 readOnly : true
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
										url : "deleteUser?username="+name,
										success : function(){
											Ext.MessageBox.alert("状态","删除成功");
											syswin.close();
											var store = Ext.data.StoreMgr.lookup('registerStore');
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
	}
});

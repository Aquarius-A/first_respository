/**
 * This class is the main view for the application. It is specified in app.js as
 * the "autoCreateViewport" property. That setting automatically applies the
 * "viewport" plugin to promote that instance of this class to the body element.
 * 
 * TODO - Replace this content of this view to suite the needs of your
 * application.
 */
var username;
Ext.define('app.view.main.MainController',
		{
			extend : 'Ext.app.ViewController',

			requires : [ 'Ext.window.MessageBox' ],

			uses : [ 'app.view.aftersale.AfterSaleMain',
					'app.view.register.RegisterMain',
					'app.view.ywsupport.YwSupportMain',
					'app.view.ltsupport.LtSupportMain',
					'app.view.yxsupport.YxSupportMain',
					'app.view.nbsupport.NbSupportMain',
					'app.ux.MultiFile'],

			alias : 'controller.main',
			
			constructor : function(){
			    	
			    	Ext.Ajax.request({
			    		url : 'getUser',
			    		async : false,
			    		success : function(response){
			    			username = response.responseText;
			    		}
			    	});
			    	this.callParent();
			},
		    
			loginOut : function() {

				Ext.Ajax.request({
					url : 'loginOut',
					async : false,
					success : function() {
						window.location.href = "login.html";
					}
				});
			},

			hiddenTopBottom : function() {
				this.getView().down('maintop').hide();
				this.getView().down('mainbottom').hide();

				if (!this.showButton) {
					this.showButton = Ext.widget('component', {
						glyph : 0xf013,
						view : this.getView(),
						floating : true,
						x : document.body.clientWidth - 32,
						y : 0,
						height : 10,
						width : 16,
						style : 'background-color:#cde6cf',
						listeners : {
							el : {
								click : function(e1) {
									var c = Ext.getCmp(e1.target.id);

									c.view.down('maintop').show();
									c.view.down('mainbottom').show();
									c.hide();
								}
							}
						}
					})
				}
				;
				this.showButton.show();
			},

			// 窗口大小改变，调整控件的位置
			onMainResize : function() {
				if (this.showButton && !this.showButton.hidden) {
					this.showButton.setX(document.body.clientWidth - 32);
				}
			},

			aftersaleClick : function() {
			
				var maincenter = this.getView().down('maincenter');

				if (Ext.getCmp('aftersalepanel')) {
					maincenter.setActiveTab('aftersalepanel');
				} else {
					maincenter.setActiveTab(maincenter.add({
						xtype : 'aftersalepanel',

						closable : true,
						reorderable : true
					}));
				}

			},
			
			ywSupportClick : function() {
				var maincenter = this.getView().down('maincenter');
				
				if(Ext.getCmp('ywsupportpanel')){
					maincenter.setActiveTab('ywsupportpanel');
				} else {
					maincenter.setActiveTab(maincenter.add({
						xtype : 'ywsupportpanel',
						
						closable : true,
						reorderable : true
					}));
				}
			},
			
			ltSupportClick : function() {
				var maincenter = this.getView().down('maincenter');

				if(Ext.getCmp('ltsupportpanel')){
					maincenter.setActiveTab('ltsupportpanel');
				} else {
					maincenter.setActiveTab(maincenter.add({
						xtype : 'ltsupportpanel',
						
						closable : true,
						reorderable : true
					}));
				}
			},
			
			yxSupportClick : function() {
				var maincenter = this.getView().down('maincenter');

				if(Ext.getCmp('yxsupportpanel')){
					maincenter.setActiveTab('yxsupportpanel');
				} else {
					maincenter.setActiveTab(maincenter.add({
						xtype : 'yxsupportpanel',
						
						closable : true,
						reorderable : true
					}));
				}
			},
			
			nbSupportClick : function() {
				var maincenter = this.getView().down('maincenter');

				if(Ext.getCmp('nbsupportpanel')){
					maincenter.setActiveTab('nbsupportpanel');
				} else {
					maincenter.setActiveTab(maincenter.add({
						xtype : 'nbsupportpanel',
						
						closable : true,
						reorderable : true
					}));
				}
			},

			registerClick : function() {
				
				var maincenter = this.getView().down('maincenter');

				if (Ext.getCmp('registerpanel')) {
					maincenter.setActiveTab('registerpanel');
				} else {
					maincenter.setActiveTab(maincenter.add({
						xtype : 'registerpanel',

						closable : true,
						reorderable : true
					}));
				}
			},
			
			aiopsClick : function() {
				window.open("http://172.16.140.229:8008/");
			},
			
			//文件上传
			updateExcel : function() {
				var maincenter = this.getView().down('maincenter');
				var pathList = new Array();
				var addPanel = new Ext.create("Ext.form.Panel", {
					renderTo : Ext.getBody(),
					bodyStyle:"padding-left:60px;padding-top:5px",
					items : [{
						xtype : 'multifilefield',
						name : 'files',
						width : 360,
						emptyText : '选择上传目录'
						
					}]
				});
				var showform = function() {
					var syswin = Ext.create('Ext.window.Window',{
							title : " !请确保excel的名称以 易维/内部/邮箱/论坛状态汇总 命名",
							width : 480,
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
								text : "新增",
								listeners : {
									click : function(){
					    				addPanel.add({
					    					xtype : 'multifilefield',
											name : 'files',
											width : 360,
											emptyText : '选择上传目录'
					    				});
					    				addPanel.doLayout();
									}
								}
							
							},' ',' ',' ',' ',{
								xtype : "button",
								text : "确认",
								//listeners : {
									handler : function(){
										var form = addPanel.getForm();
										form.submit({
											url: 'uploadFolder',
						                    waitMsg: '正在保存...',
						                    success: function(response){
						                    	syswin.close();	
						                    	Ext.MessageBox.alert("状态","文件上传成功");				                    				               
						                    	maincenter.removeAll();
						                    },
						                    failure: function(response)
						                    {
						                    	return;
						                    }
										});			
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
});

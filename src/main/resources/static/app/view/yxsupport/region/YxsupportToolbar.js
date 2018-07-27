Ext.define('app.view.ywsupport.region.YxSupportToolbar',{
	
	extend : 'Ext.toolbar.Toolbar',
	
	alias : 'widget.yxsupporttoolbar',
	requires : ['Ext.MessageBox','Ext.window.Toast'],
	uses : ['app.ux.ButtonTransparent'],
	style : 'background-color : #e5e5e5',
	
	defaults : {
		xtype : 'buttontransparent' 
	},
	
	constructor : function() {
		var startEl = "yxstartTime" + "-inputEl";
		var endEl = "yxendTime" + "-inputEl";
		this.items = [{
			id : "yxstartTime",  
			width : 200,
			labelWidth : 60, 
		    fieldLabel: "时间范围",  
		    xtype: 'textfield',   
		    listeners: {  
		        render: function (p) {  
		            p.getEl().on('click', function () {  
		                WdatePicker({  
		                    el: startEl,  
		                    lang: 'zh-cn',  
		                    dateFmt: 'yyyy-MM-dd HH:mm',  
		                    startDate:'%y-%M-%d 00:00'  
		                });  
		            });  
		        }  
		    }  
		},'--',{
			id : "yxendTime",
			width : 140,
			xtype : 'textfield',
			listeners : {
				render: function (p) {
					p.getEl().on('click', function () {
						WdatePicker({
							el: endEl,
							lang: 'zh-cn',
							dateFmt: 'yyyy-MM-dd HH:mm',
							startDate: '%y-%M-%d 00:00'
						});
					});
				}
			}
		},' ',{
			text : '查询',
			glyph : 0xf002,
			listeners : {
				click : 'yxsearch'
			}
		},' ',{
			text : '刷新',
			glyph : 0xf01e,
			listeners : {
				click : 'yxrepeat'
			}
		},' ',' ',' ',' ',' ',' ',' ',' ',{
			text : '添加',
			glyph : 0xf067,
			listeners : {
				click : 'yxadd'
			}
		},{
			text : '修改',
			glyph : 0xf044,
			listeners : {
				click : 'yxedit'
			}
		},{
			text : '删除',
			glyph : 0xf014,
			listeners : {
				click : 'yxdelete'
			}
		},{
			text : '导出',
			glyph : 0xf063,
			id : "yxExcel",
			listeners : {
				click : 'exportExcel'
			}
		}];
		
		this.callParent();
	}
});
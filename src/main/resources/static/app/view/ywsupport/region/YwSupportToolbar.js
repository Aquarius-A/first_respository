Ext.define('app.view.ywsupport.region.YwSupportToolbar',{
	
	extend : 'Ext.toolbar.Toolbar',
	
	alias : 'widget.ywsupporttoolbar',
	requires : ['Ext.MessageBox','Ext.window.Toast'],
	uses : ['app.ux.ButtonTransparent'],
	style : 'background-color : #e5e5e5',
	
	defaults : {
		xtype : 'buttontransparent' 
	},
	
	constructor : function() {
		var startEl = "ywstartTime" + "-inputEl";
		var endEl = "ywendTime" + "-inputEl";
		this.items = [{
			id : "ywstartTime",  
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
			id : "ywendTime",
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
				click : 'ywsearch'
			}
		},' ',{
			text : '刷新',
			glyph : 0xf01e,
			listeners : {
				click : 'ywrepeat'
			}
		},' ',' ',' ',' ',' ',' ',' ',' ',{
			text : '添加',
			glyph : 0xf067,
			hidden : false,
			listeners : {
				click : 'ywadd'
			}
		},{
			text : '修改',
			glyph : 0xf044,
			hidden : false,
			listeners : {
				click : 'ywedit'
			}
		},{
			text : '删除',
			glyph : 0xf014,
			hidden : false,
			listeners : {
				click : 'ywdelete'
			}
		},{
			text : '导出',
			glyph : 0xf063,
			id : "ywExcel",
			hidden : false,
			listeners : {
				click : 'exportExcel'
			}
		}];
		if(window.usergroup =="L1"){
			var test = this.items;
			 test[15].hidden=true;  //获得属性值
			 test[16].hidden=true;  //获得属性值
			  test[17].hidden=true;  //获得属性值
			  test[18].hidden=true;  //获得属性值
			  test[19].hidden=true;  //获得属性值
    	};
		this.callParent();
	}
});
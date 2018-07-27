/**
 * 
 */
Ext.define('app.view.model.ToolbarModel',{
	
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.toolbarmodel',
	requires : ['Ext.MessageBox','Ext.window.Toast'],
	uses : ['app.ux.ButtonTransparent'],
	style : 'background-color : #e5e5e5',
	
	defaults : {
		xtype : 'buttontransparent' 
	},
	
	constructor : function(startTime, endTime, excel) {
		var startEl = startTime + "-inputEl";
		var endEl = endTime + "-inputEl";
		this.items = [{
			id: startTime,  
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
			id: endTime,
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
			text : 'search',
			glyph : 0xf002,
			listeners : {
				click : 'search'
			}
		},' ',{
			text : 'reset',
			glyph : 0xf01e,
			listeners : {
				click : 'repeat'
			}
		},' ',' ',' ',' ',' ',' ',' ',' ',{
			text : 'add',
			glyph : 0xf067,
			listeners : {
				click : 'addInfo'
			}
		},{
			text : 'excel',
			glyph : 0xf093,
			id : excel,
			hidden : true,
			listeners : {
				click : 'exportExcel'
			}
		}];
		
		this.callParent();
	}
});
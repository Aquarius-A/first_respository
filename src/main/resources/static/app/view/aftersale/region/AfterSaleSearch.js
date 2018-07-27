Ext.define('app.view.aftersale.region.AfterSaleSearch', {
	
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.aftersalesearch',
	
	requires : ['Ext.MessageBox', 'Ext.window.Toast'],
	uses : ['app.ux.ButtonTransparent'],
	
	style : 'background-color : #e5e5e5',
	
	defaults : {
		xtype : 'buttontransparent'
	},
	
	items : [{
			xtype : 'textfield',
			fieldLabel : 'OA项目名称',
			width : 200,
			labelWidth : 80
		},{
			xtype : 'textfield',
			fieldLabel : '负责人',
			width : 200,
			labelWidth : 60,
		},{
			xtype : 'textfield',
			fieldLabel : '项目状态',
			width : 200,
			labelWidth : 60
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
		}]
		
});
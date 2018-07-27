Ext.define('app.view.register.region.RegisterToolbar',{
	
	extend : 'Ext.toolbar.Toolbar',
	
	alias : 'widget.registertoolbar',
	
	uses : ['app.ux.ButtonTransparent'],

	defaults : {
		xtype : 'buttontransparent'
	},
	
	style : 'background-color : #e5e5e5',
	
	initComponent : function(){
		
		this.items = [{
			text : '新增',
			glyph : 0xf067,
			listeners : {
				click : 'addRegister'
			}
		},' ',{
			text : '修改',
			glyph : 0xf044,
			listeners : {
				click : 'editRegister'
			}
		},' ',{
			text : '删除',
			glyph : 0xf014,
			listeners : {
				click : 'deleteRegister'
			}
			
		}];
		this.callParent();
	}
	
	
});

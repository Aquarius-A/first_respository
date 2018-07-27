/**
 * 
 */
Ext.define('app.view.ywsupport.YwSupportMain',{
	
	extend : 'Ext.panel.Panel',
	
	alias : 'widget.ywsupportpanel',
	
	id : 'ywsupportpanel',
	
	requires : ['app.view.ywsupport.YwSupportModel',
		        'app.view.ywsupport.YwSupportController'],
		        
	uses : ['app.view.ywsupport.region.YwSupportGrid',
		'app.view.ywsupport.region.YwSupportToolbar'],
		        
	controller : 'ywsupport',
    
    viewModel : {
    	type : 'ywsupport'
    },
    bind : {
    	title : '易维支持管理'
    },
    layout : {
    	type : 'vbox',
    	align : 'stretch'
    },
    initComponent : function() {
    	this.items = [{
    		xtype : 'ywsupporttoolbar',
    		region : 'north'
    	},{
    		xtype : 'ywsupportgrid',
    		region : 'center'
    	}]
    	this.callParent();
    }
		        
});
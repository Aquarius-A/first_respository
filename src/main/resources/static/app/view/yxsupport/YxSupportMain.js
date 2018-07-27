/**
 * 
 */
Ext.define('app.view.yxsupport.YxSupportMain',{
	
	extend : 'Ext.panel.Panel',
	
	alias : 'widget.yxsupportpanel',
	
	id : 'yxsupportpanel',
	
	requires : ['app.view.yxsupport.YxSupportController'],
	
	uses : ['app.view.yxsupport.region.YxSupportGrid',
		'app.view.yxsupport.region.YxSupportToolbar'],
		        
    controller : 'yxsupport',
  
    bind : {
    	title : '邮箱支持管理'
    },
    layout : {
    	type : 'vbox',
    	align : 'stretch'
    },
    initComponent : function() {
    	this.items = [{
    		xtype : 'yxsupporttoolbar',
    		region : 'north'
    	},{
    		xtype : 'yxsupportgrid',
    		region : 'center'
    	}]
    	this.callParent();
    }
});
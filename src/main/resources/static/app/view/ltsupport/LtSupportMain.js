/**
 * 
 */
Ext.define('app.view.ltsupport.LtSupportMain',{
	
	extend : 'Ext.panel.Panel',
	
	alias : 'widget.ltsupportpanel',
	
	id : 'ltsupportpanel',
	
	requires : ['app.view.ltsupport.LtSupportController'],
	
	uses : ['app.view.ltsupport.region.LtSupportGrid',
		'app.view.ltsupport.region.LtSupportToolbar'],	
			        
    controller : 'ltsupport',
  
    bind : {
    	title : '论坛支持管理'
    },
    layout : {
    	type : 'vbox',
    	align : 'stretch'
    },
    initComponent : function() {
    	this.items = [{
    		xtype : 'ltsupporttoolbar',
    		region : 'north'
    	},{
    		xtype : 'ltsupportgrid',
    		region : 'center'
    	}]
    	this.callParent();
    }
});
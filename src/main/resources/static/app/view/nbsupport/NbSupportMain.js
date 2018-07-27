/**
 * 
 */
Ext.define('app.view.nbsupport.NbSupportMain',{
	
	extend : 'Ext.panel.Panel',
	
	alias : 'widget.nbsupportpanel',
	
	id : 'nbsupportpanel',
	
	requires : ['app.view.nbsupport.NbSupportController'],
	
	uses : ['app.view.nbsupport.region.NbSupportGrid',
		'app.view.nbsupport.region.NbSupportToolbar'],
		        
    controller : 'nbsupport',
  
    bind : {
    	title : '内部支持管理'
    },
    layout : {
    	type : 'vbox',
    	align : 'stretch',
    },
    initComponent : function() {
    	this.items = [{
    		xtype : 'nbsupporttoolbar',
    		region : 'north'
    	},{
    		xtype : 'nbsupportgrid',
    		region : 'center'
    	}]
    	this.callParent();
    }
});
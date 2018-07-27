Ext.define('app.view.aftersale.AfterSaleMain', {
	
	extend : 'Ext.panel.Panel',
	
	alias : 'widget.aftersalepanel',
	
	id : 'aftersalepanel',
	
	requires : ['app.view.aftersale.AfterSaleModel',
		        'app.view.aftersale.AfterSaleController'],
		     
    uses : ['app.view.aftersale.region.AfterSaleGrid','app.view.aftersale.region.AfterSaleSearch'],
		        
    controller : 'aftersale',
    
    viewModel : {
    	type : 'aftersale'
    },
    
    bind : {
    	title : '项目信息查询'
    },
    
    layout : {
    	type : 'vbox',
    	align : 'stretch'
    },
     
    initComponent : function() {
    	var grid = Ext.create("app.view.model.GridModel","getColumnHeader_aftersale","aftersale","getDataList_aftersale");
    	this.items = [{
    		xtype : 'aftersalesearch',
    		region : 'north'
    	},{
    		xtype : grid,
    		region : 'center'
    	}]
    	this.callParent();
    }
		        
});
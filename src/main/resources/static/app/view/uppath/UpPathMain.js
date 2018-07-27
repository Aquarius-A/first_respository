Ext.define('app.view.uppath.UpPathMain', {
    
	extend : 'Ext.panel.Panel',
	
	alias : 'widget.uppathpanel',
	
	id : 'uppathpanel',
	
	requires : ['app.view.uppath.UpPathModel',
		        'app.view.uppath.UpPathController'],
		     
    uses : ['app.view.uppath.region.UpPathForm'],
		        
    controller : 'uppath',
    
    viewModel : {
    	type : 'uppath'
    },
    
    bind : {
    	title : '文件路径上传'
    },
    
    layout : 'border',
    
    initComponent : function() {
    	this.items = [{
    		xtype : 'uppathformpanel',
    		region : 'center'
    	}]
    	this.callParent();
    }
});
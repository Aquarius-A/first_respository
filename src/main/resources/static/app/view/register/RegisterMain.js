Ext.define('app.view.register.RegisterMain', {
	
	extend : 'Ext.panel.Panel',
	
	alias : 'widget.registerpanel',
	
	id : 'registerpanel',
	
	requires : ['app.view.register.RegisterModel',
		        'app.view.register.RegisterController'],
		     
    uses : ['app.view.register.region.RegisterGrid'],
		        
    controller : 'register',
    
    viewModel : {
    	type : 'register'
    },
    
    bind : {
    	title : '用户管理'
    },
    layout : {
    	type : 'border',
    	align : 'stretch'
    },
    initComponent : function() {
    	
    	this.items = [{
    		xtype : 'registergrid',
    		region : 'center'
    	}]
    	this.callParent();
    }
		        
});
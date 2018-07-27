/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('app.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    
    constructor : function(){
    	var me = this;
    	this.callParent();
    	Ext.Ajax.request({
    		url : 'getTables',
    		async : false,
    		success : function(response){
    			var text = response.responseText;
    			var applicationInfo = Ext.decode(text, true);
    			Ext.apply(me.data.systemMenu, applicationInfo);
    		}
    	});
    	
    },
    
    data: {
        name: 'app',
        system : {
        	name : 'EZSupport',
        	version : '',
        	iconUrl : ''
        },
        
        systemMenu : []

    }
});
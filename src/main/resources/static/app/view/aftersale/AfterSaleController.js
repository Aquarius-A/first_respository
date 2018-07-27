Ext.define('app.view.aftersale.AfterSaleController', {
	
	extend : 'Ext.app.ViewController',
	
	alias : 'controller.aftersale',
	
	search : function() {
		var grid = this.getView().down('gridmodel');
		var page = Ext.ComponentQuery.query('pagingtoolbar', grid);
		page[0].moveFirst();
		var toolbar = this.getView().down('aftersalesearch');
		var textfields = Ext.ComponentQuery.query('textfield', toolbar);
		var name;
		var charge;
		var status;
		if(textfields[0].getValue() == null){
			name = "";
		}else{
			name = textfields[0].getValue();
		}
		if(textfields[1].getValue() == null){
			charge = "";
		}else{
			charge = textfields[1].getValue();
		}
		if(textfields[2].getValue() == null){
			status = "";
		}else{
			status = textfields[2].getValue();
		}
		if(name == ""&&charge == ""&&status == ""){
			Ext.MessageBox.alert("系统提示","请输入查询条件");
		}else{		
		    var store = Ext.data.StoreMgr.lookup('aftersale');
		    store.getProxy().url = "getDataListByParam?param1="+name+"&param2="+charge+"&param3="+status;
		    store.removeAll();
		    store.load();
		}
	},
	repeat : function() {
		var grid = this.getView().down('gridmodel');
		var page = Ext.ComponentQuery.query('pagingtoolbar', grid);
		page[0].moveFirst();
		var toolbar = this.getView().down('aftersalesearch');
		var textfields = Ext.ComponentQuery.query('textfield', toolbar);
		for (var i = 0; i < textfields.length; i++) {
			textfields[i].setValue("");
		}
		var store = Ext.data.StoreMgr.lookup('aftersale');
	    store.getProxy().url = "getDataList_aftersale";
	    store.load();
	}
});
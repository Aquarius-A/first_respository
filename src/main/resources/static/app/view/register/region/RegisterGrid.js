
Ext.define('app.view.register.region.RegisterGrid', {

	extend : 'Ext.grid.Panel',

	alias : 'widget.registergrid',

	uses : [ 'app.view.register.region.RegisterToolbar' ],

	renderTo : Ext.getBody(),

	frame : true,
	layout : 'form',
	height : 152,
	columnLines : true,
	
	initComponent : function() {
		this.store = Ext.create('Ext.data.Store',{
			storeId : 'registerStore',
			autoLoad : {start : 0 ,limit : 10},
			fields : ['username','password','email','usergroup'],
			pageSize : 10,
			proxy : {
				type : 'ajax',
				url : "getUserList",
				reader : {
					rootProperty : 'data',
					totalPorperty : 'total'
				}
			}
		});
		this.columns = [ {
			text : "序号",
			xtype : "rownumberer",
			width : 60,
			sortabele : false,
		}, {
			text : "用户名",
			dataIndex : 'username',
			width : 120,
			sortable : false
		}, {
			text : "密码",
			dataIndex : 'password',
			width : 120,
			sortable : false
		}, {
			text : "邮箱",
			dataIndex : 'email',
			width : 120,
			sortable : false
		}, {
			text : "用户组",
			dataIndex : 'usergroup',
			flex : 1,
			sortable : false
		}];
		this.dockedItems = [{
			xtype : 'registertoolbar',
			dock : 'top',
			grid : this
		},{
	        xtype: 'pagingtoolbar',
	        dock: 'bottom',
	        displayInfo: true,
	        displayMsg : '显示{0}-{1}条，共{2}条',　
	        emptyMsg : '没有记录',　
	        items: ['-', '每页', {
	            xtype: 'combobox',
	            displayField: 'id',  　　 
	            valueField: 'value',　　　 　
	            editable: false,　　　　  　　
	            allowBlank: false,　　 　 
	            triggerAction: 'all',      
	            width: 60,
	            listeners: {
	                render: function (comboBox) {
	                    comboBox.setValue(comboBox.ownerCt.getStore().getPageSize());   // 使得下拉菜单的默认值是初始值
	                },
	                select: function (comboBox) {
	                    var pSize = comboBox.getValue();
	                    comboBox.ownerCt.getStore().pageSize = parseInt(pSize); // 改变PagingToolbar的pageSize
																				// 值
	                    comboBox.ownerCt.getStore().load({start: 0, limit: parseInt(pSize)});
	                }
	            },
	            queryMode: 'local',
	            store: {
	                fields: ['id', 'value'],
	                data: [['20', 20], ['30', 30], ['40', 40], ['50', 50]]
	            }
	        }, '条'],
	        store: this.store　　
	       }];
		this.listeners = {
			itemclick : 'itemclicked'
		},
	    this.callParent();
	 },
	

	
});
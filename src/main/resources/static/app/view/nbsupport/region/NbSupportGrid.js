Ext.define('app.view.ywsupport.region.NbSupportGrid', {

	extend : 'Ext.grid.Panel',

	alias : 'widget.nbsupportgrid',

	uses : [ 'app.view.register.region.RegisterToolbar' ],
	renderTo : Ext.getBody(),
	frame : true,
	autoScroll : true,
	layout : 'form',
	height : 152,
	columnLines : true,
	flex : 1,
	initComponent : function() {
		this.store = Ext.create('Ext.data.Store',{
			storeId : 'nbsupport',
			autoLoad : {start : 0 ,limit : 20},
			fields :  ['内部项目id','tdh版本','姓名','项目环境','问题描述','过程简述','处理人','处理结果','接入时间','结束时间'],
			pageSize : 20,
			proxy : {
				type : 'ajax',
				url : "getDataList_nbsupport",
				reader : {
					type : 'json',
					rootProperty : 'data',
					totalPorperty : 'total'
				}
			}
		});
		this.columns = [
	    	{
			text : "内部项目id",
			dataIndex : '内部项目id',
			width : 60,
			sortabele : false
		}, {
			text : "tdh版本",
			dataIndex : 'tdh版本',
			width : 60,
			sortable : false
		}, {
			text : "姓名",
			dataIndex : '姓名',
			width : 60,
			sortable : false
		}, {
			text : "项目环境",
			dataIndex : '项目环境',
			width : 60,
			sortable : false
		}, {
			text : "问题描述",
			dataIndex : '问题描述',
			width : 60,
			sortable : false,
			flex : 1,
		}, {
			text : "过程简述",
			dataIndex : '过程简述',
			width : 60,
			sortable : false,
			flex : 1,
		}, {
			text : "处理人",
			dataIndex : '处理人',
			width : 60,
			sortable : false
		}, {
			text : "处理结果",
			dataIndex : '处理结果',
			width : 60,
			sortable : false
		}, {
			text : "接入时间",
			dataIndex : '接入时间',
			width : 60,
			sortable : false,
			flex : 1,
		},{
			text : "结束时间",
			dataIndex : '结束时间',
			width : 60,
			sortable : false,
			flex : 1,
		}];
		this.dockedItems = [{
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
			itemclick : 'itemclicked',
			itemdblclick : 'itemdbclicked'
		},
	    this.callParent();
	 },
});
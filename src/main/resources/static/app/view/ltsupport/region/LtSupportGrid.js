Ext.define('app.view.ywsupport.region.LtSupportGrid', {

	extend : 'Ext.grid.Panel',

	alias : 'widget.ltsupportgrid',

	uses : [ 'app.view.register.region.RegisterToolbar' ],

	renderTo : Ext.getBody(),

	frame : true,
	layout : 'form',
	height : 152,
	columnLines : true,
	autoScroll : true,
	flex : 1,
	initComponent : function() {
		this.store = Ext.create('Ext.data.Store',{
			storeId : 'ltsupport',
			autoLoad : {start : 0 ,limit : 20},
			fields :  ['论坛项目id','标题','发帖人','问题描述','处理人','处理结果','发帖时间','首次回帖时间','最后回帖时间'],
			pageSize : 20,
			proxy : {
				type : 'ajax',
				url : "getDataList_ltsupport",
				reader : {
					type : 'json',
					rootProperty : 'data',
					totalPorperty : 'total'
				}
			}
		});
		this.columns = [{
			text : "论坛项目id",
			dataIndex : '论坛项目id',
			width : 60,
			sortabele : false,
		}, {
			text : "标题",
			dataIndex : '标题',
			width : 60,
			sortable : false
		}, {
			text : "发帖人",
			dataIndex : '发帖人',
			width : 60,
			sortable : false
		}, {
			text : "问题描述",
			dataIndex : '问题描述',
			width : 60,
			sortable : false,
			flex : 1
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
			text : "发帖时间",
			dataIndex : '发帖时间',
			width : 60,
			sortable : false,
			flex : 1
		}, {
			text : "首次回帖时间",
			dataIndex : '首次回帖时间',
			width : 60,
			sortable : false,
			flex : 1
		}, {
			text : "最后回帖时间",
			dataIndex : '最后回帖时间',
			width : 60,
			sortable : false,
			flex : 1
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
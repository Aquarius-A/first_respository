Ext.define('app.view.ywsupport.region.YwSupportGrid', {

	extend : 'Ext.grid.Panel',

	alias : 'widget.ywsupportgrid',

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
			storeId : 'ywsupport',
			autoLoad : {start : 0 ,limit : 20},
			fields :  ['易维会话ID','项目名称','维保版本','tdh版本','项目环境','项目状态','客户姓名',
				'客户联系方式','会话级别','问题描述','过程简述','处理人',
				'处理结果','工单创建时间','客服响应时间','工单关闭时间'],
			pageSize : 20,
			proxy : {
				type : 'ajax',
				url : "getDataList_ywsupport",
				reader : {
					type : 'json',
					rootProperty : 'data',
					totalPorperty : 'total'
				}
			}
		});
		this.columns = [ {
			text : "易维会话ID",
			dataIndex : '易维会话ID',
			width : 60,
			sortabele : false
		}, {
			text : "项目名称",
			dataIndex : '项目名称',
			width : 60,
			sortable : false
		}, {
			text : "维保版本",
			dataIndex : '维保版本',
			width : 60,
			sortable : false
		}, {
			text : "tdh版本",
			dataIndex : 'tdh版本',
			width : 60,
			sortable : false
		}, {
			text : "项目环境",
			dataIndex : '项目环境',
			width : 60,
			sortable : false
		}, {
			text : "项目状态",
			dataIndex : '项目状态',
			width : 60,
			sortable : false
		}, {
			text : "客户姓名",
			dataIndex : '客户姓名',
			width : 60,
			sortable : false
		}, {
			text : "客户联系方式",
			dataIndex : '客户联系方式',
			width : 60,
			sortable : false
		}, {
			text : "会话级别",
			dataIndex : '会话级别',
			width : 45,
			sortable : false
		}, {
			text : "问题描述",
			dataIndex : '问题描述',
			width : 60,
			sortable : false,
			flex : 1
		}, {
			text : "过程简述",
			dataIndex : '过程简述',
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
			text : "工单创建时间",
			dataIndex : '工单创建时间',
			width : 60,
			sortable : false,
			flex : 1
		}, {
			text : "客服响应时间",
			dataIndex : '客服响应时间',
			width : 60,
			sortable : false,
			flex : 1
		}, {
			text : "工单关闭时间",
			dataIndex : '工单关闭时间',
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
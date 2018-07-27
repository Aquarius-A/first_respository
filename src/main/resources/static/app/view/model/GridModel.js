/**
 * 动态生成grid数据列表的模板,
 * 通过constructor构造方法传递不同的参数,
 * 实现动态的表头与数据
 */
Ext.define('app.view.model.GridModel',{
	extend : 'Ext.grid.Panel',
	alias : 'widget.gridmodel',
	
	renderTo : Ext.getBody(), frame : true,height : 152, autoScroll : true,
	layout : 'form', columnLines : true, 
	flex : 1,
	
	constructor : function(headUrl, store, dataUrl) {


		var columns = [];     //表头字段
		var fields = [];      //显示字段
		Ext.Ajax.request({ 
			url : headUrl,
			async : false,
			success : function(response) {
				columnData = response.responseText.split(',');
			}
		});
		columns.push({header : "序号", align : "center" , xtype : "rownumberer", width : 50 });
		for(var i = 0; i < columnData.length; i++) {
			var column = {};
            column = {header : columnData[i], dataIndex : columnData[i] , flex : 1};
			var field = {name : columnData[i]};
			columns.push(column);
			fields.push(field);
		}
		this.store = Ext.create('Ext.data.Store',{
			storeId : store,
			autoLoad : {start : 0, limit : 20},
			fields : fields,
			pageSize : 20,
			proxy : {
				type : 'ajax',
				url : dataUrl,
				reader : {
					type : 'json',
					rootProperty : 'data',
					total : 'total'
				}
			}
		});
		
		
		this.columns = columns;
		this.dockedItems = [{
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			displayInfo : true,
			displayMsg : '显示{0}-{1}条,共{2}条',
			emptyMsg : '没有记录',
			items : ['-', '每页', {
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
	        store : this.store
		}]
		this.listeners = {
				itemclick : 'itemclicked'
			},
		
		this.callParent(arguments);
	}
});
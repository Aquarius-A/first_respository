
/**
 * 系统主页的顶部区域，主要放置系统名称，菜单，和一些快捷按钮
 */
//<%
//    HttpSession ses=request.getSession();
//    String username= (String)ses.getAttribute("user");
//%>
Ext.define('app.view.main.region.Top', {

			extend : 'Ext.toolbar.Toolbar',

			alias : 'widget.maintop', // 定义了这个组件的xtype类型为maintop

			uses : ['app.ux.ButtonTransparent','app.ux.MultiFileButton'],

			defaults : {
				xtype : 'buttontransparent'
			},

			style : 'background-color : #cde6c7',

			height : 40,
			
			initComponent : function() {
				var username;
				var role = true;
				Ext.Ajax.request({
					//type : 'post',
		    		url : 'getUser',
		    		dataType : 'json',
		    		async : false,
		    		success : function(response){
		    			var obj = eval('(' + response.responseText + ')'); 
		    			username = obj.username; 
		    			window.usergroup=obj.userGroup;
		    			if(obj.level == "管理员"){
		    				role = false;
		    			}
		    		}
		    	});
				this.items = [{
					xtype : 'image',
					bind : { 
						hidden : '{!system.iconUrl}', 
						src : '{system.iconUrl}' 
					}
				}, {
					xtype : 'label',
					bind : {
						text : '{system.name}'
					},
					style : 'font-size:20px;color:blue;'
				},  '->', '->', {
					text : '导入',
					glyph : 0xf062,
					hidden : role,
					handler : 'updateExcel'
				},{
					text :  username,
					glyph : 0xf007
				}, {
					text : '注销',
					glyph : 0xf011,
					handler : 'loginOut'
				}];
				
				this.callParent();
			}

		

		});
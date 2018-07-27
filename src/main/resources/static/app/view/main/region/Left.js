/**
 * 左边的菜单区域，可以放树形菜单或折叠菜单
 */
Ext.define('app.view.main.region.Left', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.mainmenuregion',

			uses : ['app.view.main.menu.MainMenuTree',
					'app.view.main.menu.AccordionMainMenu'],

			layout : {
				type : 'accordion',
				animate : true
			},
			glyph : 0xf0c9,

			initComponent : function() {

				this.items = [{
							xtype : 'mainmenuaccordion'
					        //xtype : 'mainmenutree'
						}];
				this.callParent();
			}

		})
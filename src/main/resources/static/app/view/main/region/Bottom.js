Ext.define('app.view.main.region.Bottom', {
	
	extend : 'Ext.toolbar.Toolbar',
	
	alias : 'widget.mainbottom',
	
	items : [{
		bind : {
			text : '使用单位:{user.name}'
		},
		glyph : 0xf0f7
	},{
		bind : {
			text : '用户:{user.name}'
		},
		glyph : 0xf007
	}, '->', {
		bind : {
			text : '服务单位:{service.company}'
		},
		glyph : 0xf059
	}, {
		bind : {
			text : '服务人员:{service.name}'
		}
	}, {
		bind : {
			text : 'tel:{service.phonenumber}'
		},
		glyph : 0xf095
	}, {
		bind : {
			hidden : '{!service.email}',
			
			text : "eMail:{service.email}"
		},
		glyph : 0xf003
	}]
});
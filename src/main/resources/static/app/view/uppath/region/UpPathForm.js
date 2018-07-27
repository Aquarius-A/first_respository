Ext.define('app.view.uppath.region.UpPathForm',{
	
	extend : 'Ext.form.Panel',
	
	alias : 'widget.uppathformpanel',
	
	uses : ['app.ux.MultiFile'],
	
//	items : [{
//		xtype :'multifile', 
//		directory:true,
//	}]
	
	items: [
        {
            xtype: 'textfield',
            fieldLabel: '文件上传',
            labelWidth: 80,
            msgTarget: 'side',
            allowBlank: false,
            margin: '10,10,10,10',
            anchor: '100%',
            buttonText:'选择文件'
        }],
        buttons:[
        {
            text: '上传',
            handler: function() {
                uploadForm.getForm().submit({
                    url: 'ExtFormSubmitAjax.ashx',
                    params: {
                        action: 'UploadFile'
                    },
                    success: function(form, action) {
                        var jsonResult = Ext.JSON.decode(action.response.responseText);
                        if (jsonResult.success) {

                        }
                        Ext.Msg.alert('提示', jsonResult.Msg);
                    }

                });
            }
        }, {
            text: '取消',
            handler: function() {
                
            }
        }],
        buttonAlign:'center'


	
});
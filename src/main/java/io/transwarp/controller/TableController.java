package io.transwarp.controller;

import io.transwarp.bean.User;

import io.transwarp.dao.TableDao;
import io.transwarp.dao.UserDao;
import io.transwarp.util.Constant;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TableController {

	@Autowired
	private Constant constant;

	@RequestMapping(value = "getTables", method = { RequestMethod.POST, RequestMethod.GET })
	public String getTables(HttpServletRequest request) {

		String username = (String) request.getSession().getAttribute("user");
		User user = UserDao.getUser(username);
		List<HashMap<String, String>> list = UserDao.getAuth(user.getUserGroup());
		
		JSONArray authList = new JSONArray();
		for (int i = 0; i < list.size(); i++) {
			if(list.get(i).get("id").length() == 1) {
				JSONObject obj = new JSONObject();
				obj.put("text", list.get(i).get("text"));
				obj.put("glyph", Integer.parseInt(list.get(i).get("glyph").substring(2), 16));
				obj.put("handler", list.get(i).get("handler"));				
				JSONArray items = new JSONArray();
				for (int k = i + 1; k < list.size(); k++) {
					if(list.get(k).get("id").length() > 1) {
						JSONObject item = new JSONObject();
						item.put("text", list.get(k).get("text"));
						item.put("glyph", Integer.parseInt(list.get(k).get("glyph").substring(2), 16));
						item.put("handler", list.get(k).get("handler"));
						items.add(item);
					}else {
						break;
					}
				}
				obj.put("items", items);
				authList.add(obj);
			}
		}
		
		if(user.getLevel().equals("管理员")) {
			JSONObject manager = new JSONObject();
			manager.put("text", "管理功能");
			manager.put("glyph", 0xf0ce);
			JSONArray managerItems = new JSONArray();
			JSONObject managerItem = new JSONObject();
			managerItem.put("text", "用户管理");
			managerItem.put("glyph", 0xf02d);
			managerItem.put("handler", "registerClick");
			managerItems.add(managerItem);
			manager.put("items", managerItems);
			authList.add(manager);
		}
		return authList.toString();

	}
	@RequestMapping(value = "getColumnHeader_aftersale", method = { RequestMethod.POST, RequestMethod.GET })
	public String getAfterSaleColumnHeader() {
			return constant.XMGL_AFTERSALECOLUMNLIST;
	}
	
	
	@RequestMapping(value = "getDataList_aftersale", method = { RequestMethod.POST, RequestMethod.GET })
	public String getDataList(@RequestParam("start") String start, @RequestParam("limit") String limit) {

		JSONObject obj = new JSONObject();
		int count = TableDao.getTableCount(constant.XMGL_TN_AFTERSALE);
		obj.put("total", count);
		JSONArray arr = TableDao.getTableData(constant.XMGL_TN_AFTERSALE, start, limit);
		obj.put("data", arr);
		return obj.toString();
	}

	@RequestMapping(value = "getDataListByParam", method = { RequestMethod.POST, RequestMethod.GET })
	public String getDataListByParam(@RequestParam("start") String start, @RequestParam("limit") String limit,
			@RequestParam("param1") String param1, @RequestParam("param2") String param2,
			@RequestParam("param3") String param3) {

		JSONObject obj = new JSONObject();

		ArrayList<String> paramList = new ArrayList<String>();
		paramList.add(param1);
		paramList.add(param2);
		paramList.add(param3);

		Map<String, Object> map = TableDao.getTableDataByParamList(constant.XMGL_TN_AFTERSALE, start, limit, paramList);

		int count = (int) map.get("count");
		obj.put("total", count);

		JSONArray arr = (JSONArray) map.get("data");
		obj.put("data", arr);

		return obj.toString();
	}
	
}

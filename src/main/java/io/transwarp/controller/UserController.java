package io.transwarp.controller;

import io.transwarp.bean.User;

import io.transwarp.dao.TableDao;
import io.transwarp.dao.UserDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UserController {

	private static final Logger log = LoggerFactory
			.getLogger(UserController.class);

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView index(@SessionAttribute("user") String account) {
		ModelAndView model = new ModelAndView();
		model.addObject("name", account);
		model.setViewName("index");
		return model;
	}

	@RequestMapping(value = "login", method = RequestMethod.GET)
	public ModelAndView login() {
		ModelAndView model = new ModelAndView();
		model.setViewName("login");
		return model;
	}

	@RequestMapping(value = "loginOut", method = { RequestMethod.POST,
			RequestMethod.GET })
	public void loginOut(HttpServletRequest request) {
		request.getSession().invalidate();
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public ModelAndView checkUser(@RequestParam("username") String username,
			@RequestParam("password") String password,
			HttpServletRequest request) {
		ModelAndView model = new ModelAndView();

		if (UserDao.checkUser(username, password)) {
			request.getSession().setAttribute("user", username);
			model.setViewName("index");
		} else {
			log.info("login faild of user [{}] with pathword [{}]", username,
					password);
			model.addObject("info", "login error");
			model.setViewName("login");
		}
		return model;
	}

	@RequestMapping(value = "getUser", method = { RequestMethod.POST,
			RequestMethod.GET })
	public String getUser(HttpServletRequest request) {
		
		String username = (String)request.getSession().getAttribute("user");
		User user = UserDao.getUser(username);
		
		JSONObject obj = JSONObject.fromObject(user);
		return obj.toString();
	}

	@RequestMapping(value = "test", method = RequestMethod.GET)
	public ModelAndView test() {
		ModelAndView model = new ModelAndView();
		model.setViewName("test");
		return model;
	}

	@RequestMapping(value = "getUserList", method = RequestMethod.GET)
	public String getUserList(@RequestParam("start") String start,
			@RequestParam("limit") String limit) {
		JSONObject obj = new JSONObject();

		int total = TableDao.getTableCount("ezuser");
		obj.put("total", total);

		JSONArray arr = UserDao.getUsers(start, limit);
		obj.put("data", arr);

		return obj.toString();
	}

	@RequestMapping(value = "deleteUser", method = RequestMethod.GET)
	public boolean deleteUser(@RequestParam("username") String username) {
		boolean b = UserDao.deleteUser(username);
		return b;
	}

	@RequestMapping(value = "editUser", method = RequestMethod.GET)
	public boolean editUser(@RequestParam("username") String username,@RequestParam("usergroup") String usergroup) {
		boolean b = UserDao.editUser(username, usergroup);
		return b;
	}
	

	@RequestMapping(value = "addUser", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
	public boolean addUser(@RequestParam("data") String data) {
	
		JSONObject obj = JSONObject.fromObject(data);
		User user = new User();
		user.setUsername(obj.get("username").toString());
		user.setPassword(obj.get("password").toString());
		user.setEmail(obj.get("email").toString());
		//user.setGroup(obj.get("group").toString());
		user.setUserGroup(obj.get("usergroup").toString());
		user.setLevel(obj.get("level").toString());

		return UserDao.addUser(user);

	}
}

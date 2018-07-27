package io.transwarp.dao;

import io.transwarp.bean.User;

import io.transwarp.util.JdbcUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.session.SessionProperties.Jdbc;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor=Exception.class)
public class UserDao {

	private static final Logger log = LoggerFactory.getLogger(UserDao.class);

	/**
	 * 判断登录
	 */
	public static boolean checkUser(String username, String password) {

		boolean result = false;
		Connection conn = null;
		try {
			conn = JdbcUtil.getConnection();
			String sql = "SELECT username FROM ezuser WHERE username=? and pwd=?";
			PreparedStatement pstmt;
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt.setString(1, username);
			pstmt.setString(2, password);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				result = true;
			} else {
				result = false;
			}
			pstmt.close();
			rs.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}
	
	//获得用户
	public static User getUser(String username) {
		User user = new User();
		String sql = "SELECT * FROM ezuser WHERE username = '" + username + "'";
		PreparedStatement pstmt = null;
		Connection conn = null;
		try {
			conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				user.setUsername(rs.getString("username"));
				user.setLevel(rs.getString("role"));
				user.setUserGroup(rs.getString("usergroup"));
				user.setEmail(rs.getString("email"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			conn.close();
			pstmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return user;
	}
	// 添加用户
	public static boolean addUser(User user) {
		int i = 0;
		String sql = "INSERT INTO ezuser (username,pwd,usergroup,role,email) values (?,?,?,?,?)";
		PreparedStatement pstmt;
		try {
			Connection conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt.setString(1, user.getUsername());
			pstmt.setString(2, user.getPassword());
			pstmt.setString(3, user.getUserGroup());
			pstmt.setString(4, user.getLevel());
			pstmt.setString(5, user.getEmail());
			i = pstmt.executeUpdate();
			pstmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		if (i == 0) {
			return false;
		}
		return true;
	}

	// 删除用户
	public static boolean deleteUser(String name) {
		int i = 0;
		String sql = "DELETE FROM ezuser where username='" + name + "'";
		PreparedStatement pstmt;
		try {
			Connection conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			i = pstmt.executeUpdate();
			pstmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (i == 0) {
			return false;
		}
		return true;
	}

	//修改用户
	public static boolean editUser(String name, String usergroup) {
		int i = 0;
		String sql = "UPDATE ezuser set usergroup='" + usergroup + "' where username='" + name + "'";
		PreparedStatement pstmt;
		try {
			Connection conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			i = pstmt.executeUpdate();
			pstmt.close();
			conn.close();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		if(i == 0) {
			return false;
		}
		return true;
	}
	// 查询用户
	public static JSONArray getUsers(String start, String limit) {
		JSONArray arr = new JSONArray();
		String sql = "SELECT * FROM ezuser LIMIT " + start + " , " + limit;
		PreparedStatement pstmt = null;
		Connection conn = null;
		try {
			conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				JSONObject info = new JSONObject();
				String str=rs.getString("pwd");
				int i = str.length();
				str=str.substring(0, i/2);
				str=str+"****";
				info.put("username", rs.getString("username"));
				info.put("password", str);
				info.put("usergroup", rs.getString("usergroup"));
				info.put("level", rs.getString("role"));
				info.put("email", rs.getString("email"));
				arr.add(info);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			conn.close();
			pstmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return arr;
	}
	
	//获取用户权限
	public static List<HashMap<String, String>> getAuth(String usergroup){
		
		List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
		String sql = "SELECT * FROM auth WHERE usergroup = '" + usergroup + "'";
		PreparedStatement pstmt = null;
		Connection conn = null;
		try {
			conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				HashMap<String, String> map = new HashMap<String, String>();
				map.put("id", rs.getString("id"));
				map.put("text", rs.getString("text"));
				map.put("glyph", rs.getString("glyph"));
				map.put("handler", rs.getString("handler"));
				list.add(map);
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			conn.close();
			pstmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return list;
	}
}

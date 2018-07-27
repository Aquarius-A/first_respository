package io.transwarp.dao;

import io.transwarp.util.JdbcUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Transactional(rollbackFor = Exception.class)
public class TableDao {

	private static final Logger log = LoggerFactory.getLogger(UserDao.class);
	
	public static JSONArray getTableData(String tableName, String start,
			String limit) {
		JSONArray arr = new JSONArray();
		String SQL = "SELECT * FROM " + tableName + " LIMIT " + start + " , "
				+ limit;
		Connection conn = null;
		try {
			conn = JdbcUtil.getConnection();
			PreparedStatement pstmt;
			log.info(SQL);
			pstmt = (PreparedStatement) conn.prepareStatement(SQL);
			ResultSet rs = pstmt.executeQuery();
			java.sql.ResultSetMetaData m = rs.getMetaData();
			int columns = m.getColumnCount();

			while (rs.next()) {
				JSONObject info = new JSONObject();
				for (int i = 1; i <= columns; i++) {
					info.put(m.getColumnName(i), rs.getString(i));
				}
				arr.add(info);
			}
			pstmt.close();
			rs.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return arr;
	}

	public static int getTableCount(String tableName) {
		String sql = "SELECT COUNT(1) FROM " + tableName;
		int count = 0;
		Connection conn = null;
		try {
			conn = JdbcUtil.getConnection();
			PreparedStatement pstmt;
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				count = rs.getInt(1);
			}
			pstmt.close();
			rs.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return count;
	}

	public static Map<String, Object> getTableDataByParamList(String tableName,
			String start, String limit, ArrayList<String> paramList) {
		Map<String, Object> map = new HashMap<String, Object>();
		JSONArray arr = new JSONArray();
		StringBuffer SQL = new StringBuffer("SELECT * FROM " + tableName
				+ " WHERE 1=1");
		if (paramList.get(0) != null && paramList.get(0) != "") {
			SQL.append(" AND OA项目名称 LIKE " + "concat('%',\"" + paramList.get(0)
					+ "\",'%')");
		}
		if (paramList.get(1) != null && paramList.get(1) != "") {
			SQL.append(" AND 负责人 LIKE " + "concat('%',\"" + paramList.get(1)
					+ "\",'%')");
		}
		if (paramList.get(2) != null && paramList.get(2) != "") {
			SQL.append(" AND 项目状态 LIKE " + "concat('%',\"" + paramList.get(2)
					+ "\",'%')");
		}
		map.put("count", getTableCount(tableName, SQL.toString()));
		SQL.append(" LIMIT " + start + " , " + limit);
		Connection conn = null;
		try {
			conn = JdbcUtil.getConnection();
			PreparedStatement pstmt;
			log.info(SQL.toString());
			pstmt = (PreparedStatement) conn.prepareStatement(SQL.toString());
			ResultSet rs = pstmt.executeQuery();
			java.sql.ResultSetMetaData m = rs.getMetaData();
			int columns = m.getColumnCount();
			while (rs.next()) {
				JSONObject info = new JSONObject();
				for (int i = 1; i <= columns; i++) {
					info.put(m.getColumnName(i), rs.getString(i));
				}
				arr.add(info);
			}
			pstmt.close();
			rs.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		map.put("data", arr);
		return map;
	}
	
	public static Map<String, Object> getTableDataByTime(String tablename, String start, 
			String limit, String searchColumn, String startTime, String endTime) {
		Map<String, Object> map = new HashMap<String, Object>();
		JSONArray arr = new JSONArray();
		StringBuffer sql = new StringBuffer("SELECT * FROM " + tablename + " WHERE 1=1 ");
		sql.append("AND " +searchColumn+ " >= " + "concat(\"" + startTime + "\")");
		sql.append("AND " +searchColumn+ " <= " + "concat(\"" + endTime + "\")");
		map.put("count", getTableCount(tablename, sql.toString()));
		sql.append(" LIMIT " + start + " , " + limit);
		Connection conn = null;
		try {
			conn = JdbcUtil.getConnection();
			PreparedStatement pstmt;
			log.info(sql.toString());
			pstmt = (PreparedStatement) conn.prepareStatement(sql.toString());
			ResultSet rs = pstmt.executeQuery();
			java.sql.ResultSetMetaData m = rs.getMetaData();
			int columns = m.getColumnCount();
			while (rs.next()) {
				JSONObject info = new JSONObject();
				for (int i = 1; i <= columns; i++) {
					info.put(m.getColumnName(i), rs.getString(i));
				}
				arr.add(info);
			}
			pstmt.close();
			rs.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		map.put("data", arr);
		return map;
	}

	public static int getTableCount(String tableName, String sqlTmp) {
		String[] splitSql = sqlTmp.split("WHERE");
		String sql = "SELECT COUNT(1) FROM " + tableName + " WHERE "
				+ splitSql[1];
		int count = 0;
		Connection conn = null;
		try {
			conn = JdbcUtil.getConnection();
			PreparedStatement pstmt;
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				count = rs.getInt(1);
			}
			pstmt.close();
			rs.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return count;
	}
}

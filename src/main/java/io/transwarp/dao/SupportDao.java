package io.transwarp.dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import io.transwarp.bean.LtSupport;
import io.transwarp.bean.NbSupport;
import io.transwarp.bean.YwSupport;
import io.transwarp.bean.YxSupport;
import io.transwarp.util.JdbcUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Transactional(rollbackFor=Exception.class)
public class SupportDao {
	
	private static final Logger log = LoggerFactory.getLogger(SupportDao.class);
	
	public static List<HashMap<String, String>> exportSeachDataToExcel(String tablename, String searchColumn, String startTime, String endTime) {
		List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
		StringBuffer sql = new StringBuffer("SELECT * FROM " + tablename + " WHERE 1=1 ");
		sql.append("AND " +searchColumn+ " >= " + "concat(\"" + startTime + "\")");
		sql.append("AND " +searchColumn+ " <= " + "concat(\"" + endTime + "\")");
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
				HashMap<String, String> info = new HashMap<String, String>();
				//JSONObject info = new JSONObject();
				for (int i = 1; i <= columns; i++) {
					info.put(m.getColumnName(i), rs.getString(i));
				}
				list.add(info);
			}
			pstmt.close();
			rs.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}
	
	public static boolean addYwSupport(YwSupport ywsupport, String tablename, String fields) {
		
		int i = 0;
		String sql = "INSERT INTO " + tablename + "(" + fields + ") values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement pstmt;
		try {
			Connection conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			//pstmt.setString(1, ywsupport.getId());
			pstmt.setString(1, ywsupport.getProjectname());
			pstmt.setString(2, ywsupport.getSupportedition());
			pstmt.setString(3, ywsupport.getEdition());
			pstmt.setString(4, ywsupport.getEnvironment());
			pstmt.setString(5, ywsupport.getStatus());
			pstmt.setString(6, ywsupport.getName());
			pstmt.setString(7, ywsupport.getPhone());
			pstmt.setString(8, ywsupport.getLevel());
			pstmt.setString(9, ywsupport.getDescribe());
			pstmt.setString(10, ywsupport.getSketch());
			pstmt.setString(11, ywsupport.getOperator());
			pstmt.setString(12, ywsupport.getResult());
			pstmt.setString(13, ywsupport.getCreateTime());
			pstmt.setString(14, ywsupport.getResponseTime());
			pstmt.setString(15, ywsupport.getCloseTime());
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
	
    public static boolean addLtSupport(LtSupport ltsupport, String tablename, String fields) {
		
		int i = 0;
		String sql = "INSERT INTO " + tablename + "(" + fields + ") values (?,?,?,?,?,?,?,?)";
		PreparedStatement pstmt;
		try {
			Connection conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt.setString(1, ltsupport.getTitle());
			pstmt.setString(2, ltsupport.getAuthor());
			pstmt.setString(3, ltsupport.getProDescrible());
			pstmt.setString(4, ltsupport.getOperator());
			pstmt.setString(5, ltsupport.getResult());
			pstmt.setString(6, ltsupport.getStartTime());
			pstmt.setString(7, ltsupport.getFirstResponseTime());
			pstmt.setString(8, ltsupport.getLastResponseTime());
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
    
 public static boolean addYxSupport(YxSupport yxsupport, String tablename, String fields) {
		
		int i = 0;
		String sql = "INSERT INTO " + tablename + "(" + fields + ") values (?,?,?,?,?,?,?,?)";
		PreparedStatement pstmt;
		try {
			Connection conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt.setString(1, yxsupport.getTheme());
			pstmt.setString(2, yxsupport.getName());
			pstmt.setString(3, yxsupport.getProDescrible());
			pstmt.setString(4, yxsupport.getOperator());
			pstmt.setString(5, yxsupport.getResult());
			pstmt.setString(6, yxsupport.getStartTime());
			pstmt.setString(7, yxsupport.getFirstResponseTime());
			pstmt.setString(8, yxsupport.getLastResponseTime());
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
 
 public static boolean addNbSupport(NbSupport nbsupport, String tablename, String fields) {
		
		int i = 0;
		String sql = "INSERT INTO " + tablename + "(" + fields + ") values (?,?,?,?,?,?,?,?,?)";
		PreparedStatement pstmt;
		try {
			Connection conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt.setString(1, nbsupport.getEdition());
			pstmt.setString(2, nbsupport.getName());
			pstmt.setString(3, nbsupport.getEnvironment());
			pstmt.setString(4, nbsupport.getDescribe());
			pstmt.setString(5, nbsupport.getSketch());
			pstmt.setString(6, nbsupport.getOperator());
			pstmt.setString(7, nbsupport.getResult());
			pstmt.setString(8, nbsupport.getStartTime());
			pstmt.setString(9, nbsupport.getEndTime());
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
 public static boolean editYwSupport(YwSupport ywsupport, String tablename, String fields) {
		
		int i = 0;
		String sql = "UPDATE " + tablename+" SET" +" 项目名称 = ?,维保版本 =?,tdh版本 =?,项目环境 =?,项目状态 =?,客户姓名 =?,客户联系方式 =?,会话级别 =?,问题描述 = ?,过程简述 =?,处理人 =?,处理结果 =?,工单创建时间 = ?,客服响应时间 = ?,工单关闭时间 = ? WHERE 易维会话ID = '"+ywsupport.getId()+"'";
		PreparedStatement pstmt;
		try {
			Connection conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt.setString(1, ywsupport.getProjectname());
			pstmt.setString(2, ywsupport.getSupportedition());
			pstmt.setString(3, ywsupport.getEdition());
			pstmt.setString(4, ywsupport.getEnvironment());
			pstmt.setString(5, ywsupport.getStatus());
			pstmt.setString(6, ywsupport.getName());
			pstmt.setString(7, ywsupport.getPhone());
			pstmt.setString(8, ywsupport.getLevel());
			pstmt.setString(9, ywsupport.getDescribe());
			pstmt.setString(10, ywsupport.getSketch());
			pstmt.setString(11, ywsupport.getOperator());
			pstmt.setString(12, ywsupport.getResult());
			pstmt.setString(13, ywsupport.getCreateTime());
			pstmt.setString(14, ywsupport.getResponseTime());
			pstmt.setString(15, ywsupport.getCloseTime());
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
 
 public static boolean deleteywsupport(String 易维会话ID) {
		int i = 0;
		String sql = "DELETE FROM 易维状态汇总  where 易维会话ID='" + 易维会话ID + "'";
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
 
 public static boolean editYxSupport(YxSupport yxsupport, String tablename, String fields) {
		
		int i = 0;
		String sql = "UPDATE " + tablename+" SET " +"邮件主题 = ?,发件人 =?,问题描述 =?,处理人 =?,处理结果 =?,发件时间 =?,首次回件时间 =?,最后回件时间 =? WHERE 邮箱项目id = '"+yxsupport.getId()+"'";
		PreparedStatement pstmt;
		try {
			Connection conn = JdbcUtil.getConnection();
			log.info(sql);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt.setString(1, yxsupport.getTheme());
			pstmt.setString(2, yxsupport.getName());
			pstmt.setString(3, yxsupport.getProDescrible());
			pstmt.setString(4, yxsupport.getOperator());
			pstmt.setString(5, yxsupport.getResult());
			pstmt.setString(6, yxsupport.getStartTime());
			pstmt.setString(7, yxsupport.getFirstResponseTime());
			pstmt.setString(8, yxsupport.getLastResponseTime());
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

public static boolean deleteyxsupport(String 邮箱项目id) {
		int i = 0;
		String sql = "DELETE FROM 邮箱状态汇总  where 邮箱项目id='" + 邮箱项目id + "'";
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
 
public static boolean editLtSupport(LtSupport ltsupport, String tablename, String fields) {
	
	int i = 0;
	String sql = "UPDATE " + tablename+" SET " +"标题 = ?,发帖人 =?,问题描述 =?,处理人 =?,处理结果 =?,发帖时间 =?,首次回帖时间 =?,最后回帖时间 =? WHERE 论坛项目id = '"+ltsupport.getId()+"'";
	PreparedStatement pstmt;
	try {
		Connection conn = JdbcUtil.getConnection();
		log.info(sql);
		pstmt = (PreparedStatement) conn.prepareStatement(sql);
		pstmt.setString(1, ltsupport.getTitle());
		pstmt.setString(2, ltsupport.getAuthor());
		pstmt.setString(3, ltsupport.getProDescrible());
		pstmt.setString(4, ltsupport.getOperator());
		pstmt.setString(5, ltsupport.getResult());
		pstmt.setString(6, ltsupport.getStartTime());
		pstmt.setString(7, ltsupport.getFirstResponseTime());
		pstmt.setString(8, ltsupport.getLastResponseTime());
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


public static boolean deleteltsupport(String 论坛项目id) {
	int i = 0;
	String sql = "DELETE FROM 论坛状态汇总  where 论坛项目id='" + 论坛项目id + "'";
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

public static boolean editNbSupport(NbSupport nbsupport, String tablename, String fields) {
	
	int i = 0;
	String sql = "UPDATE " + tablename+" SET " +"tdh版本 = ?,姓名 =?,项目环境 =?,问题描述=?,过程简述 =?,处理人 =?,处理结果 =?,接入时间 =? ,结束时间 =? WHERE 内部项目id = '"+nbsupport.getId()+"'";
	PreparedStatement pstmt;
	try {
		Connection conn = JdbcUtil.getConnection();
		log.info(sql);
		pstmt = (PreparedStatement) conn.prepareStatement(sql);
		pstmt.setString(1, nbsupport.getEdition());
		pstmt.setString(2, nbsupport.getName());
		pstmt.setString(3, nbsupport.getEnvironment());
		pstmt.setString(4, nbsupport.getDescribe());
		pstmt.setString(5, nbsupport.getSketch());
		pstmt.setString(6, nbsupport.getOperator());
		pstmt.setString(7, nbsupport.getResult());
		pstmt.setString(8, nbsupport.getStartTime());
		pstmt.setString(9, nbsupport.getEndTime());
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

public static boolean deleteNbsupport(String 内部项目id) {
	int i = 0;
	String sql = "DELETE FROM 内部状态汇总  where 内部项目id='" + 内部项目id + "'";
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

}



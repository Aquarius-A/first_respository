package io.transwarp.dao;

import io.transwarp.util.JdbcUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor=Exception.class)
public class ExcelDao {

	private static final Logger log = LoggerFactory.getLogger(ExcelDao.class);

//	// 根据表名删除表
//	public static void dropTable(Map<String, ArrayList<ArrayList<Object>>> MAP) {
//		Connection conn = null;
//		Statement stmt = null;
//		try {
//			conn = JdbcUtil.getConnection();
//		} catch (SQLException e1) {
//			e1.printStackTrace();
//			log.error(e1.getMessage());
//		}
//		for (Entry<String, ArrayList<ArrayList<Object>>> entry : MAP.entrySet()) {
//			// 不能删除ezuser表
//			if ("ezuser".equals(entry.getKey())) {
//				continue;
//			}
//			String SQL = "DROP TABLE IF EXISTS " + entry.getKey();
//			try {
//				stmt = conn.createStatement();
//				log.info(SQL);
//				stmt.executeUpdate(SQL);
//			} catch (Exception e) {
//				e.printStackTrace();
//				log.error(e.getMessage());
//			}
//		}
//		try {
//			stmt.close();
//			conn.close();
//		} catch (SQLException e) {
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}
//
//	}
//
//	// 建表
//	public static void createTable(Map<String, ArrayList<ArrayList<Object>>> MAP) {
//		Connection conn = null;
//		Statement stmt = null;
//		try {
//			conn = JdbcUtil.getConnection();
//		} catch (SQLException e1) {
//			e1.printStackTrace();
//			log.error(e1.getMessage());
//		}
//		for (Entry<String, ArrayList<ArrayList<Object>>> entry : MAP.entrySet()) {
//			StringBuffer SQL = new StringBuffer("CREATE TABLE IF NOT EXISTS "
//					+ entry.getKey() + " ( ");
//			ArrayList<ArrayList<Object>> result = entry.getValue();
//			for (int j = 0; j < result.get(0).size(); j++) {
//				if (j != result.get(0).size() - 1) {
//					SQL.append(result.get(0).get(j).toString()
//							+ " TEXT,");
//				} else {
//					SQL.append(result.get(0).get(j).toString()
//							+ " TEXT );");
//				}
//			}
//			System.out.println(SQL);
//			try {
//				stmt = conn.createStatement();
//				log.info(SQL.toString());
//				stmt.executeUpdate(SQL.toString());
//			} catch (Exception e) {
//				e.printStackTrace();
//				log.error(e.getMessage());
//			}
//		}
//		try {
//			stmt.close();
//			conn.close();
//		} catch (SQLException e) {
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}
//
//	}

	// 插入数据库
	public static void insertTable(Map<String, ArrayList<ArrayList<Object>>> MAP) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		for (Entry<String, ArrayList<ArrayList<Object>>> entry : MAP.entrySet()) {
			
			
			String str = entry.getKey();
			String[]  strs=str.split("\\\\");
			str=strs[strs.length-1];
			
			StringBuffer SQL = new StringBuffer("INSERT INTO " + str
					+ " ( ");
			ArrayList<ArrayList<Object>> result = entry.getValue();
			for (int j = 0; j < result.get(0).size(); j++) {
				if (j != result.get(0).size() - 1) {
					SQL.append(result.get(0).get(j).toString() + " ,");
				} else {
					SQL.append(result.get(0).get(j).toString() + " ) VALUES (");
				}
			}
			for (int i = 0; i < result.get(0).size(); i++) {
				if (i != result.get(0).size() - 1) {
					SQL.append(" ?,");
				} else {
					SQL.append(" ?)");
				}
			}
			try {
				conn = JdbcUtil.getConnection();
				log.info(SQL.toString());
				pstmt = conn.prepareStatement(SQL.toString());
				System.out.println(SQL.toString());
				for (int i = 1; i < result.size(); i++) {
					for (int j = 0; j < result.get(0).size(); j++) {
						pstmt.setString(j + 1, result.get(i).get(j).toString());
					}
					pstmt.addBatch();
				}
				pstmt.executeBatch();
				
			} catch (Exception e) {
				e.printStackTrace();
				log.error(e.getMessage());
			}
		}
		try {
			pstmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}

	}

}

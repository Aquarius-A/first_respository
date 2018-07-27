package io.transwarp.util;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

public class JdbcUtil {
	private static DataSource dataSource;
	static {
		dataSource = (DataSource) SpringUtil.getBean("DataSource");
	}

	public static  Connection getConnection() throws SQLException {
		return dataSource.getConnection();
	}
}

package io.transwarp.service;

import io.transwarp.dao.ExcelDao;
import io.transwarp.util.ExcelUtil;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service("FilesUploadService")
public class FilesUploadService {

	public static String upload(List<MultipartFile> files) {
		// clean data
		ExcelUtil.MAP.clear();
		// 遍历文件夹
		for (MultipartFile mf : files) {
			if (!mf.isEmpty()) {
				String originalFilename = mf.getOriginalFilename();
				String filename = originalFilename.substring(originalFilename
						.lastIndexOf("/") + 1);
				if (originalFilename.contains("~$")) {
					System.out.println("过滤掉文件:" + originalFilename);
					continue;
				}
				String suffix = originalFilename.substring(originalFilename
						.lastIndexOf(".") + 1);
				// 格式限制，非excel不上传
				if (!"xls".equals(suffix) && !"xlsx".equals(suffix)) {
					continue;
				}
				System.out.println();
				// 读取Excel数据
				try {
					ExcelUtil.readExcel(filename, mf.getInputStream());
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		// 写入数据库
		Map<String, ArrayList<ArrayList<Object>>> MAP = ExcelUtil.getMAP();
		// 删除表
		//ExcelDao.dropTable(MAP);
		// 建表
		//ExcelDao.createTable(MAP);
		// 插入数据库
		ExcelDao.insertTable(MAP);

		return "ok";
	}
}

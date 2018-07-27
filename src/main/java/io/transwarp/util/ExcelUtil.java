package io.transwarp.util;

import java.io.InputStream;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.swing.plaf.synth.SynthSpinnerUI;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Row.MissingCellPolicy;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExcelUtil {
	private static final Logger log = LoggerFactory.getLogger(ExcelUtil.class);

	private static final String EXTENSION_XLS = "xls";
	private static final String EXTENSION_XLSX = "xlsx";

	public static Map<String, ArrayList<ArrayList<Object>>> MAP = new HashMap<String, ArrayList<ArrayList<Object>>>();

	// 默认单元格内容为数字时格式
	private static DecimalFormat df = new DecimalFormat("0");
	// 默认单元格格式化日期字符串
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

	// public static DecimalFormat getDf() {
	// return df;
	// }
	//
	// public static void setDf(DecimalFormat df) {
	// ExcelUtil.df = df;
	// }

	public static SimpleDateFormat getSdf() {
		return sdf;
	}

	public static void setSdf(SimpleDateFormat sdf) {
		ExcelUtil.sdf = sdf;
	}

	public static Map<String, ArrayList<ArrayList<Object>>> getMAP() {
		return MAP;
	}

	public static void readExcel(String filename, InputStream inputStream) {

		String prefix = filename.substring(0, filename.lastIndexOf("."));
		String suffix = filename.substring(filename.lastIndexOf(".") + 1);

		Workbook wb = null;
		try {
			if (suffix.equals(EXTENSION_XLSX)) {
				wb = new XSSFWorkbook(inputStream);
			} else if (suffix.equals(EXTENSION_XLS)) {
				wb = new HSSFWorkbook(inputStream);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}

		for (int numSheet = 0; numSheet < wb.getNumberOfSheets(); numSheet++) {

			ArrayList<Object> colList;
			ArrayList<ArrayList<Object>> rowList = new ArrayList<ArrayList<Object>>();
			Sheet sheet = wb.getSheetAt(numSheet);
			Row row;
			Cell cell;
			Object value;
			for (int i = sheet.getFirstRowNum(); i < sheet.getPhysicalNumberOfRows(); i++) {
				row = sheet.getRow(i);
				colList = new ArrayList<Object>();
				if (row == null || isBlankRow(row)) {
					continue;
				}
				for (int j = row.getFirstCellNum(); j < sheet.getRow(0).getLastCellNum(); j++) {
					cell = row.getCell(j, MissingCellPolicy.RETURN_BLANK_AS_NULL);
					if (i == sheet.getFirstRowNum()) {
						if (cell == null) {
							break;
						}
					}
					if (cell == null) {
						// 当该单元格为空
						colList.add("");
						continue;
					}
					switch (cell.getCellTypeEnum()) {
					case STRING:
						value = cell.getStringCellValue();
						break;
					case NUMERIC:
						if (DateUtil.isCellDateFormatted(cell)) {
							value = sdf.format(cell.getDateCellValue());
						} else {
							NumberFormat nf = NumberFormat.getInstance();
							String s = nf.format(cell.getNumericCellValue());
							if (s.indexOf(",") >= 0) {
								s = s.replace(",", "");
							}
							value = s;
						}
						break;
					case BOOLEAN:
						value = Boolean.valueOf(cell.getBooleanCellValue());
						break;
					case BLANK:
						value = "";
						break;
					default:
						value = cell.toString();
					}
					colList.add(value);
				}
				rowList.add(colList);
			}
			// 文件下只有一个sheet时，使用文件名作为表名
			if (wb.getNumberOfSheets() == 1) {
				mergeSheet(prefix, rowList);
			} else {
				mergeSheet(sheet.getSheetName(), rowList);
			}
		}

	}

	// 判断row是否没数据
	private static boolean isBlankRow(Row row) {
		if (row == null)
			return true;
		boolean result = true;
		for (int i = row.getFirstCellNum(); i < row.getLastCellNum(); i++) {
			Cell cell = row.getCell(i, MissingCellPolicy.RETURN_BLANK_AS_NULL);
			String value = "";
			if (cell != null) {
				switch (cell.getCellTypeEnum()) {
				case STRING:
					value = cell.getStringCellValue();
					break;
				case NUMERIC:
					value = String.valueOf((int) cell.getNumericCellValue());
					break;
				case BOOLEAN:
					value = String.valueOf(cell.getBooleanCellValue());
					break;
				case FORMULA:
					value = String.valueOf(cell.getCellFormula());
					break;
				default:
					break;
				}
				if (!value.trim().equals("")) {
					result = false;
					break;
				}
			}
		}
		return result;
	}

	// 相同的Excel head合并在一起
	private static void mergeSheet(String name, ArrayList<ArrayList<Object>> rowList) {
		if (MAP.size() == 0) {
			MAP.put(name, rowList);
		} else {
			boolean flag = true;
			for (Entry<String, ArrayList<ArrayList<Object>>> entry : MAP.entrySet()) {
				ArrayList<Object> list1 = new ArrayList<Object>();
				ArrayList<Object> list2 = new ArrayList<Object>();
				list1.addAll(rowList.get(0));
				list2.addAll(entry.getValue().get(0));
				if (compareList(list1, list2)) {
					putList(rowList, entry.getKey());
					flag = false;
				} else {
					if (name.equals(entry.getKey())) {
						log.error("error:sheet表名相同,列名不同!");
						flag = false;
					}
				}
			}

			if (flag) {
				MAP.put(name, rowList);
			}
		}

	}

	// 比较sheet 表头是否相同
	public static boolean compareList(ArrayList<Object> list1, ArrayList<Object> list2) {
		if (list1.size() != list2.size()) {
			return false;
		}
		Collections.sort(list1, new Sort());
		Collections.sort(list2, new Sort());

		for (int i = 0; i < list1.size(); i++) {
			if (!list1.get(i).equals(list2.get(i))) {
				return false;
			}
		}
		return true;
	}

	// 将相同表头的sheet数据合并在一起
	private static void putList(ArrayList<ArrayList<Object>> rowList, String key) {
		for (Entry<String, ArrayList<ArrayList<Object>>> entry : MAP.entrySet()) {
			if (entry.getKey().equals(key)) {
				// rowList的数据添加到map已存在的list中
				for (int i = 1; i < rowList.size(); i++) {
					entry.getValue().add(rowList.get(i));
				}
			}
		}
	}

}

// 比较list
class Sort implements Comparator<Object> {
	public int compare(Object o1, Object o2) {
		return o1.toString().compareTo(o2.toString());
	}
}

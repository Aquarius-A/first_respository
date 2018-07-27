package io.transwarp.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mysql.fabric.Response;

import io.transwarp.bean.LtSupport;
import io.transwarp.bean.NbSupport;
import io.transwarp.bean.YwSupport;
import io.transwarp.bean.YxSupport;
import io.transwarp.dao.SupportDao;
import io.transwarp.dao.TableDao;
import io.transwarp.dao.UserDao;
import io.transwarp.util.Constant;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@RestController
public class SupportController {

	private static final Logger log = LoggerFactory.getLogger(SupportController.class);

	@Autowired
	private Constant constant;

	@RequestMapping(value = "getColumnHeader_ywsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getYWColumnHeader() {
		return constant.XMGL_YWCOLUMNLIST;
	}

	@RequestMapping(value = "getColumnHeader_ltsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getLTColumnHeader() {
		return constant.XMGL_LTCOLUMNLIST;
	}

	@RequestMapping(value = "getColumnHeader_yxsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getYXColumnHeader() {
		return constant.XMGL_YXCOLUMNLIST;
	}

	@RequestMapping(value = "getColumnHeader_nbsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getNBColumnHeader() {
		return constant.XMGL_NBCOLUMNLIST;
	}

	@RequestMapping(value = "getDataList_ywsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getYwDataList(@RequestParam("start") String start, @RequestParam("limit") String limit) {

		JSONObject obj = new JSONObject();
		int count = TableDao.getTableCount(constant.XMGL_TN_YWSUPPORT);
		obj.put("total", count);
		JSONArray arr = TableDao.getTableData(constant.XMGL_TN_YWSUPPORT, start, limit);
		obj.put("data", arr);
		return obj.toString();
	}

	@RequestMapping(value = "getDataList_ltsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getLtDataList(@RequestParam("start") String start, @RequestParam("limit") String limit) {

		JSONObject obj = new JSONObject();
		int count = TableDao.getTableCount(constant.XMGL_TN_LTSUPPORT);
		obj.put("total", count);
		JSONArray arr = TableDao.getTableData(constant.XMGL_TN_LTSUPPORT, start, limit);
		obj.put("data", arr);
		return obj.toString();
	}

	@RequestMapping(value = "getDataList_yxsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getYxDataList(@RequestParam("start") String start, @RequestParam("limit") String limit) {

		JSONObject obj = new JSONObject();
		int count = TableDao.getTableCount(constant.XMGL_TN_YXSUPPORT);
		obj.put("total", count);
		JSONArray arr = TableDao.getTableData(constant.XMGL_TN_YXSUPPORT, start, limit);
		obj.put("data", arr);
		return obj.toString();
	}

	@RequestMapping(value = "getDataList_nbsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getNbDataList(@RequestParam("start") String start, @RequestParam("limit") String limit) {

		JSONObject obj = new JSONObject();
		int count = TableDao.getTableCount(constant.XMGL_TN_NBSUPPORT);
		obj.put("total", count);
		JSONArray arr = TableDao.getTableData(constant.XMGL_TN_NBSUPPORT, start, limit);
		obj.put("data", arr);
		return obj.toString();
	}

	@RequestMapping(value = "getDataListByTime_ywsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getDataListByTimeYwSupport(@RequestParam("start") String start, @RequestParam("limit") String limit,
			@RequestParam("startTime") String startTime, @RequestParam("endTime") String endTime) {

		JSONObject obj = new JSONObject();
		String searchColumn = "工单创建时间";
		Map<String, Object> map = TableDao.getTableDataByTime(constant.XMGL_TN_YWSUPPORT, start, limit, searchColumn,
				startTime, endTime);
		int count = (int) map.get("count");
		JSONArray arr = (JSONArray) map.get("data");
		obj.put("data", arr);

		return obj.toString();
	}

	@RequestMapping(value = "getDataListByTime_ltsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getDataListByTimeLtSupport(@RequestParam("start") String start, @RequestParam("limit") String limit,
			@RequestParam("startTime") String startTime, @RequestParam("endTime") String endTime) {

		JSONObject obj = new JSONObject();
		String searchColumn = "发帖时间";
		Map<String, Object> map = TableDao.getTableDataByTime(constant.XMGL_TN_LTSUPPORT, start, limit, searchColumn,
				startTime, endTime);
		int count = (int) map.get("count");
		JSONArray arr = (JSONArray) map.get("data");
		obj.put("data", arr);

		return obj.toString();
	}

	@RequestMapping(value = "getDataListByTime_yxsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getDataListByTimeYxSupport(@RequestParam("start") String start, @RequestParam("limit") String limit,
			@RequestParam("startTime") String startTime, @RequestParam("endTime") String endTime) {

		JSONObject obj = new JSONObject();
		String searchColumn = "发件时间";
		Map<String, Object> map = TableDao.getTableDataByTime(constant.XMGL_TN_YXSUPPORT, start, limit, searchColumn,
				startTime, endTime);
		int count = (int) map.get("count");
		JSONArray arr = (JSONArray) map.get("data");
		obj.put("data", arr);

		return obj.toString();
	}

	@RequestMapping(value = "getDataListByTime_nbsupport", method = { RequestMethod.POST, RequestMethod.GET })
	public String getDataListByTimeNbSupport(@RequestParam("start") String start, @RequestParam("limit") String limit,
			@RequestParam("startTime") String startTime, @RequestParam("endTime") String endTime) {

		JSONObject obj = new JSONObject();
		String searchColumn = "接入时间";
		Map<String, Object> map = TableDao.getTableDataByTime(constant.XMGL_TN_NBSUPPORT, start, limit, searchColumn,
				startTime, endTime);
		int count = (int) map.get("count");
		JSONArray arr = (JSONArray) map.get("data");
		obj.put("data", arr);

		return obj.toString();
	}

	@RequestMapping(value = "addYwSupport", method = { RequestMethod.POST, RequestMethod.GET })
	public boolean addYwSupport(@RequestParam("data") String data) {

		JSONObject obj = JSONObject.fromObject(data);

		YwSupport ywsupport = new YwSupport();
		//ywsupport.setId(obj.get("id").toString());
		ywsupport.setProjectname(obj.get("projectname").toString());
		ywsupport.setSupportedition(obj.get("supportedition").toString());
		ywsupport.setEdition(obj.get("edition").toString());
		ywsupport.setEnvironment(obj.get("environment").toString());
		ywsupport.setStatus(obj.get("status").toString());
		ywsupport.setName(obj.get("name").toString());
		ywsupport.setPhone(obj.get("phone").toString());
		ywsupport.setLevel(obj.get("level").toString());
		ywsupport.setDescribe(obj.get("describe").toString());
		ywsupport.setSketch(obj.get("sketch").toString());
		ywsupport.setOperator(obj.get("operator").toString());
		ywsupport.setResult(obj.get("result").toString());
		ywsupport.setCreateTime(obj.get("createTime").toString());
		ywsupport.setResponseTime(obj.get("responseTime").toString());
		ywsupport.setCloseTime(obj.get("closeTime").toString());
		return SupportDao.addYwSupport(ywsupport, constant.XMGL_TN_YWSUPPORT, constant.XMGL_YWCOLUMNLIST);
	}

	@RequestMapping(value = "addLtSupport", method = { RequestMethod.POST, RequestMethod.GET })
	public boolean addLtSupport(@RequestParam("data") String data) {

		JSONObject obj = JSONObject.fromObject(data);

		LtSupport ltsupport = new LtSupport();
		ltsupport.setTitle(obj.get("title").toString());
		ltsupport.setAuthor(obj.get("author").toString());
		ltsupport.setProDescrible(obj.get("proDescrible").toString());
		ltsupport.setOperator(obj.get("operator").toString());
		ltsupport.setResult(obj.get("result").toString());
		ltsupport.setStartTime(obj.get("startTime").toString());
		ltsupport.setFirstResponseTime(obj.get("firstResponseTime").toString());
		ltsupport.setLastResponseTime(obj.get("lastResponseTime").toString());

		return SupportDao.addLtSupport(ltsupport, constant.XMGL_TN_LTSUPPORT, constant.XMGL_LTCOLUMNLIST);
	}

	@RequestMapping(value = "addYxSupport", method = { RequestMethod.POST, RequestMethod.GET })
	public boolean addYxSupport(@RequestParam("data") String data) {

		JSONObject obj = JSONObject.fromObject(data);

		YxSupport yxsupport = new YxSupport();
		yxsupport.setTheme(obj.get("theme").toString());
		yxsupport.setName(obj.get("name").toString());
		yxsupport.setProDescrible(obj.get("proDescrible").toString());
		yxsupport.setOperator(obj.get("operator").toString());
		yxsupport.setResult(obj.get("result").toString());
		yxsupport.setStartTime(obj.get("startTime").toString());
		yxsupport.setFirstResponseTime(obj.get("startTime").toString());
		yxsupport.setLastResponseTime(obj.get("lastResponseTime").toString());

		return SupportDao.addYxSupport(yxsupport, constant.XMGL_TN_YXSUPPORT, constant.XMGL_YXCOLUMNLIST);
	}

	@RequestMapping(value = "addNbSupport", method = { RequestMethod.POST, RequestMethod.GET })
	public boolean addNbSupport(@RequestParam("data") String data) {

		JSONObject obj = JSONObject.fromObject(data);

		NbSupport nbsupport = new NbSupport();
		nbsupport.setEdition(obj.get("edition").toString());
		nbsupport.setName(obj.get("name").toString());
		nbsupport.setEnvironment(obj.get("environment").toString());
		nbsupport.setDescribe(obj.get("describe").toString());
		nbsupport.setSketch(obj.get("sketch").toString());
		nbsupport.setOperator(obj.get("operator").toString());
		nbsupport.setResult(obj.get("result").toString());
		nbsupport.setStartTime(obj.get("startTime").toString());
		nbsupport.setEndTime(obj.get("endTime").toString());

		return SupportDao.addNbSupport(nbsupport, constant.XMGL_TN_NBSUPPORT, constant.XMGL_NBCOLUMNLIST);
	}
	
	@RequestMapping(value = "editYwSupport", method = {RequestMethod.GET,RequestMethod.POST})
	public boolean editYwsupport(@RequestParam("data") String data){
		JSONObject obj = JSONObject.fromObject(data);
		YwSupport ywsupport = new YwSupport();
		ywsupport.setId(obj.get("id").toString());
		ywsupport.setProjectname(obj.get("projectname").toString());
		ywsupport.setSupportedition(obj.get("supportedition").toString());
		ywsupport.setEdition(obj.get("edition").toString());
		ywsupport.setEnvironment(obj.get("environment").toString());
		ywsupport.setStatus(obj.get("status").toString());
		ywsupport.setName(obj.get("name").toString());
		ywsupport.setPhone(obj.get("phone").toString());
		ywsupport.setLevel(obj.get("level").toString());
		ywsupport.setDescribe(obj.get("describe").toString());
		ywsupport.setSketch(obj.get("sketch").toString());
		ywsupport.setOperator(obj.get("operator").toString());
		ywsupport.setResult(obj.get("result").toString());
		ywsupport.setCreateTime(obj.get("createTime").toString());
		ywsupport.setResponseTime(obj.get("responseTime").toString());
		ywsupport.setCloseTime(obj.get("closeTime").toString());
		return SupportDao.editYwSupport(ywsupport, constant.XMGL_TN_YWSUPPORT, constant.XMGL_YWCOLUMNLIST);
	}
	
	@RequestMapping(value = "deleteywsupport", method = RequestMethod.GET)
	public boolean deleteywsupport(@RequestParam("易维会话ID") String 易维会话ID) {
		boolean b = SupportDao.deleteywsupport(易维会话ID);
		return b;
	}
	
	
	@RequestMapping(value = "editYxSupport", method = {RequestMethod.GET,RequestMethod.POST})
	public boolean editYxsupport(@RequestParam("data") String data){
		JSONObject obj = JSONObject.fromObject(data);
		YxSupport yxsupport = new YxSupport();
		yxsupport.setId(obj.get("id").toString());
		yxsupport.setTheme(obj.get("theme").toString());
		yxsupport.setName(obj.get("name").toString());
		yxsupport.setProDescrible(obj.get("proDescrible").toString());
		yxsupport.setOperator(obj.get("operator").toString());
		yxsupport.setResult(obj.get("result").toString());
		yxsupport.setStartTime(obj.get("startTime").toString());
		yxsupport.setFirstResponseTime(obj.get("startTime").toString());
		yxsupport.setLastResponseTime(obj.get("lastResponseTime").toString());
		return SupportDao.editYxSupport(yxsupport, constant.XMGL_TN_YXSUPPORT, constant.XMGL_YXCOLUMNLIST);
		
	}
	
	@RequestMapping(value = "deleteyxsupport", method = RequestMethod.GET)
	public boolean deleteyxsupport(@RequestParam("邮箱项目id") String 邮箱项目id) {
		boolean b = SupportDao.deleteyxsupport(邮箱项目id);
		return b;
	}
	
	
	@RequestMapping(value = "editLtSupport", method = {RequestMethod.GET,RequestMethod.POST})
	public boolean editLtsupport(@RequestParam("data") String data){

		JSONObject obj = JSONObject.fromObject(data);
		LtSupport ltsupport = new LtSupport();
		ltsupport.setId(obj.get("id").toString());
		ltsupport.setTitle(obj.get("title").toString());
		ltsupport.setAuthor(obj.get("author").toString());
		ltsupport.setProDescrible(obj.get("proDescrible").toString());
		ltsupport.setOperator(obj.get("operator").toString());
		ltsupport.setResult(obj.get("result").toString());
		ltsupport.setStartTime(obj.get("startTime").toString());
		ltsupport.setFirstResponseTime(obj.get("firstResponseTime").toString());
		ltsupport.setLastResponseTime(obj.get("lastResponseTime").toString());
		return SupportDao.editLtSupport(ltsupport, constant.XMGL_TN_LTSUPPORT, constant.XMGL_LTCOLUMNLIST);
		
	}
	
	@RequestMapping(value = "deleteltsupport", method = RequestMethod.GET)
	public boolean deleteltsupport(@RequestParam("论坛项目id") String 论坛项目id) {
		boolean b = SupportDao.deleteltsupport(论坛项目id);
		return b;
	}

	@RequestMapping(value = "editNbSupport", method = {RequestMethod.GET,RequestMethod.POST})
	public boolean editNbsupport(@RequestParam("data") String data){

		JSONObject obj = JSONObject.fromObject(data);

		NbSupport nbsupport = new NbSupport();
		nbsupport.setId(obj.get("id").toString());
		nbsupport.setEdition(obj.get("edition").toString());
		nbsupport.setName(obj.get("name").toString());
		nbsupport.setEnvironment(obj.get("environment").toString());
		nbsupport.setDescribe(obj.get("describe").toString());
		nbsupport.setSketch(obj.get("sketch").toString());
		nbsupport.setOperator(obj.get("operator").toString());
		nbsupport.setResult(obj.get("result").toString());
		nbsupport.setStartTime(obj.get("startTime").toString());
		nbsupport.setEndTime(obj.get("endTime").toString());

		return SupportDao.editNbSupport(nbsupport, constant.XMGL_TN_NBSUPPORT, constant.XMGL_NBCOLUMNLIST);
		
	}
	
	@RequestMapping(value = "deletenbsupport", method = RequestMethod.GET)
	public boolean deletenbsupport(@RequestParam("内部项目id") String 内部项目id) {
		boolean b = SupportDao.deleteNbsupport(内部项目id);
		return b;
	}
	
	@RequestMapping(value = "exportYwExcel", method = { RequestMethod.POST, RequestMethod.GET })
	public String exportYwExcel(@RequestParam("startTime") String startTime, @RequestParam("endTime") String endTime,
			HttpServletRequest request, HttpServletResponse response) {
		String searchColumn = "工单创建时间";
		response.setContentType("application/octet-stream;charset=utf-8");
		try {
			ServletOutputStream out = response.getOutputStream();
			String fileName = new String(
					constant.XMGL_TN_YWSUPPORT + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
			response.setHeader("Content-Disposition",
					"attachment;filename=" + new String(fileName.getBytes(), "iso-8859-1") + ".xls");
			exportExcel(searchColumn, constant.XMGL_TN_YWSUPPORT, constant.XMGL_YWCOLUMNLIST, startTime, endTime, out);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "导出信息失败";
		}
	}

	@RequestMapping(value = "exportLtExcel", method = { RequestMethod.POST, RequestMethod.GET })
	public String exportLtExcel(@RequestParam("startTime") String startTime, @RequestParam("endTime") String endTime,
			HttpServletRequest request, HttpServletResponse response) {
		String searchColumn = "发帖时间";
		response.setContentType("application/octet-stream;charset=utf-8");
		try {
			ServletOutputStream out = response.getOutputStream();
			String fileName = new String(
					constant.XMGL_TN_LTSUPPORT + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
			response.setHeader("Content-Disposition",
					"attachment;filename=" + new String(fileName.getBytes(), "iso-8859-1") + ".xls");
			exportExcel(searchColumn, constant.XMGL_TN_LTSUPPORT, constant.XMGL_LTCOLUMNLIST, startTime, endTime, out);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "导出信息失败";
		}
	}

	@RequestMapping(value = "exportYxExcel", method = { RequestMethod.POST, RequestMethod.GET })
	public String exportYxExcel(@RequestParam("startTime") String startTime, @RequestParam("endTime") String endTime,
			HttpServletRequest request, HttpServletResponse response) {
		String searchColumn = "发件时间";
		response.setContentType("application/octet-stream;charset=utf-8");
		try {
			ServletOutputStream out = response.getOutputStream();
			String fileName = new String(
					constant.XMGL_TN_YXSUPPORT + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
			response.setHeader("Content-Disposition",
					"attachment;filename=" + new String(fileName.getBytes(), "iso-8859-1") + ".xls");
			exportExcel(searchColumn, constant.XMGL_TN_YXSUPPORT, constant.XMGL_YXCOLUMNLIST, startTime, endTime, out);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "导出信息失败";
		}
	}

	@RequestMapping(value = "exportNbExcel", method = { RequestMethod.POST, RequestMethod.GET })
	public String exportNbExcel(@RequestParam("startTime") String startTime, @RequestParam("endTime") String endTime,
			HttpServletRequest request, HttpServletResponse response) {
		String searchColumn = "接入时间";
		response.setContentType("application/octet-stream;charset=utf-8");
		try {
			ServletOutputStream out = response.getOutputStream();
			String fileName = new String(
					constant.XMGL_TN_NBSUPPORT + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
			response.setHeader("Content-Disposition",
					"attachment;filename=" + new String(fileName.getBytes(), "iso-8859-1") + ".xls");
			exportExcel(searchColumn, constant.XMGL_TN_NBSUPPORT, constant.XMGL_NBCOLUMNLIST, startTime, endTime, out);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "导出信息失败";
		}
	}

	public void exportExcel(String searchColumn, String tablename, String columnlist, String startTime, String endTime,
			ServletOutputStream out) {
		List<HashMap<String, String>> list = SupportDao.exportSeachDataToExcel(tablename, searchColumn, startTime,
				endTime);
		String[] column = columnlist.split(",");
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet();
		HSSFRow row = sheet.createRow((int) 0);

		HSSFCellStyle style = wb.createCellStyle();
		style.setAlignment(HorizontalAlignment.CENTER);
		HSSFCell cell = null;
		for (int i = 0; i < column.length; i++) {
			cell = row.createCell((short) i);
			cell.setCellValue(column[i]);
			cell.setCellStyle(style);
		}

		for (int i = 0; i < list.size(); i++) {
			row = sheet.createRow((int) i + 1);
			for (int j = 0; j < column.length; j++) {
				row.createCell((short) j).setCellValue(list.get(i).get(column[j]));
			}
		}
		try {
			wb.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

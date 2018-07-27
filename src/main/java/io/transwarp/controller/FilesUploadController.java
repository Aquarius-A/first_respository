package io.transwarp.controller;

import io.transwarp.service.FilesUploadService;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
public class FilesUploadController {
	@ResponseBody
	@RequestMapping(value = "uploadFolder", method = RequestMethod.POST)
	public void uploadFileFolder(HttpServletRequest request, HttpServletResponse response) {
		MultipartHttpServletRequest params = ((MultipartHttpServletRequest) request);
		List<MultipartFile> files = params.getFiles("files");
		response.setContentType("text/html");
		if (FilesUploadService.upload(files).equals("ok")) {
			try {
				PrintWriter out = response.getWriter();
				out.write("{success:true}");
				out.flush();
				out.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	}

}

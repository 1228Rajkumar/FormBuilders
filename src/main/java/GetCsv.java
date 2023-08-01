

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.json.JSONException;
import org.json.JSONObject;

import au.com.bytecode.opencsv.CSVReader;

@WebServlet("/GetCsv")
@MultipartConfig(
	fileSizeThreshold = 1024 * 1024 * 10,
	maxFileSize = 1024 * 1024 * 100,
	maxRequestSize = 1024 * 1024 * 100
)
public class GetCsv extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Part filePart=request.getPart("csvFile");
		String user = request.getParameter("user");
		String form = request.getParameter("formName");
		String filename=filePart.getSubmittedFileName();
		File outputFolder = new File(System.getProperty("user.dir")+"/csv/");
		outputFolder.mkdir();
		
		File outputFile = new File(System.getProperty("user.dir")+"/csv/"+user+"#"+form+".csv");
		outputFile.createNewFile();
		filePart.write(System.getProperty("user.dir")+"/csv/"+user+"#"+form+".csv");
		FileReader reader = new FileReader(outputFile);
		CSVReader csvReader = new CSVReader(reader);
		String[] headings = csvReader.readNext();
		JSONObject json = new JSONObject();
		String[] nextLine;
		ArrayList submissions = new ArrayList<>();
		try {
			json.put("headings", headings);
			while ((nextLine = csvReader.readNext()) != null) {
				submissions.add(nextLine);
			}
			json.put("submissions", submissions.toArray());
		} catch (JSONException e) {
			e.printStackTrace();
		}
		outputFile.delete();
		response.getWriter().println(json);
	}
}

package subwayapi;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;



public class main {
	public main() throws Exception {

		JSONParser jsonparser = new JSONParser();
		JSONObject jsonobject = (JSONObject) jsonparser.parse(readUrl());
		JSONObject json = (JSONObject) jsonobject.get("SearchSTNBySubwayLineInfo");
		JSONArray array = (JSONArray) json.get("row");

		for (int i = 0; i < array.size(); i++) {
			JSONObject entity = (JSONObject) array.get(i);

			String code = (String) entity.get("STATION_CD");
			String name = (String) entity.get("STATION_NM");
			String nameEng = (String) entity.get("STATION_NM_ENG");
			String line = (String) entity.get("LINE_NUM");
			String codeFr = (String) entity.get("FR_CODE");

			subwaydb t = new subwaydb();
			t.tableInsert(code,name,nameEng,line,codeFr);
			//t.tableSelect();
		}

	}

	private static String readUrl() throws Exception {
		// BufferedInputStream reader = null;
		BufferedReader reader = null;
		try {
			URL url = new URL("http://openapi.seoul.go.kr:8088/4877546f78646c643639504d4e7641/json/SearchSTNBySubwayLineInfo"
					+ "/1/5/%20/%20/3호선");

			reader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			StringBuffer buffer = new StringBuffer();

			String str;

			while ((str = reader.readLine()) != null) {
				buffer.append(str);
			}

			return buffer.toString();
		} finally {
			if (reader != null)
				reader.close();
		}
	}

	public static void main(String[] args) {
		try {
			new main();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

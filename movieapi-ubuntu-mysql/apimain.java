package apitest;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class apimain {
	public apimain() throws Exception {

		JSONParser jsonparser = new JSONParser();
		JSONObject jsonobject = (JSONObject) jsonparser.parse(readUrl());
		JSONObject json = (JSONObject) jsonobject.get("boxOfficeResult");
		JSONArray array = (JSONArray) json.get("dailyBoxOfficeList");

		for (int i = 0; i < array.size(); i++) {
			JSONObject entity = (JSONObject) array.get(i);
			String movieNm = (String) entity.get("movieNm");
			apidb t = new apidb();
			t.tableInsert(i, movieNm);
			//t.tableSelect();
		}

	}

	private static String readUrl() throws Exception {
		// BufferedInputStream reader = null;
		BufferedReader reader = null;
		try {
			URL url = new URL("http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/"
					+ "searchDailyBoxOfficeList.json" + "?key=1e959d896249bfd7a571de04819b0d29" + "&targetDt=20150101");
			// reader = new BufferedInputStream(url.openStream());

			reader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			StringBuffer buffer = new StringBuffer();

			// int i;
			// byte[] b = new byte[4096];
			// while( (i = reader.read(b)) != -1){
			// buffer.append(new String(b, 0, i));
			// }
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
			new apimain();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

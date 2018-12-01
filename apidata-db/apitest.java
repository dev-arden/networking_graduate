import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.HttpURLConnection;


public class apitest {
    public static void main(String[] args) {
    	BufferedReader br = null;
        try {
            URL url = new URL(
                    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/"
                    + "searchDailyBoxOfficeList.json"
                    + "?key=1e959d896249bfd7a571de04819b0d29"
                    + "&targetDt=20150101");
            HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();
            urlconnection.setRequestMethod("GET");
            br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream(), "UTF-8"));
            String result = "";
            String line;
            while((line = br.readLine())!=null) {
            	result = result + line + "\n";
            }
            System.out.println(result);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}

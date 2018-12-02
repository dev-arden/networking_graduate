package subwayapi;

public class subwaydbname {

	String cd;
	String name;
	String name_eng;
	String line;
	String frcd;

	public subwaydbname() {
	}

	public subwaydbname(String cd, String name, String name_eng, String line, String frcd) {
		super();
		this.cd = cd;
		this.name = name;
		this.name_eng = name_eng;
		this.line = line;
		this.frcd = frcd;
	}

	public String getCd() {
		return cd;
	}

	public void setCd(String cd) {
		this.cd = cd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName_eng() {
		return name_eng;
	}

	public void setName_eng(String name_eng) {
		this.name_eng = name_eng;
	}

	public String getLine() {
		return line;
	}

	public void setLine(String line) {
		this.line = line;
	}

	public String getFrcd() {
		return frcd;
	}

	public void setFrcd(String frcd) {
		this.frcd = frcd;
	}
}

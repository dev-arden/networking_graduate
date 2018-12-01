package dbtest;
public class TableName {
	  /*데이터베이스에 속성부분을 변수로 만들어 줍니다.*/
	  int no;
	  String name;

	  /*생성자입니다.*/
	  public TableName() {}

	  public TableName(int no, String name) {
	    super();
	    this.no = no;
	    this.name = name;
	  }

	  /*각 변수에 getter와 setter입니다.*/
	  public int getNo() {
	    return no;
	  }
	  public void setNo(int no) {
	    this.no = no;
	  }
	  public String getName() {
	    return name;
	  }
	  public void setName(String name) {
	    this.name = name;
	  }
	}

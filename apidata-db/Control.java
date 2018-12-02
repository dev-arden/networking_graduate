

public class Control {
	  public static void main(String[] args) {
	    TableNameDAO t = new TableNameDAO(); //DAO를 통해 접속을 확인합니다.
	    t.tableInsert(1, "kim"); //만들어진 table에 데이터를 넣습니다.
	    t.tableInsert(2, "park");
	    t.tableInsert(3, "jung");
	    t.tableInsert(4, "eun");
	    t.tableInsert(5, "yee");
	    t.tableSelect(); //table내 모든 데이터를 출력합니다.
	  }
}

//커밋행함

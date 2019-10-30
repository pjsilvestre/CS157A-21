<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.DriverManager"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<html>
<head>
<title>whatdoiwear.today</title>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
	crossorigin="anonymous">
</head>

<body>
	<%!
    public void establishDatabaseConnection() throws Exception
    {
        Class.forName("com.mysql.jdbc.Driver");

        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/whatdoiwear_today?serverTimezone=America/Los_Angeles",
                        "root", "password");
    }
	
	// Prints the tables of the designated database
	// NOTE: the table names are modeled directly after the design docs
	public void printTables() {
		// Establish DB Connection
		Class.forName("com.mysql.jdbc.Driver");
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/whatdoiwear_today?serverTimezone=America/Los_Angeles",
                        "root", "password");
        out.println("Database successfully opened.<br/>");
        
        // Now we print the tables using SQL queries
        // NOTE: Because the attributes defined in our tables may be stored in different orders:
        // EX: User(ID, password) VS User(password, ID)
        // There may be conflicting output from one local machine to another. Solution is to ensure our databases
        // are all identical.
        try 
        {
        	// Declare query variables
            Statement stmt; 
            ResultSet result;
            
			// Print User table
			stmt = connection.createStatement();
			result = stmt.executeQuery("SELECT * FROM User");
			while (result.next()) {
				String userName = result.getString(1);
				String userPass = result.getString(2);
				out.println(userName + " " + userPass + "<br/><br/>"};
		
			// Print Closet table
			stmt = connection.createStatement();
			result = stmt.executeQuery("SELECT * FROM Closet");
			while (result.next()) {
				int closetID = result.getInt(1);
				String closetLocation = result.getString(2);
				out.println(closetID + " " + closetLocation + "<br/><br/>"};
		
			// Print Outfit table
			stmt = connection.createStatement();
			result = stmt.executeQuery("SELECT * FROM Outfit");
			while (result.next()) {
				String outfitName = result.getString(1);
				String outfitSeason = result.getString(2);
				out.println(outfitName + " " + outfitSeason + "<br/><br/>")
			}
		
			// Print Attire table
			
			
			// Print Contains(User, Closet) table
			
			
			// Print Contains(Outfit, Closet) table
			
			
			// Print Contains(Attire, Closet) table
			
			
			// Print isComposedOf(Outfit, Attire) table
			
			
        }
        catch(SQLException e) 
        {
    		out.println("<br/>SQL Error caught: " + e.getMessage());
    	}
		
	}
%>

	<%
    try
    {
       establishDatabaseConnection();
       printTables();
    }
    catch (Exception e)
    {
       out.println(e);
    }
%>


	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
		integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
		crossorigin="anonymous"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
		crossorigin="anonymous"></script>
	<script
		src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
		crossorigin="anonymous"></script>
</body>
</html>
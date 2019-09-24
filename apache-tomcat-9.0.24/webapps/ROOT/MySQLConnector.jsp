<%@ page import="java.sql.*" %>

<html>
<head>
    <title>
        JDBC Connection Test
    </title>
</head>
<body>
<%
try
      {
         Class.forName("com.mysql.jdbc.Driver");

         Connection connection = DriverManager
               .getConnection("jdbc:mysql://localhost:3306/clothes?serverTimezone=America/Los_Angeles", "root", "password");

         Statement statement = connection.createStatement();
         ResultSet resultSet = statement.executeQuery("SELECT * from shirts");

         int id = -1;
         String brand = "";
         String size = "";

         while (resultSet.next())
         {
            id = resultSet.getInt(1);
            brand = resultSet.getString(2);
            size = resultSet.getString(3);

            out.println(id + " " + brand + " " + size);
         }

         resultSet.close();
         statement.close();
         connection.close();
      }
      catch (Exception e)
      {
         out.println(e);
      }
%>
</body>
</html>
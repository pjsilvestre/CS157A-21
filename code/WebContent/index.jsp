<%--
  Created by IntelliJ IDEA.
  User: patricksilvestre
  Date: 9/14/19
  Time: 7:07 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.Statement" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>JDBC Demo</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
<table class="table table-dark">
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Brand</th>
        <th scope="col">Size</th>
    </tr>
    </thead>
    <tbody>
    <%
        try
        {
            Class.forName("com.mysql.jdbc.Driver");

            Connection connection = DriverManager
                    .getConnection("jdbc:mysql://localhost:3306/clothes?serverTimezone=America/Los_Angeles", "root",
                            "password");

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

                out.println("<tr>");
                out.println("<th scope=\"col\">" + id + "</th>");
                out.println("<td>" + brand + "</td>");
                out.println("<td>" + size + "</td>");
                out.println("</tr>");
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
    </tbody>
</table>


<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
</body>
</html>
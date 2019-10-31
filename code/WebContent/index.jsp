<%@ page import="java.sql.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

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
    /**
     * Gets a connection to the database.
     * @return A connection to the database.
     * @throws Exception
     */
    public Connection establishDatabaseConnection() throws Exception
    {
        Class.forName("com.mysql.cj.jdbc.Driver");

        return (DriverManager
                .getConnection("jdbc:mysql://localhost:3306/whatdoiwear_today?serverTimezone=America/Los_Angeles",
                        "root", "password"));
    }

    /**
     * Checks whether a user with a given username and password exists within the database.
     * @param connection The connection to the database.
     * @param username The username of the user.
     * @param password The password of the user.
     * @return True if the user exists within the database, false otherwise.
     * @throws Exception
     */
    public boolean isUser(Connection connection, String username, String password) throws Exception
    {
        boolean isUser = false;

        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(
                "SELECT * FROM User WHERE username = '" + username + "'AND password = '" + password + "'");

        if (resultSet.next())
        {
            isUser = true;
        }

        statement.close();
        resultSet.close();

        return isUser;
    }

    /**
     * Gets a table from the database.
     * @param connection A connection to the database.
     * @param tableName The name of the table.
     * @return A table from the database in HTML.
     * @throws Exception
     */
    public String getTable(Connection connection, String tableName) throws Exception
    {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT * FROM " + tableName);
        ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
        int numberOfColumns = resultSetMetaData.getColumnCount();

        String table = "";

        //Add column headers
        table = "<table class='table table-dark'>" + "<thead>" + "<tr>";

        for (int i = 1; i <= numberOfColumns; i++)
        {
            table += "<th scope = 'col'>" + resultSetMetaData.getColumnName(i) + "</th>";
        }
        table += "</thead>" + "<tbody>";

        while (resultSet.next())
        {
            //Add row values
            table += "<tr>";

            for (int i = 1; i <= numberOfColumns; i++)
            {
                table += "<td>" + resultSet.getString(i) + "</td>";
            }

            table += "</tr>";
        }

        table += "</tbody>" + "</table>";

        statement.close();
        resultSet.close();

        return table;
    }


%>

<%
    try (Connection connection = establishDatabaseConnection())
    {
    }
    catch (SQLException e)
    {
        System.err.println("SQL Error caught: " + e.getMessage());
    }
    catch (Exception e)
    {
        System.err.println(e.getMessage());
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
# whatdoiwear.today - Three-Tier Architecture Demo Notes

* Install [Eclipse IDE for Enterprise Java Developers](https://www.eclipse.org/downloads/packages/release/2019-09/r/eclipse-ide-enterprise-java-developers)

* Clone the repo

* Create a MySQL database (Note: the following database is specifically intended for use with `index.jsp` as seen [in this commit](https://github.com/pjsilvestre/CS157A-21/commit/6c0ed95a3492a59da564bcc6c7bd3e77647b9bae).)
  * Use the following credentials: user `root`, password `password`
  * Add a table `shirts` with schema `id INT(11), brand VARCHAR(256), size CHAR(1)`
  * Add dummy records as desired

* Open Eclipse

* Add the project to your workspace
  * Choose `File > Open Projects from File System...`
  * Using the `Directory...` option, navigate to where you cloned the repo, and choose the `code` directory
  * Choose `Finish`

* Start your MySQL server

* Run the project
  * In your Project Explorer, right-click on the project, then choose `Run As... > Run on Server`
  * If you do not already have Apache Tomcat v9.0, choose `Manually define a new server`
    * Select the server type `Apache Tomcat v9.0 Server`
    * Use the binary distribution of Tomcat as provided in the repo
  * Otherwise, choose `Choose an existing server` and choose your Tomcat server
  
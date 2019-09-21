# whatdoiwear.today - Project Requirements
## Team 21
* [Devin Gonzales](https://github.com/DJGonzales96)
* [Claire Lin](https://github.com/clairelin23)
* [Patrick Silvestre](https://github.com/pjsilvestre)

## Project Description in Detail
### Goal
The goal of this project is to facilitate a user-friendly application capable of providing users with a convenient way to collect, organize and share various articles of clothing in an ever growing market of apparel. Users will be presented with reccommended outfits based on their current clothing selection and supplied with sufficient collection, sorting and searching options in their wardrobe as well as a comfortable GUI to aid user ineraction.

### Motivation
This project was inspired by an absence in similar applications among the industry. Music, TV, and literature are all examples of domains with limitless streaming, collection and sharing capabilities. The fashion industry is a comparably large source of income expendature among multiple demographics with very limited technical representation. This application seeks to bring similar functionality of other social media or streaming services by allowing users to share and collect their favorite clothing items and brands in an adaptable, easy to follow format.

### Stakeholders


### Application Domain
This application will be based in the fashion and clothing domain. 

### User Benefits


## System Environment in Detail
### Structure
![Three-tier architecture diagram](./images/three-tier-architecture.png)

### Hardware/Software
* Development Operating Systems
  * macOS Mojave
  * Windows 10
* IDEs
  * Eclipse
  * IntelliJ IDEA

### RDBMS
* MySQL 8.0.17

### Web Server
* Apache Tomcat

### Application Languages / Interfaces
* Java
* Java Database Connectivity (JDBC)
* XML / JSON
* HTML
* CSS
* JavaScript


## Functional Requirements in Detail
### Account Creation and Login


### Requesting Pieces
* Users will be able to search for a piece of clothing via search box by inputting descriptors such as item name and brand. Additionally, users will be able to narrow their search through additional characteristic checkboxes, such as gender, size, and material.
* The application will present a list of clothing pieces that are the closest match for the given search paramter. In the event no clothing articles match the given search parameters, the user will be notified no pieces could be found.

### Adding Pieces
* Users will be able to add a piece of clothing to their collection through an on-screen prompt.
* The application will store this piece of clothing and all relevant information in the users wardrobe collection.

### Viewing the Closet
* Users will be able to view their collected clothing articles in a list format. Additionally, users will be able to sort their wardrobe via various clothing characteristics. 
* The application will retrieve all aggregated clothing articles in a user's saved collection and display them for view in a separate page. 

### Updating Pieces


### Removing Pieces


## Non-Functional Issues in Detail
### Graphical User Interface


### Security


### Access Control


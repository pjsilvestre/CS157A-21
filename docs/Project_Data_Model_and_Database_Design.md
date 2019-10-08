# whatdoiwear.today - Project Data Model and Database Design

## Entity / Relationship Diagram

## Entity Set Descriptions

### User

The User entity set has two attributes: username and password. The key of a User is the username. The User entity set consists of users of the application and their login information.

### Closet

The Closet is a weak entity set that has no attributes. The key of a Closet is the username of the User. The Closet entity set consists of a collection of clothing pieces the users save as outfits (multiple clothing pieces) or as attire (individual clothing pieces).

### Outfit

The Outfit entity set has one attribute: name. The key of an Outfit is the name. The Outfit entity set consists of clothing pieces that the users save as outfits.

### Attire

The Attire entity set has five attributes: ID, type, brand, color, and size. The key of an Attire is the ID. The Attire entity set consists of all the individual clothing pieces the users save.

## Relationship Descriptions

# whatdoiwear.today - Project Data Model and Database Design Revision

## Entity / Relationship Diagram

![ER Diagram](./images/database_design_2.0.png)

## Entity Set Descriptions

### User

User is an entity set with two attributes: a unique username and password. They key of User is the username attribute. The User entity set represents users of the application and their login information.

### Closet

Closet is an entity set corresponding to a User's physical closet. The key of a Closet is the ID attribute. The Closet entity set consists of a collection of clothing the users save as outfits (multiple clothing pieces) or as attire (individual clothing pieces).

### Outfit

The Outfit entity set has two attributes: a unique name and a season. The key of an Outfit is the name. The Outfit entity set consists of "mini-collections" of clothing pieces that the users save as outfits.

### Attire

The Attire entity set has five attributes: ID, name, brand, color, and size. The key of an Attire is the ID. The Attire entity set consists of all the individual clothing pieces the users save.

### Category

The Category entity set has one attribute: type. This entity set serves to categorize pieces of Attire into types such as T-shirts, pants, etc.

## Relationship Descriptions TODO

### User "has a" Closet

A User has zero or one Closet(s), but a Closet has exactly one User. A User may exist without a Closet, but a Closet cannot exist without a User. Hence, the User "has a" Closet relationship is supporting, many-one relationship.

### Closet "contains" Outfit(s)

A Closet contains zero or more outfits, whereas an outfit is related to exactly one User's Closet.

### Closet "contains" Attire

A Closet contains zero or more pieces of attire, whereas a piece of attire is related to exactly one User's Closet.

### Outfit "is composed of" Attire

An Outfit is composed of one or more pieces of Attire.

## Database Schema

### Entity Sets

* User (<ins>username</ins>, password)
* Closet (<ins>ID</ins>, location)
* Outfit (<ins>name</ins>, season)
* Attire (<ins>ID</ins>, name, brand, color, size)
* Category (<ins>type</ins>)
* Tag (<ins>name</ins>)

### Relationships

* Owns (username, closetID)
* closetContainsOutfit (closetID, outfitName)
* closetContainsAttire (closetID, attireID)
* IsComposedOf (outfitName, attireID)
* attireHasAType (attireID, type)
* outfitHasATag (outfitName, tagName)

## Tables

### Entity Set Tables

* User
![User](./images/table-screenshots/User.png)
* Closet
![Closet](./images/table-screenshots/Closet.png)
* Outfit
![Outfit](./images/table-screenshots/Outfit.png)
* Attire
![Attire](./images/table-screenshots/Attire.png)
* Category
![Category](./images/table-screenshots/Category.png)
* Tag
![Tag](./images/table-screenshots/Tag.png)

### Relationships Tables

* Owns
![Owns](./images/table-screenshots/Owns.png)
* closetContainsOutfit
![closetContainsOutfit](./images/table-screenshots/closetContainsOutfit.png)
* closetContainsAttire
![closetContainsAttire](./images/table-screenshots/closetContainsAttire.png)
* IsComposedOf
![IsComposedOf](./images/table-screenshots/isComposedOf.png)
* attireHasAType
![attireHasAType](./images/table-screenshots/attireHasAType.png)
* outfitHasATag
![outfitHasATag](./images/table-screenshots/outfitHasATag.png)

-- --------------------------------
-- Initialize Schema
-- --------------------------------

DROP DATABASE IF EXISTS what_do_i_wear_today;
CREATE DATABASE what_do_i_wear_today;
USE what_do_i_wear_today;

-- Entity Sets
-- user
CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(255) UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);

-- closet
CREATE TABLE IF NOT EXISTS closet (
    closet_id INT UNSIGNED,
    location VARCHAR(255) NOT NULL,
    PRIMARY KEY (closet_id)
);

-- outfit
CREATE TABLE IF NOT EXISTS outfit (
    outfit_name VARCHAR(255),
    season ENUM('Winter', 'Spring', 'Summer', 'Fall') NOT NULL,
    tag VARCHAR(255),
    PRIMARY KEY (outfit_name)
);

-- attire
CREATE TABLE IF NOT EXISTS attire (
    attire_id INT UNSIGNED,
    type VARCHAR(255) NOT NULL,
    attire_name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    size VARCHAR(255) NOT NULL,
    PRIMARY KEY (attire_id)
);

-- Relationships
-- A user owns a closet
CREATE TABLE IF NOT EXISTS owns (
    closet_id INT UNSIGNED,
    username VARCHAR(255),
    PRIMARY KEY (closet_id , username)
);

-- A closet contains outfits
CREATE TABLE IF NOT EXISTS closet_contains_outfit (
    closet_id INT UNSIGNED,
    outfit_name VARCHAR(255),
    PRIMARY KEY (closet_id , outfit_name)
);

-- A closet contains attire
CREATE TABLE IF NOT EXISTS closet_contains_attire (
    closet_id INT UNSIGNED,
    attire_id INT UNSIGNED,
    PRIMARY KEY (closet_id , attire_id)
);

-- An outfit is composed of attire
CREATE TABLE IF NOT EXISTS is_composed_of (
    outfit_name VARCHAR(255),
    attire_id INT UNSIGNED,
    PRIMARY KEY (outfit_name , attire_id)
);

-- A user wears an outfit
CREATE TABLE IF NOT EXISTS wears (
    username VARCHAR(255),
    outfit_name VARCHAR(255),
    date DATE,
    PRIMARY KEY (username , outfit_name , date)
);

-- A user is friends with another user
CREATE TABLE IF NOT EXISTS is_friends_with (
    username1 VARCHAR(255),
    username2 VARCHAR(255),
    PRIMARY KEY (username1 , username2)
);


-- --------------------------------
-- Initialize Data
-- --------------------------------

-- Initialize user
INSERT INTO user VALUES 
	('Eviscirator', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('jeanralph90', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('JWS5th', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('Unit1224', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('TamBenched', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('Lazzah', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('andynorm', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('JoeGZZ', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('landerwi', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('NewWinn', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('vexy12', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('PointOfReferences', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('geometrieva', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('Potato559', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C'),
    ('FubsyGamr', '$2b$10$Uf81t8PzkpRwDsaM/GqV2OtaE9MU7cT9GwWV5HaQyWXR2NJ9wOy6C');
    
-- Initialize closet
INSERT INTO closet VALUES
	('676', 'Bedroom'),
    ('711', 'Bedroom'),
    ('141', 'Hallway'),
    ('67', 'Bedroom'),
    ('895', 'Bedroom'),
    ('654', 'Bedroom'),
    ('751', 'Hallway'),
    ('347', 'Hallway'),
    ('804', 'Bedroom'),
    ('221', 'Bedroom'),
    ('792', 'Hallway'),
    ('707', 'Bedroom'),
    ('955', 'Bedroom'),
    ('1010', 'Hallway'),
    ('470', 'Bedroom');
    
-- Initialize outfit
INSERT INTO outfit VALUES
	('Drip', 'Fall', 'Street'),
    ('Fire', 'Spring', 'Street'),
    ('Relax', 'Fall', 'Street'),
    ('Coordinated', 'Winter', 'Street'),
    ('Street', 'Summer', 'Street'),
    ('Fit', 'Fall', NULL),
    ('Casual', 'Winter', NULL),
    ('GOAT', 'Winter', NULL),
    ('Fly', 'Fall', NULL),
    ('Experimental', 'Winter', NULL),
    ('Branching', 'Winter', NULL),
    ('New', 'Fall', NULL),
    ('Perfection', 'Winter', NULL),
    ('Inspo', 'Summer', NULL),
    ('Premium', 'Fall', NULL);

-- Initialize attire    
INSERT INTO attire VALUES
	('197', 'Sneaker', 'LD Waffle Sacai Black', 'Nike', 'Black', '9.5'),
    ('139', 'Sneaker', 'Yeezy Boost 350 V2', 'Adidas', 'Cloud White', '9.5'),
    ('228', 'Sweater', 'Box Logo Crewneck (FW18)', 'Supreme', 'Black', 'M'),
    ('893', 'Sweater', 'Logo Sweatshirt', 'Vetements', 'Navy', 'S'),
    ('13', 'Jacket', 'Torque Jacket', 'Stüssy', 'Brown', 'M'),
    ('122', 'Sneaker', 'Air Presto', 'Off-White', 'Black', '10'),
    ('269', 'Pants', 'Ranger Pants', 'Undercover', 'Grey', 'M'),
    ('527', 'Hat', 'Essentials Triple Triangle Curved Visor Hat', 'HUF', 'Canyon Sunset', 'One Size'),
    ('689', 'T-shirt', 'OBEY Icon Face Heavyweight Classic Box Tee', 'Obey', 'Black', 'Large'),
    ('891', 'Hoodie', 'Kith Convertible Double Pocket Hoodie', 'Kith', 'Soft Black', 'Large'),
    ('876', 'Sweater', 'Undefeated Half Zip Pullover', 'Undefeated', 'Black', 'Medium'),
    ('896', 'T-shirt', 'Black Rhombus Short-Sleeve', 'A-Cold-Wall*', 'Black', 'Medium'),
    ('425', 'Jacket', '1st Camo Light Weight Down Jacket', 'A Bathing Ape', 'Green', 'Large'),
    ('633', 'Jacket', 'Duck Quilted Flannel-Lined Active Jacket', 'Carhartt', 'Gravel', 'Medium'),
    ('520', 'Jeans', 'Palace Jean Black Stonewash', 'Palace', 'Black', '32');
    
-- Initialize owns
INSERT INTO owns VALUES
	('676', 'Eviscirator'),
    ('711', 'jeanralph90'),
    ('141', 'JWS5th'),
    ('67', 'Unit1224'),
    ('895', 'TamBenched'),
    ('654', 'Lazzah'),
    ('751', 'andynorm'),
    ('347', 'JoeGzz'),
    ('804', 'landerwi'),
    ('221', 'NewWinn'),
    ('792', 'vexy12'),
    ('707', 'PointOfReferences'),
    ('955', 'geometrieva'),
    ('1010', 'Potato559'),
    ('470', 'FubsyGamr');
    
-- Initialize closet_contains_outfit
INSERT INTO closet_contains_outfit VALUES
	('676', 'Drip'),
    ('711', 'Fire'),
    ('141', 'Relax'),
    ('67', 'Coordinated'),
    ('895', 'Street'),
    ('654', 'Fit'),
    ('751', 'Casual'),
    ('347', 'GOAT'),
    ('804', 'Fly'),
    ('221', 'Experimental'),
    ('792', 'Branching'),
    ('707', 'New'),
    ('955', 'Perfection'),
    ('1010', 'Inspo'),
    ('470', 'Premium');
    
-- Initialize closet_contains_attire
INSERT INTO closet_contains_attire VALUES
	('676', '197'),
    ('676', '520'),
    ('676', '228'),
    ('711', '139'),
    ('711', '269'),
    ('711', '13'),
    ('141', '122'),
    ('141', '896'),
    ('141', '876'),
    ('67', '197'),
    ('67', '269'),
    ('67', '893'),
    ('895', '122'),
    ('895', '520'),
    ('895', '425');

-- Initialize is_composed_of
INSERT INTO is_composed_of VALUES
	('Drip', '197'),
    ('Drip', '520'),
    ('Drip', '228'),
    ('Fire', '139'),
    ('Fire', '269'),
    ('Fire', '13'),
    ('Relax', '122'),
    ('Relax', '896'),
    ('Relax', '876'),
    ('Coordinated', '197'),
    ('Coordinated', '269'),
    ('Coordinated', '893'),
    ('Street', '122'),
    ('Street', '520'),
    ('Street', '425');

-- Initialize wears
INSERT INTO wears VALUES
	('Eviscirator', 'Drip', '2019-11-01'),
    ('Eviscirator', 'Drip', '2019-11-02'),
    ('Eviscirator', 'Drip', '2019-11-03'),
    ('jeanralph90', 'Fire', '2019-11-01'),
    ('jeanralph90', 'Fire', '2019-11-02'),
    ('jeanralph90', 'Fire', '2019-11-03'),
    ('JWS5th', 'Relax', '2019-11-01'),
    ('JWS5th', 'Relax', '2019-11-02'),
    ('JWS5th', 'Relax', '2019-11-03'),
    ('Unit1224', 'Fire', '2019-11-01'),
    ('Unit1224', 'Fire', '2019-11-02'),
    ('Unit1224', 'Fire', '2019-11-03'),
    ('TamBenched', 'Coordinated', '2019-11-01'),
    ('TamBenched', 'Coordinated', '2019-11-02'),
    ('TamBenched', 'Coordinated', '2019-11-03'),
    ('Lazzah', 'Street', '2019-11-01'),
    ('Lazzah', 'Street', '2019-11-02'),
    ('Lazzah', 'Street', '2019-11-03');

-- Initialize is_friends_with
INSERT INTO is_friends_with VALUES
	('Eviscirator', 'jeanralph90'),
    ('Eviscirator', 'JWS5th'),
    ('Eviscirator', 'Unit1224'),
    ('Eviscirator', 'TamBenched'),
    ('Eviscirator', 'Lazzah'),
    ('Eviscirator', 'andynorm'),
    ('Eviscirator', 'JoeGZZ'),
    ('Eviscirator', 'landerwi'),
    ('Eviscirator', 'NewWinn'),
    ('Eviscirator', 'vexy12'),
    ('Eviscirator', 'PointOfReferences'),
    ('Eviscirator', 'geometrieva'),
    ('Eviscirator', 'Potato559'),
    ('Eviscirator', 'FubsyGamr'),
    ('FubsyGamr', 'JWS5th');
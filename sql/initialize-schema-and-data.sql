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
    closet_id BIGINT UNSIGNED,
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
    attire_id BIGINT UNSIGNED,
    type VARCHAR(255) NOT NULL,
    attire_name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    size VARCHAR(255) NOT NULL,
    PRIMARY KEY (attire_id)
);

-- Relationships
-- owned_by
CREATE TABLE IF NOT EXISTS owned_by (
    closet_id BIGINT UNSIGNED,
    username VARCHAR(255) NOT NULL,
    PRIMARY KEY (closet_id)
);

-- outfit_contained_by_closet
CREATE TABLE IF NOT EXISTS outfit_contained_by_closet (
    outfit_name VARCHAR(255),
    closet_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (outfit_name)
);

-- attire_contained_by_closet
CREATE TABLE IF NOT EXISTS attire_contained_by_closet (
    attire_id BIGINT UNSIGNED,
    closet_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (attire_id)
);

-- is_composed_of
CREATE TABLE IF NOT EXISTS is_composed_of (
    outfit_name VARCHAR(255),
    attire_id BIGINT UNSIGNED,
    PRIMARY KEY (outfit_name , attire_id)
);

-- worn_by
CREATE TABLE IF NOT EXISTS worn_by (
    outfit_name VARCHAR(255),
    date DATE,
    username VARCHAR(255) NOT NULL,
    PRIMARY KEY (outfit_name , date)
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

-- Initialize user (username, hashed_password)
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
    
-- Initialize closet (closet_id, location)
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
    
-- Initialize outfit (outfit_name, season, tag)
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

-- Initialize attire (attire_id, type, attire_name, brand, color, size)
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
    ('520', 'Jeans', 'Palace Jean Black Stonewash', 'Palace', 'Black', '32'),
    ('321', 'Sneaker', 'Air Force 1 Low Travis Scott Cactus Jack', 'Nike', 'Multi-Color', '9.5'),
    ('123', 'Sneaker', 'Jordan 11 Retro Playoffs Bred (2019)', 'Jordan Brand', 'Bred', '10'),
    ('524', 'Pants', 'Sportswear Tech Fleece', 'Nike', 'Black', 'S'),
    ('601', 'Pants', 'Windproof Stretch Slim-Fit Chino Pants', 'Uniqlo', 'Black', '30'),
    ('698', 'Pants', 'Ultra Stretch Skinny Fit Jeans', 'Uniqlo', 'Gray', '31');
    
-- Initialize owned_by (closet_id, username)
INSERT INTO owned_by VALUES
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
    
-- Initialize outfit_contained_by_closet (outfit_name, closet_id)
INSERT INTO outfit_contained_by_closet VALUES
	('Drip', '676'),
    ('Fire', '711'),
    ('Relax', '141'),
    ('Coordinated', '67'),
    ('Street', '895'),
    ('Fit', '654'),
    ('Casual', '751'),
    ('GOAT', '347'),
    ('Fly', '804'),
    ('Experimental', '221'),
    ('Branching', '792'),
    ('New', '707'),
    ('Perfection', '955'),
    ('Inspo', '1010'),
    ('Premium', '470');
    
-- Initialize attire_contained_by_closet (atitre_id, closet_id)
INSERT INTO attire_contained_by_closet VALUES
	('197', '676'),
    ('269', '676'),
    ('689', '676'),
    ('139', '711'),
    ('520', '711'),
    ('896', '711'),
    ('122', '141'),
    ('524', '141'),
    ('228', '141'),
    ('321', '67'),
    ('601', '67'),
    ('893', '67'),
    ('123', '895'),
    ('698', '895'),
    ('425', '895'),
    ('13', '676'),
    ('527', '676'),
    ('891', '676'),
    ('876', '676'),
    ('633', '676');

-- Initialize is_composed_of (outfit_name, attire_id)
INSERT INTO is_composed_of VALUES
	('Drip', '197'),
    ('Drip', '269'),
    ('Drip', '689'),
    ('Fire', '139'),
    ('Fire', '520'),
    ('Fire', '896'),
    ('Relax', '122'),
    ('Relax', '524'),
    ('Relax', '228'),
    ('Coordinated', '321'),
    ('Coordinated', '601'),
    ('Coordinated', '893'),
    ('Street', '123'),
    ('Street', '698'),
    ('Street', '425');

-- Initialize worn_by (outfit_name, date, username)
INSERT INTO worn_by VALUES
	('Drip', '2019-11-01', 'Eviscirator'),
    ('Drip', '2019-11-02', 'Eviscirator'),
    ('Drip', '2019-11-03', 'Eviscirator'),
    ('Fire', '2019-11-01', 'jeanralph90'),
    ('Fire', '2019-11-02', 'jeanralph90'),
    ('Fire', '2019-11-03', 'jeanralph90'),
    ('Relax', '2019-11-01', 'JWS5th'),
    ('Relax', '2019-11-02', 'JWS5th'),
    ('Relax', '2019-11-03', 'JWS5th'),
    ('Coordinated', '2019-11-01', 'Unit1224'),
    ('Coordinated', '2019-11-02', 'Unit1224'),
    ('Coordinated', '2019-11-03', 'Unit1224'),
    ('Street', '2019-11-01', 'TamBenched'),
    ('Street', '2019-11-02', 'TamBenched'),
    ('Street', '2019-11-03', 'TamBenched');

-- Initialize is_friends_with (username1, username2)
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
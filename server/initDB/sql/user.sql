DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`_id` integer NOT NULL AUTO_INCREMENT,
	`uuid` linestring NOT NULL,
	`username` linestring NOT NULL,
	`password` linestring NOT NULL,
	`passhash` linestring NOT NULL,
	`createdDate` datetime NOT NULL,
	`modifiedDate` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;

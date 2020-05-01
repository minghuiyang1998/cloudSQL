DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`_id` bigint NOT NULL AUTO_INCREMENT,
	`uuid` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`username` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`passhash` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`createdDate` datetime NOT NULL,
	`modifiedDate` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`_id`)
) ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=5
ROW_FORMAT=DYNAMIC
AVG_ROW_LENGTH=4096;






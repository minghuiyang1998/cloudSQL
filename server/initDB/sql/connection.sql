DROP TABLE IF EXISTS `connection`;
CREATE TABLE `connection` (
	`_id` bigint NOT NULL AUTO_INCREMENT,
	`clientId` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`uuid` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`now` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`connectedAt` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`_id`)
) ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;

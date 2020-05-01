DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
	`_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
	`uuid` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`data` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY (`_id`)
) ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;


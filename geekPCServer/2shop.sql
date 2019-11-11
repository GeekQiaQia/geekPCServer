/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 5.6.27-log : Database - geekpcshop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`geekpcshop` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `geekpcshop`;

/*Table structure for table `think_log` */

DROP TABLE IF EXISTS `think_log`;

CREATE TABLE `think_log` (
  `email` varchar(20) NOT NULL COMMENT '用户名',
  `login_time` varchar(30) DEFAULT NULL COMMENT '登录时间',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `login_ip` varchar(50) DEFAULT NULL COMMENT '登录ip',
  `flag` decimal(1,0) DEFAULT NULL COMMENT '登录标识',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `think_log` */

insert  into `think_log`(`email`,`login_time`,`password`,`login_ip`,`flag`) values 
('2280520128@qq.com','2019-11-11 17:18:41','bd66ed8d65da2844f4d0d7d0bfa80967','::ffff:127.0.0.1',1);

/*Table structure for table `think_user` */

DROP TABLE IF EXISTS `think_user`;

CREATE TABLE `think_user` (
  `id` varchar(200) NOT NULL COMMENT '用户id',
  `username` varchar(200) DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `mobile` varchar(12) NOT NULL COMMENT '手机',
  `email` varchar(100) NOT NULL COMMENT '邮箱',
  `create_time` varchar(100) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `think_user` */

insert  into `think_user`(`id`,`username`,`password`,`mobile`,`email`,`create_time`) values 
('7895cd62-e613-43f2-b00f-dd3e3bc3d21a','baixiyang','bd66ed8d65da2844f4d0d7d0bfa80967','18615238536','2280520128@qq.com','2019-9-23 11:46:20'),
('848e4a31-1e53-4aef-91b5-7a6c4db1a30e',NULL,'bd66ed8d65da2844f4d0d7d0bfa80967','18615238536','220520128@qq.com','2019-11-7 10:2:28');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

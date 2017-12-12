-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 12, 2017 at 12:05 PM
-- Server version: 10.0.31-MariaDB-0ubuntu0.16.04.2
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pawgistics`
--

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `dog_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `requested_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `decision_status` enum('approved','declined') DEFAULT NULL,
  `decision_by` int(11) DEFAULT NULL,
  `decision_at` int(11) DEFAULT NULL,
  `decision_reason` text,
  `picked_up_at` timestamp NULL DEFAULT NULL,
  `returned_at` timestamp NULL DEFAULT NULL,
  `outing_report_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`id`, `user_id`, `dog_id`, `description`, `requested_at`, `decision_status`, `decision_by`, `decision_at`, `decision_reason`, `picked_up_at`, `returned_at`, `outing_report_id`) VALUES
(1, 4, 2, 'Gonna go for a walk in the park', '0000-00-00 00:00:00', 'approved', 1, 0, 'have fun', '2017-11-20 05:00:00', '2017-11-23 05:00:00', NULL),
(4, 6, 2, 'Gonna go for a walk in the park', '0000-00-00 00:00:00', 'approved', 1, 0, 'explanation here', NULL, NULL, NULL),
(5, 1, 6, 'Gonna go for a walk in the park', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 1, 2, 'Gonna go for a walk in the park', '0000-00-00 00:00:00', 'approved', 1, 0, 'explanation here', NULL, NULL, NULL),
(7, 1, 2, 'Gonna go for a walk in the park', '0000-00-00 00:00:00', 'approved', 1, 0, 'explanation here', NULL, NULL, NULL),
(8, 1, 2, 'Gonna go for a walk in the park', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dogs`
--

CREATE TABLE `dogs` (
  `id` int(11) NOT NULL,
  `chip` int(11) DEFAULT NULL,
  `name` text,
  `gender` enum('male','female') DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `profile_picture` text,
  `litter_id` int(11) NOT NULL,
  `instructor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dogs`
--

INSERT INTO `dogs` (`id`, `chip`, `name`, `gender`, `active`, `profile_picture`, `litter_id`, `instructor_id`) VALUES
(2, 123456789, 'Chewie', 'male', 1, NULL, 1, 1),
(3, 234567890, 'Han', 'male', 1, NULL, 1, 1),
(4, 345678901, 'Luke', 'male', 1, NULL, 1, 1),
(5, 456789012, 'Leia', 'female', 1, NULL, 1, 3),
(6, 567890123, 'Ben', 'male', 1, NULL, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `fosters`
--

CREATE TABLE `fosters` (
  `dog_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fosters`
--

INSERT INTO `fosters` (`dog_id`, `person_id`) VALUES
(5, 5),
(6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `litters`
--

CREATE TABLE `litters` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `litters`
--

INSERT INTO `litters` (`id`, `name`) VALUES
(1, 'Star Wars');

-- --------------------------------------------------------

--
-- Table structure for table `outing_report`
--

CREATE TABLE `outing_report` (
  `id` int(11) NOT NULL,
  `complete` tinyint(1) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `type` enum('administrator','volunteer') NOT NULL DEFAULT 'volunteer',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `phone_number` text NOT NULL,
  `profile_picture` text NOT NULL,
  `vacation_mode` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `type`, `active`, `first_name`, `last_name`, `phone_number`, `profile_picture`, `vacation_mode`) VALUES
(1, 'kristaps@pawgistics', 'asdf', 'administrator', 1, 'Kristaps', 'Berzinch', '9125483690', '', 0),
(3, 'neel@pawgistics', 'jkl;', 'administrator', 1, 'Neel', 'Jha', '1800PAPAJHA', '', 0),
(4, 'matt@pawgistics', 'qwer', 'volunteer', 1, 'Matt', 'GB', '', '', 0),
(5, 'vicky@pawgistics', 'tyui', 'volunteer', 1, 'Vicky', 'Chung', '0987', '', 0),
(6, 'denali@pawgistics', 'zxcv', 'volunteer', 1, 'Denali', 'Villanueva', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_training`
--

CREATE TABLE `users_training` (
  `user_id` int(11) NOT NULL,
  `training_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_user_must_exist` (`user_id`),
  ADD KEY `decision_user_must_exist` (`decision_by`),
  ADD KEY `checkout_dog_must_exist` (`dog_id`),
  ADD KEY `outing_report_must_exist` (`outing_report_id`);

--
-- Indexes for table `dogs`
--
ALTER TABLE `dogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE_CHIP` (`chip`),
  ADD KEY `litter_must_exist` (`litter_id`),
  ADD KEY `instructor_must_exist` (`instructor_id`);

--
-- Indexes for table `fosters`
--
ALTER TABLE `fosters`
  ADD PRIMARY KEY (`dog_id`,`person_id`),
  ADD KEY `foster_person_must_exist` (`person_id`);

--
-- Indexes for table `litters`
--
ALTER TABLE `litters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE_NAME` (`name`);

--
-- Indexes for table `outing_report`
--
ALTER TABLE `outing_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE_EMAIL` (`email`);

--
-- Indexes for table `users_training`
--
ALTER TABLE `users_training`
  ADD KEY `user_must_exist` (`user_id`),
  ADD KEY `training_must_exist` (`training_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `dogs`
--
ALTER TABLE `dogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `litters`
--
ALTER TABLE `litters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `training`
--
ALTER TABLE `training`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkout`
--
ALTER TABLE `checkout`
  ADD CONSTRAINT `checkout_dog_must_exist` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`),
  ADD CONSTRAINT `decision_user_must_exist` FOREIGN KEY (`decision_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `outing_report_must_exist` FOREIGN KEY (`outing_report_id`) REFERENCES `outing_report` (`id`),
  ADD CONSTRAINT `request_user_must_exist` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `dogs`
--
ALTER TABLE `dogs`
  ADD CONSTRAINT `instructor_must_exist` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `litter_must_exist` FOREIGN KEY (`litter_id`) REFERENCES `litters` (`id`);

--
-- Constraints for table `fosters`
--
ALTER TABLE `fosters`
  ADD CONSTRAINT `foster_dog_must_exist` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`),
  ADD CONSTRAINT `foster_person_must_exist` FOREIGN KEY (`person_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users_training`
--
ALTER TABLE `users_training`
  ADD CONSTRAINT `training_must_exist` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`),
  ADD CONSTRAINT `user_must_exist` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

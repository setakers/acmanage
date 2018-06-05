CREATE DATABASE IF NOT EXISTS setakers;
USE setakers;
CREATE TABLE IF NOT EXISTS `user`(
    `user_id` BIGINT PRIMARY KEY,
    `user_name` VARCHAR(20),
    `password` VARCHAR(448),
    `character` TINYINT,
    `gender` TINYINT,
    `email` VARCHAR(40) UNIQUE KEY,
    `phone` VARCHAR(20) UNIQUE KEY
);

CREATE TABLE IF NOT EXISTS `student`(
    `student_id` BIGINT PRIMARY KEY,
    `class` VARCHAR(80),
    `admission_date` DATE
);

CREATE TABLE IF NOT EXISTS `teacher`(
    `teacher_id` BIGINT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS `course`(
    `course_id` BIGINT PRIMARY KEY,
    `course_name` VARCHAR(40),
    `credit` FLOAT,
    `introduction` VARCHAR(200),
    `state` TINYINT
);

CREATE TABLE IF NOT EXISTS `major`(
    `major_id` BIGINT PRIMARY KEY,
    `major_name` VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS `college`(
    `college_id` BIGINT PRIMARY KEY,
    `college_name` VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS `time_slot`(
    `time_slot_id` BIGINT PRIMARY KEY,
    `date` DATE,
    `begin_time` TIME,
    `end_time` TIME
);

CREATE TABLE IF NOT EXISTS `as_student`(
    `user_id` BIGINT PRIMARY KEY,
    `student_id` BIGINT,
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(student_id) REFERENCES student(student_id)
);

CREATE TABLE IF NOT EXISTS `as_teacher`(
    `user_id` BIGINT PRIMARY KEY,
    `teacher_id` BIGINT,
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(teacher_id) REFERENCES teacher(teacher_id)
);

CREATE TABLE IF NOT EXISTS `attend`(
    `course_id` BIGINT,
    `student_id` BIGINT,
    `score` FLOAT,
    FOREIGN KEY(course_id) REFERENCES course(course_id),
    FOREIGN KEY(student_id) REFERENCES student(student_id),
    PRIMARY KEY(course_id, student_id)
);

CREATE TABLE IF NOT EXISTS `teach`(
    `teacher_id` BIGINT,
    `course_id` BIGINT,
    FOREIGN KEY(teacher_id) REFERENCES teacher(teacher_id),
    FOREIGN KEY(course_id) REFERENCES course(course_id),
    CONSTRAINT pk_teach PRIMARY KEY(teacher_id, course_id)
);

CREATE TABLE IF NOT EXISTS `belong_to`(
    `user_id` BIGINT,
    `college_id` BIGINT,
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(college_id) REFERENCES college(college_id),
    CONSTRAINT pk_belong_to PRIMARY KEY(user_id, college_id)
);

CREATE TABLE IF NOT EXISTS `major_in`(
    `student_id` BIGINT,
    `major_id` BIGINT,
    FOREIGN KEY(student_id) REFERENCES student(student_id),
    FOREIGN KEY(major_id) REFERENCES major(major_id),
    CONSTRAINT pk_major_in PRIMARY KEY(student_id, major_id)
);

CREATE TABLE IF NOT EXISTS `course_time`(
    `course_id` BIGINT,
    `time_slot_id` BIGINT,
    FOREIGN KEY(course_id) REFERENCES course(course_id),
    FOREIGN KEY(time_slot_id) REFERENCES time_slot(time_slot_id),
    CONSTRAINT pk_course_time PRIMARY KEY(course_id, time_slot_id)
);

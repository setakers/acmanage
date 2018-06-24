# drop database  setakers;

CREATE DATABASE IF NOT EXISTS setakers;
USE setakers;
CREATE TABLE IF NOT EXISTS `user`(
    `user_id` BIGINT PRIMARY KEY auto_increment,
    `user_name` VARCHAR(20),
    `password` CHAR(41), # 插入和查询的时候密码使用PASSWORD（）函数处理，定长41位，该函数在高于mysql5.7以上版本无效
    `character` TINYINT, # 0——学生， 1——教师， 2——管理员
    `gender` TINYINT,
    `email` VARCHAR(40) UNIQUE KEY,
    `phone` VARCHAR(20) UNIQUE KEY
);

CREATE TABLE IF NOT EXISTS `student`(
    `student_id` BIGINT PRIMARY KEY auto_increment,
    `class` VARCHAR(80),
    `admission_date` DATE
);

CREATE TABLE IF NOT EXISTS `teacher`(
    `teacher_id` BIGINT PRIMARY KEY auto_increment
);

CREATE TABLE IF NOT EXISTS `classroom`(
  classroom_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(80) UNIQUE,
  capacity INT
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `course`(
    `course_id` BIGINT PRIMARY KEY auto_increment,
    `course_name` VARCHAR(40),
    `credit` FLOAT,
    `introduction` VARCHAR(200),
    `state` TINYINT, # 0--结课  1--进行中
    `classroom_id` BIGINT,
    FOREIGN KEY(classroom_id) REFERENCES classroom(classroom_id)
);


CREATE TABLE IF NOT EXISTS `major`(
    `major_id` BIGINT PRIMARY KEY auto_increment,
    `major_name` VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS `college`(
    `college_id` BIGINT PRIMARY KEY auto_increment,
    `college_name` VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS `time_slot`(
    `time_slot_id` BIGINT PRIMARY KEY auto_increment,
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

# following added by st4rlight
# 成绩修改申请，由教师发起请求，由管理员审批
CREATE TABLE IF NOT EXISTS `score_query`(
  query_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  teacher_id BIGINT,
  student_id BIGINT,
  course_id BIGINT,
  old_score INT,
  new_score INT,
  reason VARCHAR(400),
  state tinyint, # 0--refused  1--accepted  2--pending
  query_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deal_time TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
  FOREIGN KEY (student_id) REFERENCES student(student_id),
  FOREIGN KEY (course_id) REFERENCES course(course_id)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `exam`(
  exam_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  course_id BIGINT,
  classroom_id BIGINT,
  time timestamp,
  FOREIGN KEY (course_id) REFERENCES course(course_id),
  FOREIGN KEY (classroom_id) REFERENCES classroom(classroom_id)
)ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `select_course`(
    `query_id` BIGINT AUTO_INCREMENT,
    `course_id` BIGINT,
    `student_id` BIGINT,
    `state` TINYINT, # 0--refused  1--accepted  2--pending
    FOREIGN KEY(course_id) REFERENCES course(course_id),
    FOREIGN KEY(student_id) REFERENCES student(student_id),
    PRIMARY KEY(query_id)
);
CREATE TABLE IF NOT EXISTS `open_course`(
    `open_id` BIGINT AUTO_INCREMENT,
    `teacher_id` BIGINT,
    `course_name` VARCHAR(40),
    `credit` FLOAT,
    `introduction` VARCHAR(200),
    `classroom_id` BIGINT,
    `state` TINYINT, # 0--refused  1--accepted  2--pending
    FOREIGN KEY(teacher_id) REFERENCES as_teacher(teacher_id),
    FOREIGN KEY(classroom_id) REFERENCES classroom(classroom_id),
    PRIMARY KEY(open_id)
);

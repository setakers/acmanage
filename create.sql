DROP DATABASE IF EXISTS setakers;

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
) ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `student`(
    `student_id` BIGINT PRIMARY KEY auto_increment,
    `class` VARCHAR(80),
    `admission_date` DATE
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `teacher`(
    `teacher_id` BIGINT PRIMARY KEY auto_increment
)ENGINE=InnoDB ;

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
) ENGINE=InnoDB ;


CREATE TABLE IF NOT EXISTS `major`(
    `major_id` BIGINT PRIMARY KEY auto_increment,
    `major_name` VARCHAR(80)
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `college`(
    `college_id` BIGINT PRIMARY KEY auto_increment,
    `college_name` VARCHAR(80)
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `time_slot`(
    `time_slot_id` BIGINT PRIMARY KEY auto_increment,
    `date` DATE,
    `begin_time` TIME,
    `end_time` TIME
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `as_student`(
    `user_id` BIGINT PRIMARY KEY,
    `student_id` BIGINT,
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(student_id) REFERENCES student(student_id)
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `as_teacher`(
    `user_id` BIGINT PRIMARY KEY,
    `teacher_id` BIGINT,
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(teacher_id) REFERENCES teacher(teacher_id)
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `attend`(
    `course_id` BIGINT,
    `student_id` BIGINT,
    `score` FLOAT,
    FOREIGN KEY(course_id) REFERENCES course(course_id),
    FOREIGN KEY(student_id) REFERENCES student(student_id),
    PRIMARY KEY(course_id, student_id)
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `teach`(
    `teacher_id` BIGINT,
    `course_id` BIGINT,
    FOREIGN KEY(teacher_id) REFERENCES teacher(teacher_id),
    FOREIGN KEY(course_id) REFERENCES course(course_id),
    CONSTRAINT pk_teach PRIMARY KEY(teacher_id, course_id)
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `belong_to`(
    `user_id` BIGINT,
    `college_id` BIGINT,
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(college_id) REFERENCES college(college_id),
    CONSTRAINT pk_belong_to PRIMARY KEY(user_id, college_id)
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `major_in`(
    `student_id` BIGINT,
    `major_id` BIGINT,
    FOREIGN KEY(student_id) REFERENCES student(student_id),
    FOREIGN KEY(major_id) REFERENCES major(major_id),
    CONSTRAINT pk_major_in PRIMARY KEY(student_id, major_id)
)ENGINE=InnoDB ;

CREATE TABLE IF NOT EXISTS `course_time`(
    `course_id` BIGINT,
    `time_slot_id` BIGINT,
    FOREIGN KEY(course_id) REFERENCES course(course_id),
    FOREIGN KEY(time_slot_id) REFERENCES time_slot(time_slot_id),
    CONSTRAINT pk_course_time PRIMARY KEY(course_id, time_slot_id)
)ENGINE=InnoDB ;

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
)ENGINE=InnoDB ;

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
)ENGINE=InnoDB ;


	INSERT INTO user (user_id, user_name, password, `character`, gender, email, phone) VALUES (1, 'admin', '123', 2, 1, '939949352@qq.com', '18867155079');
	INSERT INTO user (user_id, user_name, password, `character`, gender, email, phone) VALUES (4, 'clh', 'clh', 1, 0, '3150105275@zju.edu.cn', '13345126986');
	INSERT INTO user (user_id, user_name, password, `character`, gender, email, phone) VALUES (5, 'ylj', 'ylj', 0, 0, '12@qq.com', '123');
	INSERT INTO user (user_id, user_name, password, `character`, gender, email, phone) VALUES (6, 'sfp', 'sfp', 0, 0, '1@q.com', '12');



	INSERT INTO teacher (teacher_id) VALUES (1);

	INSERT INTO student (student_id, class, admission_date) VALUES (1, '1506', '2015-08-21');
	INSERT INTO student (student_id, class, admission_date) VALUES (2, '1505', '2018-06-14');
	INSERT INTO student (student_id, class, admission_date) VALUES (3, '1501', '2018-06-06');



	INSERT INTO as_student (user_id, student_id) VALUES (4, 1);
	INSERT INTO as_student (user_id, student_id) VALUES (5, 2);
	INSERT INTO as_student (user_id, student_id) VALUES (6, 3);

	INSERT INTO as_teacher (user_id, teacher_id) VALUES (4, 1);


	INSERT INTO classroom (classroom_id, room_name, capacity) VALUES (1, '204', 50);
	INSERT INTO classroom (classroom_id, room_name, capacity) VALUES (2, '201', 50);
	INSERT INTO classroom (classroom_id, room_name, capacity) VALUES (3, '307', 60);

	INSERT INTO course (course_id, course_name, credit, introduction, state, classroom_id) VALUES (1, 'fuckse', 1.5, 'fuck the software engineering', 1, 1);
	INSERT INTO course (course_id, course_name, credit, introduction, state, classroom_id) VALUES (2, 'fuckcn', 4, 'fuck computer network', 1, 1);

	INSERT INTO attend (course_id, student_id, score) VALUES (1, 1, 58);
	INSERT INTO attend (course_id, student_id, score) VALUES (1, 2, 60);
	INSERT INTO attend (course_id, student_id, score) VALUES (1, 3, 60);
	INSERT INTO attend (course_id, student_id, score) VALUES (2, 1, 59);
	INSERT INTO attend (course_id, student_id, score) VALUES (2, 3, 59);

	INSERT INTO college (college_id, college_name) VALUES (1, 'xindian');
	INSERT INTO college (college_id, college_name) VALUES (2, 'jike');

	INSERT INTO belong_to (user_id, college_id) VALUES (4, 2);
	INSERT INTO belong_to (user_id, college_id) VALUES (6, 1);



	INSERT INTO exam (exam_id, course_id, classroom_id, time) VALUES (1, 1, 1, '2018-06-23 11:20:01');
	INSERT INTO exam (exam_id, course_id, classroom_id, time) VALUES (2, 1, 2, '2018-06-23 11:20:17');
	INSERT INTO exam (exam_id, course_id, classroom_id, time) VALUES (3, 2, 3, '2018-06-23 11:20:17');

	INSERT INTO major (major_id, major_name) VALUES (1, 'ee');

	INSERT INTO major_in (student_id, major_id) VALUES (3, 1);

	INSERT INTO score_query (query_id, teacher_id, student_id, course_id, old_score, new_score, reason, state, query_time, deal_time) VALUES (3, 1, 2, 1, 18, 99, '12345', 1, '2018-06-23 10:27:10', null);
	INSERT INTO score_query (query_id, teacher_id, student_id, course_id, old_score, new_score, reason, state, query_time, deal_time) VALUES (4, 1, 3, 2, 15, 22, '1215', 1, '2018-06-23 10:27:22', null);


	INSERT INTO teach (teacher_id, course_id) VALUES (1, 1);
	INSERT INTO teach (teacher_id, course_id) VALUES (1, 2);




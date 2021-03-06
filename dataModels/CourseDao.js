var CourseDao = function () {
    this.modifyCourse = function (conn, new_course, callback) {
        conn.query('UPDATE `course` SET '
            +'`course_name` = ?, `credit` = ?, '
            +'`introduction` = ?, `state` = ?, '
            +'`classroom_id` = ? '
            +'WHERE (`course_id` = ?);\n',
            [new_course['course_name'],new_course['credit'], new_course['introduction'],
             new_course['state'],new_course['classroom_id'], new_course['course_id']],
            function (error, results, fields) {
                if (error) {
                    console.error(error);
                    conn.rollback(function () {
                    })
                }
                callback(results);
            });
    }
    this.getCourse = function (conn, callback) {
        conn.query('SELECT * from course', function (error, results, fields) {
            if (error) {
                console.error(error)
                conn.rollback(function () {
                })
            }
            else
                callback(results);
        });
    }
    this.getCourseByCourseId = function (conn, course_id, callback) {
        conn.query('SELECT * from course where course_id = ' + course_id, function (error, results, fields) {
            if (error) {
                console.error(error)
                conn.rollback(function () {
                })
            }
            else
                callback(results);
        });
    }
    this.addCourse = function (conn, course, callback) {
        // console.log(course);
        conn.query('insert into course (course_name, credit, introduction, state, classroom_id) values(?,?,?,?,?)', [course['course_name'], course['credit'], course['introduction'], course['state'], course['classroom_id'],], function (error, results, fields) {
            if (error) {
                console.error(error)
                conn.rollback(function () {
                })
            }
            else
                callback(results);
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = CourseDao;
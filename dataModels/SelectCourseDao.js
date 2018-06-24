var SelectCourseDao = function () {
    this.addSelectCourse = function (conn, select_course, callback) {
        conn.query('insert into select_course(course_id,student_id,state) values(?,?,?)', [select_course['course_id'], select_course['student_id'], select_course['state']], function (error, results, fields) {
            if (error) {
                console.error(error);
                conn.rollback(function () {
                })
            }
            callback(results);
        });
    }
    this.updateSelectCourse = function (conn, select_course, callback) {
        conn.query('update select_course set state = ? where query_id = ?', [select_course['state'], select_course['query_id']], function (error, results, fields) {
            if (error) {
                console.error(error);
                conn.rollback(function () {
                })
            }
            callback(results);
        });
    }
    // this.getAsStudentByUserId = function (conn, user_id, callback) {
    //     conn.query('SELECT * from as_student where user_id = ' + user_id, function (error, results, fields) {
    //         if (error)
    //         {
    //             console.error(error);
    //             conn.rollback(function () {})
    //         }
    //         callback(results);
    //     });
    // }
    //
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = SelectCourseDao;

var CrossDao = function () {
    this.findAllStudentsByCourseId = function (conn,course_id, callback) {
        conn.query('select as_student.student_id, user.user_name, A.score from (select * from attend where attend.course_id = ' + course_id + ') as A natural left join as_student natural left join user', function (error, results, fields) {
            if (error) {
                console.error(error)
                conn.rollback(function () {})
            }
            callback(results);
        });
    };
    this.findCoursesByTeacherId=function (teacher_id, callback) {
        // var conn = DaoUtil.getConnection();
        // conn.query('select course_id,course_name,credit,introduction,total_students,unmarked_stu from (select * from attend where attend.course_id = ' + course_id + ') as A natural left join as_student natural left join user', function (error, results, fields) {
        //     if (error) throw error;
        //     callback(results);
        // });
        // DaoUtil.release(conn);
        throw SQLException("not implemented yet.");
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = CrossDao;
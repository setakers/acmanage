
var CrossDao = function () {
    this.getFreeRooms = function(conn,callback){
        conn.query(
            'select *\n' +
            'from classroom\n' +
            'where classroom_id not in(\n' +
            '\tselect classroom_id\n' +
            '\tfrom course\n' +
            '\twhere state = 1\n' +
            ')',
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
    this.searchCourses = function(conn,keyword,callback){
        conn.query(
            'select course_id,course_name,room_name,credit,introduction,state\n' +
            'from (\n' +
            '\tselect *\n' +
            '    from course\n' +
            '    where course_name like "%'+ keyword +'%"\n' +
            ') as tmp \n' +
            'natural join classroom',
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
    this.getSelectedByStudentId = function(conn,student_id,callback){
        conn.query(
            'select course_id,course_name,room_name,credit,introduction,state\n' +
            'from (\n' +
            '\tselect course_id\n' +
            '    from `select`\n' +
            '    where student_id = ' + student_id +
            ') as tmp \n' +
            'natural join course\n' +
            'natural join classroom',
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
    this.getCoursesByStudentId = function(conn,student_id,callback){
        conn.query(
            'select course_id,course_name,room_name,credit,introduction ' +
            'from course natural join classroom ' +
            'where course_id in ( ' +
            'select course_id ' +
            'from attend ' +
            'where student_id = ' + student_id +
            ')',
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
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
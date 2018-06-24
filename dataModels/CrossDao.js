
var CrossDao = function () {
    this.getAllScoreQueries = function(conn,callback){
        let sqlquery =
            'select *\n' +
            'from score_query \n' +
            'natural left join(\n' +
            '\tselect course_id,course_name\n' +
            '\tfrom course\n' +
            ')as CRS\n' +
            'natural left join (\n' +
            '\tselect teacher_id,user_name as teacher_name\n' +
            '\tfrom as_teacher natural left join user\n' +
            ')as TCH\n' +
            'natural left join (\n' +
            '\tselect student_id,user_name as student_name\n' +
            '\tfrom as_student natural left join user\n' +
            ')as STD'
        conn.query(sqlquery,
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
    this.getAllOpenCourses = function(conn,callback){
        let sqlquery =
            'select open_id,teacher_id,course_name,credit,introduction,classroom_id,teacher_name,room_name\n' +
            'from (\n' +
            '\tselect * from open_course \n' +
            '\twhere state = 2\n' +
            ')as OPN\n' +
            'natural left join classroom\n' +
            'natural left join (\n' +
            '\tselect teacher_id,user_name as teacher_name\n' +
            '\tfrom as_teacher natural left join user\n' +
            ')as TCH'
        conn.query(sqlquery,
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
    this.getAllSelectCourses = function(conn,callback){
        let sqlquery =
            'select query_id,course_id,student_id,student_name,course_name,teacher_name\n' +
            'from (\n' +
            '\tselect *\n' +
            '\tfrom select_course\n' +
            '\twhere state = 2\n' +
            ') as QRY\n' +
            'natural left join(\n' +
            '\tselect student_id, user_name as student_name\n' +
            '\tfrom as_student natural left join user\n' +
            ') as STU\n' +
            'natural left join(\n' +
            '\tselect course_id,course_name,user_name as teacher_name\n' +
            '\tfrom course natural left join teach natural left join as_teacher natural left join user\n' +
            ') as CLS'
        console.log(sqlquery)
        conn.query(sqlquery,
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
    this.getOpenCoursesByTeacherId = function(conn,teacher_id,callback){
        let sqlquery =
            'select course_name,credit,introduction,room_name,state\n' +
            'from (\n' +
            '\tselect *\n' +
            '\tfrom open_course\n' +
            '\twhere teacher_id = '+ teacher_id +'\n' +
            ') as A\n' +
            'natural left join classroom'
        conn.query(sqlquery,
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
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
            'natural left join classroom',
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
            '    from select_course\n' +
            '    where student_id = ' + student_id +
            ') as tmp \n' +
            'natural left join course\n' +
            'natural left join classroom',
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
            'from course natural left join classroom ' +
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
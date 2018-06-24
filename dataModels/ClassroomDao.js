var ClassroomDao = function () {
    this.modifyClassroom = function (conn, new_classroom, callback) {
        conn.query('UPDATE `classroom` SET `room_name` =?, `capacity` = ?'
            +' WHERE (`classroom_id` = ?);',
            [new_classroom['room_name'],new_classroom['capacity'], new_classroom['classroom_id']],
            function (error, results, fields) {
                if (error) {
                    console.error(error);
                    conn.rollback(function () {
                    })
                }
                callback(results);
            });
    }
    this.addClassroom = function (conn, new_classroom, callback) {
        conn.query('INSERT INTO `classroom` (`room_name`, `capacity`) '
                  +'VALUES (?,?);\n',
            [new_classroom['room_name'],new_classroom['capacity']],
            function (error, results, fields) {
                if (error) {
                    console.error(error);
                    conn.rollback(function () {
                    })
                }
                callback(results);
            });
    }
    this.listClassroom = function(conn,callback){
        conn.query(
            'select * from classroom',
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
    this.getClassroomByClassroomId = function (conn,classroom_id, callback) {
        conn.query('SELECT * from classroom where classroom_id = \'' + classroom_id + '\'', function (err, results, fields) {
            if (err) {
                console.error(error)
                conn.rollback(function () {})
            }else {
                callback(results);
            }
        })
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = ClassroomDao;
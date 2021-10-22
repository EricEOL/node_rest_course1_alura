const connection = require('../infra/connection');

class Attendance {
  add(attendance) {
    const sql = `INSERT INTO Atendimentos SET ?`;

    connection.query(sql, attendance, (error, result) => {
      if(error) {
        console.log('Erro add attendance: ', error);
      } else {
        console.log(result);
      }
    })
  }
}

module.exports = new Attendance;
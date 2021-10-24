const query = require('../infra/database/queries');

class Attendance {
  add(attendance) {
    const sql = `INSERT INTO Atendimentos SET ?`;
    return query(sql, attendance);
  }

  list() {
    const sql = `SELECT * FROM Atendimentos`;
    return query(sql);
  }
}

module.exports = new Attendance();
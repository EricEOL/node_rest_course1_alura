class Tables {
  init(connection) {
    this.connection = connection;
    this.createAttendance();
  }

  createAttendance() {
    const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (
      id int NOT NULL AUTO_INCREMENT, 
      client varchar(50) NOT NULL, 
      pet varchar(20), task varchar(20) NOT NULL, 
      status varchar(20) NOT NULL, 
      comments text,
      PRIMARY KEY(id)
      )`

    this.connection.query(sql, (error) => {
      if(error) {
        console.log(error);
      } else {
        console.log('Attendance table created with success');
      }
    })
  }
}

module.exports = new Tables;
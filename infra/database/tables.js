class Tables {
  init(connection) {
    this.connection = connection;
    this.createAttendances();
    this.createPets();
  }

  createAttendances() {
    const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (
      id int NOT NULL AUTO_INCREMENT, 
      client varchar(11) NOT NULL, 
      pet varchar(20), 
      task varchar(20) NOT NULL, 
      date datetime NOT NULL,
      createdAt datetime NOT NULL,
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

  createPets() {
    const sql = `CREATE TABLE IF NOT EXISTS Pets (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(50), 
      image varchar(200),
      PRIMARY KEY(id)
    )`

    this.connection.query(sql, (error) => {
      if(error) {
        console.log(error);
      } else {
        console.log('Pet table created with success');
      }
    })
  }
}

module.exports = new Tables;
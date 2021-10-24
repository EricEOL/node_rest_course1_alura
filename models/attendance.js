const moment = require('moment');
const connection = require('../infra/connection');

class Attendance {
  add(attendance, res) {

    const createdAt = moment().format('YYYY-MM-DD HH:MM:SS')
    const date = moment(attendance.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const validDate = moment(date).isSameOrAfter(createdAt);
    const validClient = attendance.client.length >= 5;

    const validations = [
      {
        name: 'date',
        valid: validDate,
        message: 'Data deve ser maior ou igual a data de hoje.'
      },
      {
        name: 'client',
        valid: validClient,
        message: 'Cliente deve ter o nome maior ou igual do que 5 letras.'
      }
    ]

    const errors = validations.filter(data => !data.valid);
    const errorsExist = errors.length;

    if (errorsExist) return res.status(400).json(errors);

    const attendanceWithDate = { ...attendance, createdAt, date };

    const sql = `INSERT INTO Atendimentos SET ?`;

    connection.query(sql, attendanceWithDate, (error, result) => {
      if (error) {
        res.status(400).json('Error add attendance');
      } else {
        res.status(201).json('Novo atendimento incluído com sucesso');
      }
    })
  }

  list(res) {
    const sql = `SELECT * FROM Atendimentos`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json('Error list attendance');
      } else {
        res.status(200).json(result);
      }
    })
  }

  findById(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json('Error list specified attendance');
      } else {
        res.status(200).json(result[0]);
      }
    })
  }

  edit(id, values, res) {
    if (values.date) {
      values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }

    const sql = `UPDATE Atendimentos SET ? WHERE id=?`;

    connection.query(sql, [values, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({message: `Atendimento ${id} alterado com sucesso`});
      }
    })
  }

  delete(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id=?`;

    connection.query(sql, id, (error, result) => {
      if(error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({message: `Atendimento ${id} excluído com sucesso`});
      }
    })
  }
}

module.exports = new Attendance;
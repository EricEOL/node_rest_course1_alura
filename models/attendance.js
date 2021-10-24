const { default: axios } = require('axios');
const moment = require('moment');
const connection = require('../infra/database/connection');
const attendanceRepository = require('../repositories/Attendance');

class Attendance {
  constructor() {
    this.validDate = ({ date, createdAt }) => moment(date).isSameOrAfter(createdAt);
    this.validClient = ({ length }) => length >= 2;

    this.validation = params => this.validations.filter(field => {
      const { name } = field;
      const param = params[name];

      return !field.valid(param)
    })

    this.validations = [
      {
        name: 'date',
        valid: this.validDate,
        message: 'Data deve ser maior ou igual a data de hoje.'
      },
      {
        name: 'client',
        valid: this.validClient,
        message: 'Cliente deve ter o nome maior ou igual do que 5 letras.'
      }
    ]
  }

  add(attendance) {

    const createdAt = moment().format('YYYY-MM-DD HH:MM:SS')
    const date = moment(attendance.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const params = {
      data: { date, createdAt },
      client: { length: attendance.client.length }
    }

    const errors = this.validation(params);
    const errorsExist = errors.length;

    if (errorsExist) {
      return new Promise((resolve, reject) => reject(errors));
    };

    const attendanceWithDate = { ...attendance, createdAt, date };

    return attendanceRepository.add(attendanceWithDate)
      .then(results => {
        const id = results.insertId;
        return { ...attendance, id }
      });

  }

  list() {
    return attendanceRepository.list();
  }

  findById(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

    connection.query(sql, async (error, result) => {
      const attendance = result[0];
      const cpf = attendance.client;

      if (error) {
        res.status(400).json('Error list specified attendance');
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        attendance.client = data;

        res.status(200).json(attendance);
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
        res.status(200).json({ message: `Atendimento ${id} alterado com sucesso` });
      }
    })
  }

  delete(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id=?`;

    connection.query(sql, id, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ message: `Atendimento ${id} excluído com sucesso` });
      }
    })
  }
}

module.exports = new Attendance;
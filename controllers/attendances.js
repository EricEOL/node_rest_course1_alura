const Attendance = require('../models/attendance');

module.exports = app => {
  app.get('/attendances', (req, res) => {
    return Attendance.list(res);
  })

  app.get('/attendances/:id', (req, res) => {
    const id = parseInt(req.params.id);

    return Attendance.findById(id, res);
  })

  app.post('/attendances', (req, res) => {
    const attendance = req.body;

    Attendance.add(attendance)
      .then(attendanceCreated => res.status(201).json(attendanceCreated))
      .catch(error => res.status(400).json(error));
  })

  app.patch('/attendances/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const values = req.body;

    return Attendance.edit(id, values, res);
  })

  app.delete('/attendances/:id', (req, res) => {
    const id = parseInt(req.params.id);

    return Attendance.delete(id, res);
  })
}
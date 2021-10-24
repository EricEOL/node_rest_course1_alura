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
    
    return Attendance.add(attendance, res);
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
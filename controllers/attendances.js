const Attendance = require('../models/attendance'); 

module.exports = app => {
  app.get('/attendances', (req, res) => {
    return res.json({ "message": "Rota de atendimentos" });
  })

  app.post('/attendances', (req, res) => {
    const attendance = req.body;
    Attendance.add(attendance);
    
    return res.send('Attendances: POST');
  })
}
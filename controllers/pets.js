const Pet = require('../models/pet');

module.exports = app => {
  app.post('/pet', (req, res) => {
    const pet = req.body;
    
    return Pet.add(pet, res);
  })
}
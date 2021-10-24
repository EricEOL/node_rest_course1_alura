const connection = require('../infra/database/connection');
const uploadFile = require('../infra/files/filesUpload');

class Pet {
  add(pet, res) {
    const sql = `INSERT INTO Pets SET ?`;

    uploadFile(pet.image, pet.name, (error, newPath) => {

      if (error) {
        return res.status(400).json({ error })
      } else {
        const newPet = {
          name: pet.name,
          image: newPath
        }
  
        connection.query(sql, newPet, (error, result) => {
          if (error) {
            res.status(400).json(error);
          } else {
            res.status(201).json(result);
          }
        })
      }
    })
  }
}

module.exports = new Pet();
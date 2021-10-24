const fs = require('fs');
const path = require('path');

module.exports = (pathFile, fileName, callbackSavedImage) => {
  
  const validTypes = ['jpg', 'jpeg', 'png'];
  
  const type = path.extname(pathFile);

  const typeIsValid = validTypes.indexOf(type.substring(1)) !== -1;

  if(!typeIsValid) {
    const error = "Tipo de imagem inválida";
    console.log('Tipo de imagem inválida');

    return callbackSavedImage(error);
  };
  
  const newPath = `./assets/images/${fileName}${type}`;
  
  fs.createReadStream(pathFile)
    .pipe(fs.createWriteStream(newPath))
    .on('finish', () => {
      callbackSavedImage(false, newPath);
    });
}

const express = require('express');

const app = express();

app.get('/atendimentos', (req, res) => {
  return res.json({"message": "Rota de atendimentos"});
})

app.listen(3000, () => console.log('Server running'));
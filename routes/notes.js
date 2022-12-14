const notes = require('express').Router();
const fs = require('fs');
const path = require('path');

notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes db`);
  fs.readFile(path.join('db', 'db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
});


module.exports = notes;
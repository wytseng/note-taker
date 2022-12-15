const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes db`);
  fs.readFile(path.join('db', 'db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
});

notes.post('/', (req, res) => {

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: shortid.generate(),
    }

    fs.readFile(path.join('db','db.json'), 'utf8', (err, data) => {
      if (err) throw err;
      const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      fs.writeFile(path.join('db','db.json'), JSON.stringify(parsedData, null, 4), (err) => {
        err ? console.log(err) : console.log(`\nNew note "${newNote.title}" written db.json`)
      })
    })

    const response = {
      status: 'success',
      body: newNote,
    }
    res.json(response);
  } else {
    res.json('Error in posting new notes.')
  }
});


module.exports = notes;
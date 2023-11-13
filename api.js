const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors')
const multer = require('multer')

const app = express()
const port = 4001
const db = new sqlite3.Database('memories.db')

app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))
const upload = multer({ dest: 'images/' })

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      image TEXT,
      timestamp DATE
    )
  `)
})

app.post('/upload-image', upload.single('featuredImage'), (req, res, next) => {
  res.json({ img: req.file.path })
})

app.get('/memories', (req, res) => {
  db.all('SELECT * FROM memories', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ memories: rows })
  })
})

app.post('/memories', (req, res) => {
  const { name, description, timestamp, image } = req.body

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp, image) VALUES (?, ?, ?, ?)'
  )
  stmt.run(name, description, timestamp, image, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }

    const lastInsertedId = this.lastID

    db.get(
      'SELECT * FROM memories WHERE id = ?',
      [lastInsertedId],
      (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }

        res.status(201).json({ memory: row })
      }
    )
  })
})

app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { name, description, timestamp, image } = req.body

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET name = ?, description = ?, timestamp = ?, image = ? WHERE id = ?'
  )
  stmt.run(name, description, timestamp, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory updated successfully' })
  })
})

app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

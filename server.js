// DEPENDENCIES

const express = require('express')
const mongoose = require('mongoose')
const teslas = require('./controllers/routes')
const cors = require('cors')
// CONFIGURATION
const app = express()
const db = mongoose.connection
require('dotenv').config();
const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI

// DATABASE
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))
// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Welcome to the Tesla battery app API');
})
app.use('/api/tesla-info', teslas);




  // Listener
  app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
 });



//  // Seed Data======= Just for testing
// const teslaInfo = [
//   {
//     id:1, 
//     model: 'S',
//     battery: 'Standard'
//   }, {
//     id:2, 
//     model: 'S',
//     battery: 'Plaid'
//   }, {
//     id:3, 
//     model: 'S',
//     battery: 'Plaid +'
//   }
// ]
// // DATABASE



// // ============Index Route==================
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });
// // ============Show Route==================

// app.get('/api/tesla-info', (req, res) => {
//   res.send(teslaInfo);
// });
// // ============POST New Route==================
// app.post('/api/tesla-info', (req, res) => {

//   if(!req.body.model || !req.body.battery) {
//     return res.status(400).send('Model and Battery selection is required')
//   }
//   const info = {
//       id: teslaInfo.length +1,
//       model: req.body.model,
//       battery: req.body.battery,
//   }
//   teslaInfo.push(info);
//   res.send(info);
// })
// // ============Show Route==================
// app.get('/api/tesla-info/:id', (req, res) => {
//   const info = teslaInfo.find(teslaInfo => teslaInfo.id === parseInt(req.params.id));
  
//   if(!info) {
//     res.status(404).send('The ID provided is not found')
//   }
//   res.send(info)
// });
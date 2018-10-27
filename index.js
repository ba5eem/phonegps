const express = require('express')
const cors = require('cors')
const path = require('path')

// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))


let coords = [21.436057,-157.788867, 'iphone'];
// Serve our api route /cow that returns a custom talking text cow
app.get('/api/gps/:lat/:lon/:name', cors(), async (req, res, next) => {
  console.log(req.params);
  let lat = req.params.lat;
  let lon = req.params.lon;
  let name = req.params.name;
  coords[0] = lat;
  coords[1] = lon;
  coords[3] = name;
  res.json(coords);
})

app.get('/api/coords', (req,res) => {
	res.json(coords);
})



// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})

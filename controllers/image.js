const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey:'8e496422028f408e940b7cf7d46db6d8'
});

const handleApiCall = (req,res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(e=>res.status(400).json('Unable to Work With Api'))
}


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }

  module.exports = {
    handleImage,
    handleApiCall
  }
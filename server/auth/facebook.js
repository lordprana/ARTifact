const passport = require('passport')
const axios = require('axios')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const { User } = require('../db/models')
module.exports = router

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {

  console.log('Facebook app ID / secret not found. Skipping Facebook OAuth.')

} else {

  router.get('/', (req, res, next) => {
    console.log('got to facebook auth')
    res.send('got to facebook auth')
  })

  router.post('/', (req, res, next) => {
    axios.get(`https://graph.facebook.com/me?fields=name,id,email,picture&access_token=${req.body.token}`)
    .then(fbUser => {
      // create user
      //generate random access token
      res.send()
    })
    .catch(err => console.log(err))
  })
}

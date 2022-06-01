const logger = require('../../config/logger')

exports.receiveWebHook = async (req, res) => {
  // logger.info(req.body)
  res.status(200).send('EVENT_RECEIVED')
  const { metadata, contacts, messages } = req.body.entry[0].changes[0].value
  if (!contacts?.length) {
    logger.error('some other type event received, can be status')
    return
  }
  const receiverPhone = metadata.display_phone_number
  const receiverName = contacts[0].profile.name
  const message = messages[0].text.body
  const senderNumber = messages[0].from
  console.log({ receiverPhone, receiverName, message, senderNumber })
}

exports.verifyWebHook = async (req, res) => {
  // Your verify token. Should be a random string.
  const VERIFY_TOKEN = '1q@W3e4r5t'

  // Parse the query params
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      res.status(200).send(challenge)
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403)
    }
  }
}

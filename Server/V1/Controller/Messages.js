const axios = require('axios')
const logger = require('../../config/logger')
require('dotenv').config()
const SEND_MESSAGE_URL = process.env.SEND_MESSAGE_URL
const TOKEN = process.env.TOKEN
exports.sendMessage = async (req, res) => {
  const phoneNumber = req.body.phoneNumber
  const template = 'sample_shipping_confirmation'
  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    to: `${phoneNumber}`,
    type: 'template',
    template: {
      name: `${template}`,
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: '5',
            },
          ],
        },
      ],
      language: {
        code: 'en_US',
      },
    },
  })

  const config = {
    method: 'post',
    url: SEND_MESSAGE_URL,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: data,
  }

  const response = await axios(config)
  return res
    .status(200)
    .send({ message: 'message sent', response: response.data })
}

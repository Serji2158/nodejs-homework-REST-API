const Joi = require('joi')

const contactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean().truthy('Y'),
  }).min(1)

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details })
  }
  next()
}

module.exports = { contactValidation }

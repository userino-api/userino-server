import Joi from 'joi'
import joiPhoneNumber from 'joi-phone-number'

// sub lib declares global styles, + extending doesnt support types
const joi: typeof Joi = Joi.extend(joiPhoneNumber)

export default joi

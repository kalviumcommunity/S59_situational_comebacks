const joi = require('joi')

const schema=joi.object({
    line: joi.string().required(),
    effectiveness : joi.string().required(),
    context: joi.string().required(),
    user: joi.string().required()
})


module.exports = {schema}
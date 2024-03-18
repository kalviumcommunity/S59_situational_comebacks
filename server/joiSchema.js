const Joi = require('joi')

const schema = Joi.object({
    line: Joi.string(),
    effectiveness : Joi.string(),
    context: Joi.string(),
    user: Joi.string()
})

const validatePost=(data)=>{
    return schema.validate(data,{abortEarly:false})
}

module.exports = {
    schema,
    validatePost,
}
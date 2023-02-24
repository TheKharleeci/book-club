import Joi from 'joi';

const registerClub = Joi.object({
    name: Joi.string().max(30).required(),
})

export default { registerClub }
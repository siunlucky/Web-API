const Joi = require('joi');

const requiredUserRoleSchema = Joi.object({
    name: Joi
    .string()
    .required()
    .min(2)
    .max(255)
    .messages({
        'string.base': `Name should be a type of 'text'`,
        'string.empty': `Name cannot be an empty field`,
        'string.min': `Name should have a minimum length of {#limit}`,
        'string.max': `Name should have a maximum length of {#limit}`,
        'any.required': `Name is a required field`
    }),
})

const partialUserRoleSchema = Joi.object({
    name: Joi
    .string()
    .min(2)
    .max(255)
    .optional()
    .messages({
        'string.base': `Name should be a type of 'text'`,
        'string.min': `Name should have a minimum length of {#limit}`,
        'string.max': `Name should have a maximum length of {#limit}`,
    }),
});

const requiredRegisterUserSchema = Joi.object({
    firstName: Joi
    .string()
    .required()
    .min(2)
    .max(255)
    .messages({
        'string.base': `First name should be a type of 'text'`,
        'string.empty': `First name cannot be an empty field`,
        'string.min': `First name should have a minimum length of {#limit}`,
        'string.max': `First name should have a maximum length of {#limit}`,
        'any.required': `First name is a required field`
    }),
    lastName: Joi
    .string()
    .optional()
    .min(1)
    .max(255)
    .messages({
        'string.base': `Last name should be a type of 'text'`,
        'string.min': `Last name should have a minimum length of {#limit}`,
        'string.max': `Last name should have a maximum length of {#limit}`,
    }),
    email: Joi
    .string()
    .required()
    .email()
    .messages({
        'string.base': `Email should be a type of 'text'`,
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email should be a valid email`,
        'any.required': `Email is a required field`
    }),
    password: Joi
    .string()
    .required()
    .min(6)
    .max(255)
    .messages({
        'string.base': `Password should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'string.max': `Password should have a maximum length of {#limit}`,
        'any.required': `Password is a required field`
    }),
    phoneNumber: Joi
    .string()
    .required()
    .min(6)
    .max(255)
    .messages({
        'string.base': `Phone number should be a type of 'text'`,
        'string.empty': `Phone number cannot be an empty field`,
        'string.min': `Phone number should have a minimum length of {#limit}`,
        'string.max': `Phone number should have a maximum length of {#limit}`,
        'any.required': `Phone number is a required field`
    }),
})

module.exports = {
    requiredUserRoleSchema,
    partialUserRoleSchema,
    requiredRegisterUserSchema
}
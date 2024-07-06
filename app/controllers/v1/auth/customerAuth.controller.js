const express = require("express");
const { findFirstRoleByName } = require("../../../services/userRole.service");
const { login, register } = require("../../../services/auth.service");
const { successResponse } = require("../../../utils/response");
const { BadRequestError, ValidationError } = require("../../../utils/customError");
const { requiredRegisterUserSchema } = require("../../../utils/schema");

const router = express.Router();

const multer  = require('multer');
const upload = multer()

router.post("/login", upload.none(), async (req, res, next) =>  {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new BadRequestError("Email and password are required"));
        }

        const role = await findFirstRoleByName('customer');

        const token = await login(email, password, role.id);

        const resp = {
            token: token,
        };

        return successResponse(res, resp, 200, 1);

    } catch (error) {
        next(error);
    }
});

router.post("/register", upload.none(), async (req, res, next) =>  {
    try {
        const { error, value } = requiredRegisterUserSchema.validate(req.body);

        if (error) {
            const validationErrors = error.details.map(detail => ({
                name: detail.context.key,
                message: detail.message
            }));

            return next(new ValidationError(validationErrors));
        }

        const role = await findFirstRoleByName('customer');

        const newPartnerData = {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            password: value.password,
            role_id: role.id,
        };

        const token = await register(newPartnerData);

        const resp = {
            token: token,
        };

        return successResponse(res, resp, 200, 1);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
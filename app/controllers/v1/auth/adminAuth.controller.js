const express = require("express");
const { findFirstRoleByName } = require("../../../services/userRole.service");
const { login } = require("../../../services/auth.service");
const { successResponse } = require("../../../utils/response");
const { BadRequestError } = require("../../../utils/customError");

const router = express.Router();

const multer  = require('multer');
const upload = multer()

router.post("/login", upload.none(), async (req, res, next) =>  {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new BadRequestError("Email and password are required"));
        }

        const role = await findFirstRoleByName('admin');

        const token = await login(email, password, role.id);

        const resp = {
            token: token,
        };

        return successResponse(res, resp, 200, 1);


    } catch (error) {
        next(error);
    }
});

module.exports = router;
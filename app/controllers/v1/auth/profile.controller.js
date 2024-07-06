const express = require("express");
const { successResponse } = require("../../../utils/response");
const { getProfile } = require("../../../services/auth.service");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const userId = req.userId;

        const user = await getProfile(userId);

        return successResponse(res, user, 200, 1);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
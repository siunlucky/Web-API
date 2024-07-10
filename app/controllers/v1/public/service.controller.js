const express = require("express");
const { findServices, findServiceById } = require("../../../services/service.service");
const { successResponse } = require("../../../utils/response");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const id = req.query.id;

        if (id) {
            const service = await findServiceById(id);

            return successResponse(res, service, 200, 1);
        }

        let baseQuery = {
            where: {},
            orderBy: {
                created_at: "desc",
            }
        }

        const services = await findServices(baseQuery);

        return successResponse(res, services, 200, services.length);
    } catch (error) {
        next(error);
    }
});

module.exports = router
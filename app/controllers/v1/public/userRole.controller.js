const express = require("express");
const { successResponse } = require("../../../utils/response");
const { findRoles, findRoleById } = require("../../../services/userRole.service");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const id = req.query.id;

        if (id) {
            const role = await findRoleById(id);

            return successResponse(res, role, 200, 1)
        }

        let baseQuery = {
            where: {},
            select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
                created_by: true,
                updated_by: true,
            },
            orderBy: {
                created_at: "desc",
            }
        }

        const roles = await findRoles(baseQuery);

        return successResponse(res, roles, 200, roles.length)
    } catch (error) {
        next(error);
    }
})

module.exports = router;
const express = require("express");

const db = require("../../../config/db");
const { findRoleById, findRoles, createRole, deleteRoleById } = require("../../../services/userRole.service");
const { successResponse, createdResponse } = require("../../../utils/response");
const { requiredUserRoleSchema } = require("../../../utils/schema");
const { ValidationError, BadRequestError } = require("../../../utils/customError");

const router = express.Router();

const multer  = require('multer');
const upload = multer()

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


router.post("/", upload.none(), async (req, res, next) => {
    try {
        const { error, value } = requiredUserRoleSchema.validate(req.body);

        if (error) {
            const validationErrors = error.details.map(detail => ({
                name: detail.context.key,
                message: detail.message
            }));

            return next(new ValidationError(validationErrors));
        }

        let newRoleData = value;

        await createRole(newRoleData);

        return createdResponse(res)
    } catch (error) {
        next(error);
    }
})

router.delete("/", async (req, res, next) => {
    try {
        const id = req.query.id;

        if (!id) {
            throw new BadRequestError("ID is required");
        }

        await deleteRoleById(id);

        return successResponse(res, "Resource deleted successfully", 200, 0)
    } catch (error) {
        next(error);
    }
});
module.exports = router;
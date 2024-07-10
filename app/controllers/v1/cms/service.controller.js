const express = require("express");
const multer  = require('multer');
const { findServiceById, findServices, createService, deleteServiceById, editService } = require("../../../services/service.service");
const { successResponse, createdResponse } = require("../../../utils/response");
const { requiredServiceRoleSchema, partialServiceRoleSchema } = require("../../../utils/schema");
const { BadRequestError, ValidationError } = require("../../../utils/customError");

const router = express.Router();
const upload = multer()

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

router.post("/", upload.none(), async (req, res, next) => {
    try {
        const { error, value } = requiredServiceRoleSchema.validate(req.body);

        if (error) {
            const validationErrors = error.details.map(detail => ({
                name: detail.context.key,
                message: detail.message
            }));

            return next(new ValidationError(validationErrors));
        }

        const userId = req.userId;
        
        const newRoleData = {
            ...value,
            created_by : userId,
            updated_by : userId
        };

        await createService(newRoleData);

        return createdResponse(res);
    } catch (error) {
        next(error);
    }
})

router.patch("/" , upload.none(), async (req, res, next) => {
    try {
        const id = req.query.id;

        if (!id) {
            throw new BadRequestError("Id is required");
        }

        const { error, value } = partialServiceRoleSchema.validate(req.body);

        if (error) {
            const validationErrors = error.details.map(detail => ({
                name: detail.context.key,
                message: detail.message
            }));

            return next(new ValidationError(validationErrors));
        }

        const userId = req.userId;

        let newRoleData = {
            ...value,
            updated_by: userId
        };

        await editService(id, newRoleData);

        return successResponse(res, {"message" : "Resource updated successfully"}, 200, 1)
    } catch (error) {
        next(error);
    }
})

router.delete("/", async (req, res, next) => {
    try {
        const id = req.query.id

        if (!id) {
            throw new BadRequestError("Service id is required");
        }

        await deleteServiceById(id);

        return successResponse(res, {"message" : "Resource deleted successfully"}, 200, 0)
    } catch (error) {
        next(error);
    }
})

module.exports = router;
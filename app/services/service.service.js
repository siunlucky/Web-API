const db = require("../config/db");
const { NotFoundError } = require("../utils/customError");

const findServices = async (query) => {
    const services = await db.service.findMany(query);

    return services;
}  

const findServiceById = async (id) => {
    const service = await db.service.findUnique({
        where: {
            id: id
        }
    });

    if (!service) {
        throw new NotFoundError("Service not found");
    }

    return service;
}

const editService = async (id, NewData) => {
    await findServiceById(id);

    const newServiceData = await db.service.update({
        where: {
            id: id
        },
        data : NewData
    })

    return newServiceData;
}

const createService = async (data) => {
    const newService = await db.service.create({
        data: data
    });

    return newService;
}

const deleteServiceById = async (id) => {
    await findServiceById(id);

    await db.service.delete({
        where: {
            id: id
        }
    });
}


module.exports = {
    findServices,
    findServiceById,
    createService,
    editService,
    deleteServiceById
}
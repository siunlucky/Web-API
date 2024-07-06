const db = require("../config/db");
const { NotFoundError } = require("../utils/customError");

const findRoles = async (query) => {
    const roles = await db.userRole.findMany(query);

    return roles;
}

const findRoleById = async (id) => {
    const role = await db.userRole.findUnique({
        where: {
            id: id
        }
    });

    if (!role) {
        throw new NotFoundError("Role not found");
    }

    return role;
}

const findFirstRoleByName = async (name) => {
    const role = await db.userRole.findFirst({
        where: {
            name: name
        }
    });

    if (!role) {
        throw new NotFoundError("Role not found");
    }

    return role;
}

const createRole = async (data) => {
    const role = await db.userRole.create({
        data: data
    });

    return role;

}

const deleteRoleById = async (id) => {
    await findRoleById(id);

    await db.userRole.delete({
        where: {
            id: id
        }
    });

}
module.exports = {
    findRoles,
    findRoleById,
    createRole,
    deleteRoleById,
    findFirstRoleByName
}
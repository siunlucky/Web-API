const db = require("../config/db");
const { NotFoundError } = require("../utils/customError");

const findUserByEmailRole = async (email, roleId) => {
    const user = await db.user.findFirst({
        where: {
            email: email,
            role_id: roleId
        }
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user;
}

module.exports = {
    findUserByEmailRole
}
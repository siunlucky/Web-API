const { compare, hash } = require("bcrypt");
const db = require("../config/db");
const { NotFoundError, ValidationError } = require("../utils/customError");
const { jwtSign } = require("../utils/jwtTokenControl");
const { findUserByEmailRole } = require("./user.service");

const login = async (email, password, roleId) => {
    const user = await findUserByEmailRole(email, roleId);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
        throw new NotFoundError("User not found");
    }

    const payload = {
        id: user.id,
        email: user.email,
        role_id: user.role_id
    };

    const token = await jwtSign(payload);

    return token;
}

const register = async (data) => {
    const isUserExist = await db.user.findFirst({
        where: {
            email: data.email,
            role_id: data.role_id
        }
    });

    if (isUserExist) {
        throw new ValidationError({
            name: "email",
            message: "Email already exist."
        });
    }

    try {
        data.password = await hash(data.password, 10);
    } catch (error) {
        throw new Error("Password hashing failed");
    }

    const newUser = await db.user.create({
        data: {
            email: data.email,
            password: data.password,
            role_id: data.role_id,
            firstName: data.firstName,
            lastName: data.lastName
        }
    });

    const payload = {
        id: newUser.id,
        email: newUser.email,
        role_id: newUser.role_id
    };

    const token = await jwtSign(payload);

    return token;
}

const getProfile = async (userId) => {
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            address: true,
            profile_uri: true,
            role_id: true,
            role: true,
            updated_at: true,
        },
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user;

}

module.exports = {
    login,
    register,
    getProfile
}
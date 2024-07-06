const { TokenExpiredError } = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/customError");
const { jwtVerify } = require("../utils/jwtTokenControl");

async function adminMiddleware(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return next(new UnauthorizedError("No token provided"));
    }

    if (!token.startsWith('Bearer ')) {
        return next(new UnauthorizedError("Invalid token"));
    }

    try {
        const decoded = await jwtVerify(token.split(' ')[1], process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            throw new UnauthorizedError("Need admin role to access this route");
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return next(new UnauthorizedError("Token has expired"));
        } else {
            return next(new UnauthorizedError("Invalid token"));
        }
    }
}

async function partnerMiddleware(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return next(new UnauthorizedError("No token provided"));
    }

    if (!token.startsWith('Bearer ')) {
        return next(new UnauthorizedError("Invalid token"));
    }

    try {
        const decoded = await jwtVerify(token.split(' ')[1], process.env.JWT_SECRET);

        if (decoded.role !== 'partner') {
            throw new UnauthorizedError("Need partner role to access this route");
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return next(new UnauthorizedError("Token has expired"));
        } else {
            return next(new UnauthorizedError("Invalid token"));
        }
    }
}

async function customerMiddleware(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return next(new UnauthorizedError("No token provided"));
    }

    if (!token.startsWith('Bearer ')) {
        return next(new UnauthorizedError("Invalid token"));
    }

    try {
        const decoded = await jwtVerify(token.split(' ')[1], process.env.JWT_SECRET);

        if (decoded.role !== 'customer') {
            throw new UnauthorizedError("Need customer role to access this route");
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return next(new UnauthorizedError("Token has expired"));
        } else {
            return next(new UnauthorizedError("Invalid token"));
        }
    }
}

async function authMiddleware(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return next(new UnauthorizedError("No token provided"));
    }

    if (!token.startsWith('Bearer ')) {
        return next(new UnauthorizedError("Invalid token"));
    }

    try {
        const decoded = await jwtVerify(token.split(' ')[1], process.env.JWT_SECRET);

        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return next(new UnauthorizedError("Token has expired"));
        } else {
            return next(new UnauthorizedError("Invalid token"));
        }
    }
}

module.exports = {
    partnerMiddleware,
    customerMiddleware,
    authMiddleware,
    adminMiddleware
};
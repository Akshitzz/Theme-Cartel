import jwt from "jsonwebtoken";
import User from "../../schema/User.js";
import asyncHandler from "../../utils/asynchandler.js";
import { ApiError } from "../../utils/ApiError.js";

export const protect = asyncHandler(async (req, res, next) => {
    // access token comes from authorization header: "Bearer token"
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        throw new ApiError(401, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Session expired. Please refresh your token');
        }
        throw new ApiError(401, 'Unauthorized');
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
        throw new ApiError(401, 'User no longer authorized');
    }
    req.user = user;
    next();
});

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, 'You are not authorized to perform this action'));
        }
        next();
    };
};
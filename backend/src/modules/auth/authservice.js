// functions related to authentication, such as registering a user, logging in, etc.

//token helper function this functions are made to generate tokens 
import jwt from "jsonwebtoken";
import User from "../../schema/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { ApiError } from "../../utils/ApiError.js";

const generateaccesstoken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '10m' });
}

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '15d' });
}

// cookies -http only cookies are not accessible via javascript and are only sent to the server, which helps prevent XSS attacks.
// secure cookies are only sent over HTTPS, which helps prevent man-in-the-middle attacks. SameSite cookies restrict how cookies are sent with cross-site requests, which can help prevent CSRF attacks.

export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
}

//register function 

export const registeruser = async ({ firstName, lastName, email, password }) => {
    const existing = await User.findOne({ email });
    if (existing) {
        throw new ApiError(400, 'User already exists');
    }
    const hashedpass = await bcrypt.hash(password, 12);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedpass,
    });

    const accessToken = generateaccesstoken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    };
}

export const loginuser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, 'Invalid email or password');
    }
    const accessToken = generateaccesstoken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        }
    }
}

export const refreshAccessToken = (refreshToken) => {
    if (!refreshToken) throw new ApiError(401, "No refresh token provided");

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = generateaccesstoken(decoded.id);
        return { accessToken: newAccessToken };
    } catch {
        throw new ApiError(401, "Invalid or expired refresh token. Please log in again.");
    }
};

export const forgotpassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        // Don't leak whether the user exists — return silently
        return null;
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 3600000;
    await user.save();
    return resetToken;
}

export const resetpassword = async (rawtoken, newpassword) => {
    const hashedToken = crypto.createHash('sha256').update(rawtoken).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) {
        throw new ApiError(400, 'Invalid or expired reset token');
    }
    const hashedpass = await bcrypt.hash(newpassword, 12);
    user.password = hashedpass;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return {
        message: "Password reset successful"
    };
}
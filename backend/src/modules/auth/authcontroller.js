import asyncHandler from "../../utils/asynchandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

import {
  registeruser,
  loginuser,
  refreshAccessToken,
  forgotpassword,
  resetpassword,
  cookieOptions,
} from "./authservice.js";



const sendTokenResponse = (
  res,
  statusCode,
  { accessToken, refreshToken, user, message }
) => {
  if (!refreshToken) {
    throw new ApiError(500, "Refresh token missing");
  }

  res
    .cookie("refreshToken", refreshToken, cookieOptions)
    .status(statusCode)
    .json(
      new ApiResponse(
        statusCode,
        {
          accessToken, 
          user,
        },
        message
      )
    );
};



export const register = asyncHandler(async (req, res) => {
  const result = await registeruser(req.body);

  sendTokenResponse(res, 201, {
    ...result,
    message: "Account created successfully",
  });
});



export const login = asyncHandler(async (req, res) => {
  const result = await loginuser(req.body);

  sendTokenResponse(res, 200, {
    ...result,
    message: "Logged in successfully",
  });
});


export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    throw new ApiError(401, "No refresh token provided");
  }

  const result = await refreshAccessToken(token);

  res.status(200).json(
    new ApiResponse(200, result, "Access token refreshed")
  );
});


export const logout = asyncHandler(async (req, res) => {


  res
    .clearCookie("refreshToken", {
      ...cookieOptions,
      maxAge: 0,
    })
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});



export const forgotPasswordController = asyncHandler(async (req, res) => {
  await forgotpassword(req.body.email);

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      "If an account with that email exists, a reset link has been sent"
    )
  );
});



export const resetPasswordController = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(400, "Reset token is required");
  }

  const result = await resetpassword(token, req.body.password);

  res.status(200).json(
    new ApiResponse(200, result, "Password reset successful")
  );
});
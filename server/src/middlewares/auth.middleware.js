import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    //get token from cookies or headers
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.replace("bearer ", "");

    //if token is not present, throw an error
    if (!token) {
      res.status(401).json(new ApiResponse(401, {}, "Unauthorized access"));
    }

    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //get user details from database
    const user = await User.findById(decoded?.id).select(
      "-password -refreshToken"
    );

    //if user is not found, throw an error
    if (!user) {
      res
        .status(401)
        .json(new ApiResponse(401, {}, "Unauthorized access user not found"));
    }

    //attach user details to the request object
    req.user = user;
    next();
  } catch (error) {
    //if there is an error, throw an error
    res.status(401).json(new ApiResponse(401, {}, "Invalid access token"));
  }
});

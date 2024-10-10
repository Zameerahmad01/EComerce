import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/appError";
import { ApiResponse } from "../utils/apiResponse";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to generate access token and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new AppError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(400, "User already exists");
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new AppError(500, "Failed to create user");
  }

  res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(400, "Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AppError(400, "Invalid password");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        loggedInUser,
        accessToken,
        refreshToken,
        "user logged in successfully"
      )
    );
});

export { registerUser, loginUser };

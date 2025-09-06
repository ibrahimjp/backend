import asyncHandler from "../utils/asyncHandler.js";
import ApiErrors from "../utils/apiErrors.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, fullname, avatar } = req.body;
    if(!username || !email || !password || !fullname || !avatar){
        throw new ApiErrors(400, "All fields are required");
    }
    const anotherUser = await User.findOne({$or: [{username}, {email}]});
    if(anotherUser){
        throw new ApiErrors(400, "User already exists");
    }
    
    const avatarLocalPath = req.files.avatar[0].path;
    const coverImageLocalPath = req.files.coverImage[0].path;
    if(!avatarLocalPath){
        throw new ApiErrors(400, "Avatar is required");
    }
    const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
    const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatarUrl){
        throw new ApiErrors(400, "Avatar is required");
    }
    
    const user = await User.create({username, email, password, fullname, avatar: avatarUrl.url, coverImage: coverImageUrl?.url || ""});

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiErrors(500, "something went wrong");
    }
    
    return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));
}); 
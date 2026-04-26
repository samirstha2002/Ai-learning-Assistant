const jwt = require("jsonwebtoken");
const User = require("../models/User");

//generate JwT TOKEN

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

//@desc Register new User
//@route POST/api/auth/register
//@access Public

const register = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

//@desc Login user
//@route POST /api/auth/login
//@access Public

const login = async (req, res, next) => {};

//@desc Get user PROFILE
//@ROUTE Get /api/auth/Profile
//@acces Private

const getProfile = async (req, res, next) => {};

//@desc Update user profile
//@route Put /api/auth/profile
//access Private

const updateProfile = async (req, res, next) => {};

//@desc Change Password
//@route POST/API/AUTH/CHANGEPASSWORD
//@ACCESS PRIVATE

const changePassword = async (req, res, next) => {};

module.exports = { login, register, getProfile, updateProfile, changePassword };

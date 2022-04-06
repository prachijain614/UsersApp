const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    /** If user is already registered */
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message:
        "Email is already registered with pur system. Please try to Login.",
    });
  }

  /** creating and saving new user document in the DB */
  let user = await User.create(req.body);

  /** generating JWT token with expiration period of 2 hours */
  const token = jwt.sign(
    { user_id: user._id, email: user.email },
    process.env.TOKEN_KEY /** It can be any random chars key */,
    {
      expiresIn: "2h",
    }
  );

  return res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "User created successfully.",
    payload: user.transform(),
    token,
  });
};

const login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    /** If user is not registered */
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: "User not found! Please try with different email.",
    });
  }

  /** checking for the password */
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    /** If password is incorrect */
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: "Incorrect email address or password. Please try again",
    });
  }

  /** If correct then generating a token for the user */
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });

  return res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "You have successfully logged in.",
    payload: user.transform(),
    token,
  });
};

module.exports = {
  signup,
  login,
};

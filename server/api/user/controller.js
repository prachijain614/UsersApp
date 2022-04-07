const User = require("../../model/user");
const httpStatus = require("http-status");

const getUsers = async (req, res) => {
  const { search } = req.query;
  try {
    const user = await User.aggregate([
      {
        $match: {
          $or: [
            { firstname: { $regex: search, $options: "i" } },
            { lastname: { $regex: search, $options: "i" } },
          ],
        },
      },
    ]);
    /** find the user list and return the response */
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "success.",
      payload: user,
    });
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: "Failed",
    });
  }
};

const editUser = async (req, res) => {
  let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    useFindAndModify: false,
  });
  if (!user) {
    /** If user is not present in DB */
    return res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: "User not found",
    });
  }
  return res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "success.",
    payload: user,
  });
};
module.exports = { getUsers, editUser };

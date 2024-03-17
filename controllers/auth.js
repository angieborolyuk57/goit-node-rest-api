const { User } = require("../models/users");
const { HttpError, CntrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if( user) {
    throw new HttpError(409, "Email in use");
  }
  const newUser = await User.create(req.body);
  res.json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register: CntrlWrapper(register),
};

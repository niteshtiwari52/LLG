import { UserModel } from "../../database/user";

export const signUp = async (req, res) => {
  try {
    await UserModel.isUserExist(req.body.credentials);

    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({
      success: true,
      message: "User Registration Successful...",
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);

    const token = user.generateJwtToken();
    return res.status(200).json({
      status: "success",
      message: "User Logged In Successfully..",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

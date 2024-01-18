export const getUser = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "Un-Authorize Access...Please Sign In again",
    });
  }
};

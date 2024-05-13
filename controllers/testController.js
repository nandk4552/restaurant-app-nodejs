const testController = async (req, res) => {
  try {
    res.status(200).send({
        success: true,
        message: "Test user data API success"
    })
  } catch (error) {
    console.log("Error in Test API controller", error);
  }
};

module.exports = { testController };

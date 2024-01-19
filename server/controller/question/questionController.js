import { OptionModel } from "../../database/option";
import { QuestionModel } from "../../database/question";

// trial
export const welcomeQuestion = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Welcome to Question Routes.",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Welcome to Question Routes.",
      error: error.message,
    });
  }
};

/**
 *  Creating Question
 */

export const CreateQuestion = async (req, res) => {
  try {
    const {
      questionText,
      options,
      correctOption,
      language,
      difficulty,
      level,
    } = req.body.questionData;

    // creating questions
    const newQuestion = await QuestionModel.create({
      question: questionText,
      language,
      difficulty,
      level,
    });

    // Creating options and attaching them with the question
    const createdOptions = await OptionModel.insertMany(
      options.map((optionText) => ({
        questionId: newQuestion._id,
        option: optionText,
      }))
    );

    // Set correct option for the question
    const correctOptionDoc = createdOptions.find(
      (option) => option.option === correctOption
    );
    if (correctOptionDoc) {
      await QuestionModel.findByIdAndUpdate(
        newQuestion._id,
        {
          options: createdOptions.map((option) => option._id),
          correctOption: correctOptionDoc._id,
        },
        { new: true }
      );
      // Fetching reponse
      // Fetch the populated question document with options and correct option
      const populatedQuestion = await QuestionModel.findById(newQuestion._id)
        .populate("options", "option") // Populating options with only 'option' field
        .populate("correctOption", "option"); // Populating correct option with only 'option' field

      // console.log(populatedQuestion);
      // Extract necessary fields for the response
      const {
        _id: questionId,
        question,
        options: populatedOptions,
        correctOption: populatedCorrectOption,
        language,
        difficulty,
        level,
      } = populatedQuestion;

      // Extract additional details for options
      const optionsWithDetails = populatedOptions.map(
        ({ _id: optionId, option }) => ({ optionId, option })
      );

      // Extract additional details for correct option
      const correctOptionWithDetails = {
        optionId: populatedCorrectOption._id,
        option: populatedCorrectOption.option,
      };

      // Construct the response payload
      const responsePayload = {
        questionId,
        question,
        options: optionsWithDetails,
        correctOption: correctOptionWithDetails,
        language,
        level,
        difficulty,
      };
      res.status(201).json({
        success: true,
        message: "Question Created Successfully",
        responsePayload,
      });
    } else {
      // If correct option is not found, handle the error
      return res
        .status(400)
        .json({ error: "Correct option not found among the provided options" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

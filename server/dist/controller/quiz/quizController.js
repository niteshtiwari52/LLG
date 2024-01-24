"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.welcomeQuiz = exports.getAllAttemptedQuizes = exports.SubmitQuiz = exports.CreateQuiz = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _attemptedquiz = require("../../database/attemptedquiz");
var _option = require("../../database/option");
var _question = require("../../database/question");
var _quiz = require("../../database/quiz");
var _userDetails = require("../../database/userDetails");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const welcomeQuiz = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Welcome to quiz Routes."
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Welcome to Question Routes.",
      error: error.message
    });
  }
};
exports.welcomeQuiz = welcomeQuiz;
const CreateQuiz = async (req, res) => {
  try {
    const {
      language
    } = req.body;
    const userId = req.user;

    // Define the number of questions for each difficulty level
    const numEasyQuestions = 7;
    const numMediumQuestions = 2;
    const numHardQuestions = 2;

    // Fetch random easy, medium, and hard questions for the given language
    const easyQuestions = await _question.QuestionModel.aggregate([{
      $match: {
        language,
        difficulty: "easy"
      }
    }, {
      $sample: {
        size: numEasyQuestions
      }
    }]);
    const mediumQuestions = await _question.QuestionModel.aggregate([{
      $match: {
        language,
        difficulty: "medium"
      }
    }, {
      $sample: {
        size: numMediumQuestions
      }
    }]);
    const hardQuestions = await _question.QuestionModel.aggregate([{
      $match: {
        language,
        difficulty: "hard"
      }
    }, {
      $sample: {
        size: numHardQuestions
      }
    }]);

    // Combine the questions
    const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

    // Shuffle the combined questions
    const shuffledQuestions = shuffleArray(allQuestions);
    if (shuffledQuestions.length == 0) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found for this language"
      });
    }
    // Create a quiz with the shuffled questions
    const newQuiz = await _quiz.QuizModel.create({
      questions: shuffledQuestions
    });
    const quizQuestions = newQuiz.questions;

    // update user details
    // const userAttemptedNewQuiz = await UserDetailModel.fin;

    // When user started quiz then if not submitted the progress will be saved as pending
    const attemptQuizData = {
      userID: req.user,
      quizId: newQuiz._id,
      selectedAnswers: quizQuestions.map(questionID => ({
        questionId: questionID,
        selectedOptionId: null // You can update this with the actual selected option ID
      })),
      score: 0,
      feedback: "You Started Quiz",
      status: "pending"
    };
    const initializeQuiz = await _attemptedquiz.AttemptedQuizModel.create(attemptQuizData);
    // Retrieve the latest attempted quiz for the user
    const latestAttemptedQuiz = await _attemptedquiz.AttemptedQuizModel.findOne({
      userID: userId,
      quizId: initializeQuiz.quizId
    }).sort({
      createdAt: -1
    }).exec();

    // Check if there is a latest attempted quiz
    if (!latestAttemptedQuiz) {
      return res.status(404).json({
        succecs: false,
        message: "No attempted quiz found for the user"
      });
    }

    // Update the UserDetailModel with the extracted data
    const result = await _userDetails.UserDetailModel.updateOne({
      userID: userId
    }, {
      $push: {
        attemptedQuiz: latestAttemptedQuiz._id // Store only the ObjectId
      }
    });

    // const updatedUserDetail = await UserDetailModel.findOne({ userID: userId });

    // Fetch detailed information for each question in the quiz
    const populatedQuestions = await Promise.all(shuffledQuestions.map(async question => {
      const questionDetails = await _question.QuestionModel.findById(question._id);
      const populatedOptions = await Promise.all(question.options.map(async option => {
        const optionDetails = await _option.OptionModel.findById(option._id);
        return {
          optionID: optionDetails._id,
          option: optionDetails.option
        };
      }));
      return {
        questionId: questionDetails._id,
        question: questionDetails.question,
        options: populatedOptions,
        level: questionDetails.level,
        difficulty: questionDetails.difficulty,
        language: questionDetails.language
      };
    }));
    const responsePayload = {
      language,
      // user: req.user,
      quizID: newQuiz._id,
      quizQuestions: populatedQuestions
    };
    res.status(200).json({
      success: true,
      message: "quiz created successfully",
      responsePayload
      // initializeQuiz,
      // latestAttemptedQuiz,
      // updatedUserDetail,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Shuffle array function
exports.CreateQuiz = CreateQuiz;
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// quizData = {
//   quizId: "your_quiz_id",
//   userId: "user_id",
//   answers: [
//     { questionId: "question_id_1", selectedOptionId: "selected_option_id_1" },
//     { questionId: "question_id_2", selectedOptionId: "selected_option_id_2" },
//     // ... for each question
//   ],
// };

// Function to calculate score for a given question and selected option
const calculateScoreForQuestion = async (questionId, selectedOptionId) => {
  try {
    // Fetch the question document from the database
    const question = await _question.QuestionModel.findById(questionId);
    if (!question) {
      return {
        error: "Question not found"
      };
    }

    // Check if the selected option is correct
    const isCorrect = question.correctOption && question.correctOption.equals(selectedOptionId);

    // Assign marks based on difficulty level
    let marks = 0;
    if (isCorrect) {
      const difficulty = question.difficulty;
      if (difficulty === "easy") {
        marks = 2;
      } else if (difficulty === "medium") {
        marks = 3;
      } else if (difficulty === "hard") {
        marks = 5;
      }
    }
    return {
      marks
    };
  } catch (error) {
    return {
      error: error.message
    };
  }
};
const SubmitQuiz = async (req, res) => {
  try {
    const {
      submittedQuiz
    } = req.body;
    const {
      quizId,
      userId,
      answers
    } = submittedQuiz;

    // Fetch the quiz document from the database and populate the 'questions' field
    const quiz = await _quiz.QuizModel.findById(quizId).populate("questions");
    if (!quiz) {
      return res.status(404).json({
        error: "Quiz not found"
      });
    }
    const quizQuestions = quiz.questions;

    // Calculate the total score for the submitted quiz
    let totalScore = 0;
    for (const {
      questionId,
      selectedOptionId
    } of answers) {
      const result = await calculateScoreForQuestion(questionId, selectedOptionId);
      if (result.error) {
        return res.status(404).json(result);
      }
      totalScore += result.marks;
    }

    // Map the answers to match the AttemptedQuizModel's selectedAnswers structure
    const mappedAnswers = answers.map(({
      questionId,
      selectedOptionId
    }) => ({
      questionId,
      selectedOptionId
    }));

    // Update the AttemptedQuizModel with the calculated score, selectedOptionId, and set status to "completed"
    const updatedAttemptQuizDetails = await _attemptedquiz.AttemptedQuizModel.findOneAndUpdate({
      quizId,
      userID: userId
    }, {
      $set: {
        selectedAnswers: mappedAnswers,
        score: totalScore,
        status: "completed",
        feedback: `you have completed quiz successfully. You Scored : ${totalScore}`
      }
    }, {
      new: true
    });
    let averageScore = 0;
    let userDetailAverageScoreUpdate;
    const allAttemptedQuizes = await _attemptedquiz.AttemptedQuizModel.find({
      userID: userId
    });
    if (allAttemptedQuizes.length !== 0) {
      // Calculate total score for all quizzes
      const totalScore = allAttemptedQuizes.reduce((acc, quiz) => acc + quiz.score, 0);
      averageScore = totalScore / allAttemptedQuizes.length;

      // leaderboard rank

      userDetailAverageScoreUpdate = await _userDetails.UserDetailModel.findOneAndUpdate({
        userID: userId
      }, {
        $set: {
          averageScore: Math.floor(averageScore)
          // leadeboard rank
        }
      }, {
        new: true
      });
    }

    // calculating rank
    // Fetch all user details
    const allUserDetails = await _userDetails.UserDetailModel.find().sort({
      averageScore: "desc",
      "attemptedQuiz.length": "desc" // Sorting by the number of attempted quizzes
    });

    // Find the index of the user in the sorted array
    const userIndex = allUserDetails.findIndex(user => user.userID.toString() === userId.toString());

    // Calculate rank (1-based index)
    const userRank = userIndex + 1;

    // update the rank in userDetails
    const finalUserDetailUpdate = await _userDetails.UserDetailModel.findOneAndUpdate({
      userID: userId
    }, {
      $set: {
        leaderboardRank: userRank
      }
    }, {
      new: true
    });
    if (!updatedAttemptQuizDetails) {
      return res.status(404).json({
        error: "Attempted quiz not found"
      });
    }
    const responsePayload = {
      quizTotalScore: totalScore,
      userAvergeScore: Math.floor(averageScore),
      userRank: userRank
    };
    // Return the total score
    res.status(200).json({
      success: true,
      message: "You submitted quiz Successfully",
      responsePayload
      // mappedAnswers,
      // averageScoreResult,
      // averageScore,
      // userRank,
      // totalAttemptQuizes: allAttemptedQuizes.length,
      // updatedAttemptQuizDetails,
      // allAttemptedQuizes,
      // userDetailAverageScoreUpdate,
    });

    //  userId, quizId, totalScore, updatedAttemptQuizDetails
    //  score calculate

    // attempt quiz details update

    // feedback to user

    // res.status(200).json({
    //   success: true,
    //   quiz,
    //   submittedQuiz,
    // });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Internal Server Error"
    });
  }
};
exports.SubmitQuiz = SubmitQuiz;
const getAllAttemptedQuizes = async (req, res) => {
  try {
    const user = req.user;
    const allAttemptedQuizes = await _attemptedquiz.AttemptedQuizModel.find({
      userID: user._id
    }).sort({
      createdAt: -1
    });
    // .populate("quizId")
    // .populate("selectedAnswers.questionId")
    // .populate("selectedAnswers.selectedOptionId");
    const allAttemptedQuizesData = allAttemptedQuizes.map((allquizes, index) => ({
      userId: allquizes.userID,
      quizNo: index + 1,
      quizId: allquizes.quizId,
      quizScore: allquizes.score,
      quizStatus: allquizes.status
    }));
    res.status(200).json({
      success: true,
      allAttemptedQuizes: allAttemptedQuizesData
    });
  } catch (error) {
    res.status(500).json({
      succecs: false,
      error: error.message
    });
  }
};
exports.getAllAttemptedQuizes = getAllAttemptedQuizes;
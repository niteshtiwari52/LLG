import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateQuizAction,
  clearSubmitQuizAction,
  createNewQuizAction,
  submitQuizAction,
} from "../../../redux/reducers/quiz/quiz.action";

const NewQuiz = () => {
  const dispatch = useDispatch();

  // Extracting data from redux store
  const quizDataFromStore = useSelector(
    (globalState) => globalState.quiz.createdQuiz
  );
  const user = useSelector((globalState) => globalState.user.selfUser);
  const quizSubmittedData = useSelector(
    (globalState) => globalState.quiz.submittedQuiz
  );

  // States
  // for opening and closing modal
  let [isOpen, setIsOpen] = useState(false);

  let questionsArray = [];
  if (quizDataFromStore && quizDataFromStore.responsePayload) {
    questionsArray = quizDataFromStore.responsePayload.quizQuestions;
    // Rest of your code
  }
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizSubmitLoading, setQuizSubmitLoading] = useState(false);
  const [isInstructionRead, setIsInstructionRead] = useState(false);
  const [quizCreated, setQuizCreated] = useState(false);
  // const [selected, setSelected] = useState(plans[0]);
  const [selected, setSelected] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // console.log(quizLoading);
  // console.log(quizSubmitLoading);

  // initial Data for quiz submission
  const usersQuizAnswersInitialData = {
    quizId: "",
    userId: user ? user._id : "",
    answers: [],
  };
  const [usersQuizAnswers, setUsersQuizAnswers] = useState(
    usersQuizAnswersInitialData
  );

  // if a quiz submitted and response available for submitted quiz
  useEffect(() => {
    if (
      quizSubmittedData &&
      quizSubmittedData.success &&
      quizSubmittedData.responsePayload
    ) {
      openModal();
    }
  }, [quizSubmittedData]);
  // when quiz created
  useEffect(() => {
    if (quizDataFromStore && quizDataFromStore.success) {
      setQuizCreated(true);
    } else {
      setQuizCreated(false);
      return;
    }
  }, [quizDataFromStore]);

  function closeModal() {
    dispatch(clearCreateQuizAction());
    dispatch(clearSubmitQuizAction());
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Function to handle the selection change
  const handleLanguageSelection = (event) => {
    // Update the state with the selected value
    if (event.target.value != "") {
      setSelectedLanguage(event.target.value);
    } else {
      setSelectedLanguage(null);
    }
  };

  const launchQuiz = () => {
    setQuizLoading(true);
    if (selectedLanguage != null) {
      setQuizCreated(true);
      const data = {
        language: selectedLanguage,
      };
      dispatch(createNewQuizAction(data));
    } else {
      alert("please select a language");
    }
    setQuizLoading(false);
  };
  const handleNextQuestion = () => {
    if (currentQuestion < questionsArray.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const handleOptionSelect = (questionId, selectedOptionId) => {
    // Check if the questionId already exists in the submittedQuiz
    const existingAnswerIndex = usersQuizAnswers.answers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex !== -1) {
      // If the questionId exists, update the selectedOptionId
      setUsersQuizAnswers((prevSubmittedQuiz) => ({
        ...prevSubmittedQuiz,
        // quizId: QuizID
        answers: prevSubmittedQuiz.answers.map((answer, index) =>
          index === existingAnswerIndex
            ? { ...answer, selectedOptionId }
            : answer
        ),
      }));
    } else {
      // If the questionId doesn't exist, add a new answer
      setUsersQuizAnswers((prevSubmittedQuiz) => ({
        ...prevSubmittedQuiz,
        answers: [
          ...prevSubmittedQuiz.answers,
          { questionId, selectedOptionId },
        ],
      }));
    }
  };
  const submitQuiz = () => {
    // if (usersQuizAnswers.answers.length < 11) {
    //   alert("please attempt all 11 questionns");
    // } else {
    setQuizSubmitLoading(true);
    setUsersQuizAnswers((prevSubmittedQuiz) => ({
      ...prevSubmittedQuiz,
      quizId:
        quizDataFromStore && quizDataFromStore.success
          ? quizDataFromStore.responsePayload.quizID
          : alert("An Error Occured!!\nPlease Refresh your page"),
    }));
    dispatch(submitQuizAction(usersQuizAnswers));
    setQuizSubmitLoading(false);
    // }
  };

  const clearSelectedLanguage = () => {
    setSelectedLanguage(null);
  };

  function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <>
      <div class="my-4 max-w-screen-md w-3/4 border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        {/* NEw Quizz heading start */}
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="shrink-0 mr-auto sm:py-3 w-full">
            {quizCreated ? (
              <>
                <div className={`mt-6 justify-center sm:flex sm:gap-4`}>
                  {/* <button
                    className="inline-block rounded border border-teal-700 bg-teal-600 px-12 py-3 text-sm font-medium text-white hover:bg-teal-700 hover:text-white"
                    onClick={handlePreviousQuestion}
                  >
                    previous Question
                  </button> */}
                  <button
                    disabled={quizSubmitLoading}
                    className="inline-block rounded border border-teal-700 bg-teal-600 px-12 py-3 text-sm font-medium text-white hover:bg-teal-700 hover:text-white"
                    onClick={submitQuiz}
                  >
                    {quizSubmitLoading == true
                      ? "Submitting...."
                      : "submit Quiz"}
                  </button>
                  <button
                    disabled={quizLoading}
                    className="inline-block flex rounded border border-teal-700 bg-teal-600 px-12 py-3 text-sm font-medium text-white hover:bg-teal-700 hover:text-white"
                    onClick={handleNextQuestion}
                  >
                    {quizLoading ? "Loading ...." : "Next Question"}

                    <svg
                      className={`h-5 ${
                        quizLoading ? `hidden` : ``
                      } w-5 rtl:rotate-180`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <p class="font-medium text-3xl text-center">Start New Quiz</p>
              </>
            )}
          </div>
        </div>
        {/* New quiz heading end */}

        {quizCreated ? (
          <>
            {/* New quiz Question  and option rendering  */}
            {/* <article className="rounded-xl border border-gray-700 bg-white p-4"> */}
            {questionsArray &&
              questionsArray.map((question, index) => (
                <article
                  key={index}
                  className={`rounded-xl border border-gray-700 bg-white p-4 ${
                    index === currentQuestion ? "" : "hidden"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* <img
              alt="Developer"
              src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
              className="h-16 w-16 rounded-full object-cover"
            /> */}

                    <div>
                      <h3 className="text-lg font-medium text-black">
                        Question {index + 1} : {question.question}
                      </h3>

                      <div className="flow-root">
                        {/* <ul className="-m-1 flex flex-wrap">
                  <li className="p-1 leading-none">
                    <a href="#" className="text-xs font-medium text-gray-300">
                      {" "}
                      Twitter{" "}
                    </a>
                  </li>

                  <li className="p-1 leading-none">
                    <a href="#" className="text-xs font-medium text-gray-300">
                      {" "}
                      GitHub{" "}
                    </a>
                  </li>

                  <li className="p-1 leading-none">
                    <a href="#" className="text-xs font-medium text-gray-300">
                      Website
                    </a>
                  </li>
                </ul> */}
                      </div>
                    </div>

                    {/* Easy : emerald
                  Medium : amber
                  hard : red
                 */}
                    {/* if question difficulty is easy  */}
                    {question.difficulty === "easy" ? (
                      <>
                        <span class="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-sm text-emerald-700">
                          {question.difficulty}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* if question difficulty is medium  */}
                    {question.difficulty === "medium" ? (
                      <>
                        <span class="whitespace-nowrap rounded-full bg-amber-100 px-2.5 py-0.5 text-sm text-amber-700">
                          {question.difficulty}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* if question difficulty is hard  */}
                    {question.difficulty === "hard" ? (
                      <>
                        <span class="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">
                          {question.difficulty}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  {/* options rendering  */}
                  <div className="w-full px-4 py-16">
                    <div className="mx-auto w-full max-w-md">
                      <RadioGroup value={selected} onChange={setSelected}>
                        <RadioGroup.Label className="sr-only">
                          Server size
                        </RadioGroup.Label>
                        <div className="space-y-2">
                          {question.options &&
                            question.options.map((option) => (
                              <RadioGroup.Option
                                key={option.optionID}
                                value={option.option}
                                onClick={() =>
                                  handleOptionSelect(
                                    question.questionId,
                                    option.optionID
                                  )
                                }
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? "ring-2 ring-white/60 ring-offset-2 ring-offset-teal-700"
                                      : ""
                                  }
                  ${checked ? "bg-teal-600/75 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className="flex w-full items-center justify-between">
                                      <div className="flex items-center">
                                        <div className="text-sm">
                                          <RadioGroup.Label
                                            as="p"
                                            className={`font-medium  ${
                                              checked
                                                ? "text-white"
                                                : "text-gray-900"
                                            }`}
                                          >
                                            {option.option}
                                          </RadioGroup.Label>
                                          {/* <RadioGroup.Description
                                          as="span"
                                          className={`inline ${
                                            checked
                                              ? "text-sky-100"
                                              : "text-gray-500"
                                          }`}
                                        >
                                          <span>
                                            {plan.ram}/{plan.cpus}
                                          </span>{" "}
                                          <span aria-hidden="true">
                                            &middot;
                                          </span>{" "}
                                          <span>{plan.disk}</span>
                                        </RadioGroup.Description> */}
                                        </div>
                                      </div>
                                      {checked && (
                                        <div className="shrink-0 text-teal-700">
                                          <CheckIcon className="h-6 w-6" />
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </article>
              ))}

            {/* New quiz question  and option rendering ends */}
          </>
        ) : (
          <>
            {/* Language Selections code starts */}
            <div
              className={`flex justify-center ${quizCreated ? `hidden` : ``} `}
            >
              <div
                className="rounded-2xl w-3/4 border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
                role="alert"
              >
                <div className="flex items-center gap-4">
                  {/* <span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    fillRule="evenodd"
                  />
                </svg>
              </span> */}

                  {/* <p className="font-medium sm:text-lg">Let's Start New Quiz</p> */}
                </div>

                {/* <p className="mt-4 text-gray-500">
              Which Language you want to practice :
            </p> */}
                {/* SElect option  */}
                <div>
                  <label
                    htmlFor="HeadlineAct"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Which Language You want to Practice ?{" "}
                  </label>

                  <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    value={selectedLanguage}
                    onChange={handleLanguageSelection}
                    className="mt-1.5 w-full rounded-lg border-teal-300 text-gray-700 sm:text-sm"
                  >
                    <option value="">Please Select Language</option>
                    <option value="english">English</option>
                    <option value="">more languages coming soon..</option>
                  </select>
                </div>

                {/* Quiz Instruction */}
                <div className="mt-4">
                  <h3 className="block text-lg text-center font-medium text-gray-900">
                    Quiz Instruction{" "}
                  </h3>
                  <p className="block text-sm  font-medium text-gray-900">
                    1. You have to attempt all Quizzes
                  </p>
                  <p className="block text-sm  font-medium text-gray-900">
                    2. If you moved to next question then you can't move back.
                  </p>
                  <p className="block text-sm  font-medium text-gray-900">
                    3. If you skipped any quiz and you are not able to submit
                    quiz then refresh your page and start again new quiz.
                  </p>
                  <p className="block text-sm  font-medium text-gray-900">
                    4. Your leaderboard rank will be decided on the basis of all
                    of your average score.
                  </p>

                  {/* <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    value={selectedLanguage}
                    onChange={handleLanguageSelection}
                    className="mt-1.5 w-full rounded-lg border-teal-300 text-gray-700 sm:text-sm"
                  >
                    <option value="">Please Select Language</option>
                    <option value="english">English</option>
                    <option value="">more languages coming soon..</option>
                  </select> */}
                </div>
                <div className="mt-6 sm:flex sm:gap-4">
                  {isInstructionRead ? (
                    <>
                      <button
                        className="inline-block rounded border border-teal-700 bg-teal-600 px-12 py-3 text-sm font-medium text-white hover:bg-teal-700 hover:text-white"
                        onClick={launchQuiz}
                      >
                        Launch Quiz
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="inline-block rounded border border-teal-700 bg-teal-600 px-12 py-3 text-sm font-medium text-white hover:bg-teal-700 hover:text-white"
                        onClick={() => setIsInstructionRead(true)}
                      >
                        I have read Instruction
                      </button>
                    </>
                  )}

                  {/* Border */}

                  {/* <button
                className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                onClick={clearSelectedLanguage}
              >
                Cancel
              </button> */}
                </div>
              </div>
            </div>
            {/* Language Selections code Ends */}
          </>
        )}
      </div>

      {/* Diolog box code  */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Quiz Result
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="block text-lg text-center font-medium text-gray-900">
                      You Score is :{" "}
                      {quizSubmittedData &&
                      quizSubmittedData.success &&
                      quizSubmittedData.responsePayload
                        ? quizSubmittedData.responsePayload.quizTotalScore
                        : ""}
                    </p>
                    <p className="block text-lg text-center font-medium text-gray-900">
                      You Average Score is :{" "}
                      {quizSubmittedData &&
                      quizSubmittedData.success &&
                      quizSubmittedData.responsePayload
                        ? quizSubmittedData.responsePayload.userAvergeScore
                        : ""}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Note: </strong> If you want become proficient play
                      more quizzes and improve your performance.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-teal-100 px-4 py-2 text-sm font-medium text-teal-900 hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Ok
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewQuiz;

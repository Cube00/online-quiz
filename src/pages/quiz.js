import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Quiz = ({ state }) => {
  const [finish, setFinish] = useState(false);
  let [index, setIndex] = useState(0);
  let [score, setScore] = useState(0);
  const [checkValue, setCheckValue] = useState("");
  const [quest, setQuest] = useState([]);

  const { data } = state;
  if (data) {
    var question = data[index].question;
    var correctA = data[index].correct_answer;
    var answerTogether = data[index].incorrect_answers.map((e) => {
      return e;
    });
    answerTogether.push(correctA);
  }

  const moveToNext = () => {
    if (checkValue !== "") {
      if (index < data.length - 1) {
        setIndex((index += 1));
      } else {
        setFinish(true);
      }
    }
    setCheckValue("");
  };

  const correctAnswer = (e) => {
    setCheckValue(e);
    if (e == correctA) {
      setScore(score + 1);
    }
  };

  const colorSwitch = (x) => {
    if (checkValue == x && checkValue == correctA) return "selected";
    else if (checkValue == x && checkValue !== correctA) return "wrong";
    else if (x == correctA) return "correct";
    else {
      return "default";
    }
  };

  useEffect(() => {
    if (data) setQuest(answerTogether.sort(() => 0.5 - Math.random()));
  }, [index]);

  return (
    <>
      {data && (
        <div className="block-set-questions">
          <h2>QUIZ</h2>
          {finish === false ? (
            <div className="quiz-box">
              <h4>{question}</h4>
              {quest.map((answers) => {
                return (
                  <button
                    key={answers}
                    disabled={checkValue !== "" && true}
                    onClick={() => correctAnswer(answers)}
                    className={`btn-option ${
                      checkValue && colorSwitch(answers)
                    }`}
                  >
                    {answers}
                  </button>
                );
              })}
              <button className="next" onClick={() => moveToNext()}>
                next
              </button>
            </div>
          ) : (
            <>
              <h3>Your score is {score}</h3>

              <button
                className="retry"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <Link to="/">retry</Link>
              </button>
            </>
          )}
        </div>
      )}
      {!data && (
        <div className="error-message">
          <h2>Something wents wrong.</h2>
          <Link to="/">retry</Link>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(Quiz);

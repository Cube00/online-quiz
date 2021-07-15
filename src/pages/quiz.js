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
    var diffAns = data[index].incorrect_answers.map((e) => {
      return e;
    });
    diffAns.push(data[index].correct_answer);
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

  useEffect(() => {
    if (data) setQuest(diffAns.sort(() => 0.5 - Math.random()));
  }, [index]);

  const correctAnswer = (e) => {
    setCheckValue(e);
    if (e == data[index].correct_answer) {
      setScore(score + 1);
    }
  };

  const colorSwitch = (x) => {
    if (checkValue == x && checkValue == data[index].correct_answer)
      return "selected";
    else if (checkValue == x && checkValue !== data[index].correct_answer)
      return "wrong";
    else if (x == data[index].correct_answer) return "correct";
    else {
      return "default";
    }
  };

  return (
    <>
      {data && (
        <div className="block-set-questions">
          <h2>QUIZ</h2>
          {finish === false ? (
            <div className="quiz-box">
              <h4>{data[index].question}</h4>
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

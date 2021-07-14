import { connect } from "react-redux";
import { useState } from "react";

const Quiz = ({ state }) => {
  let [index, setIndex] = useState(0);
  const { data } = state;
  const diffAns = data[index].incorrect_answers.map((e) => {
    return e;
  });
  diffAns.push(data[index].correct_answer);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);
  shuffle(diffAns);

  return (
    <>
      <h2>{data[index].question}</h2>
      {diffAns.map((answers) => {
        return <li key={answers}>{answers}</li>;
      })}
      <button
        onClick={() => {
          if (index < data.length - 1) setIndex((index += 1));
        }}
      >
        next
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(Quiz);

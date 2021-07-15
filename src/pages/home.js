import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { categoryList } from "../categoryList";
import { Link } from "react-router-dom";

const Home = ({ state, catSet, setDiff, dataSet }) => {
  const [data, setData] = useState([]);
  const [changeClass, setChangeClass] = useState(false);
  const [catClass, setCatClass] = useState(false);
  const [message, setMessage] = useState(false);
  const { category, difficulty } = state;
  const diff = [
    { id: 1, name: "easy" },
    { id: 2, name: "medium" },
    { id: 3, name: "hard" },
  ];

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=${difficulty}`
    )
      .then((response) => response.json())
      .then((ques) => {
        setData(ques.results);
      });
  }, [category, difficulty]);

  const handleChange = () => {
    setChangeClass(true);
    setCatClass(false);
    if (changeClass === true) {
      setChangeClass(false);
    }
  };

  const handleChangeCat = () => {
    setCatClass(true);
    setChangeClass(false);
    if (catClass === true) {
      setCatClass(false);
    }
  };

  const handleMessage = () => {
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };

  return (
    <>
      <div className={message === true ? "message active" : "message"}>
        Please Choose Both category & difficulty!
      </div>
      <div className="block-set-questions">
        <h2>QUIZ</h2>
        <div onClick={() => handleChange()} className="selected-category">
          {difficulty == "" ? "select difficulty" : difficulty}
        </div>
        <div
          className={
            changeClass ? "select-difficulty block" : "select-difficulty"
          }
        >
          {diff.map((different) => {
            return (
              <li
                key={different.id}
                onClick={() => {
                  setDiff(different.name);
                  setChangeClass(false);
                }}
              >
                {different.name}
              </li>
            );
          })}
        </div>
        <div onClick={() => handleChangeCat()} className="selected-category">
          {category == "" ? "select category" : category.name}
        </div>
        <div
          className={
            catClass === true ? "select-difficulty block" : "select-difficulty"
          }
        >
          {categoryList.map((eachCategory) => {
            return (
              <li
                onClick={() => {
                  catSet(eachCategory.id, eachCategory.name);
                  setCatClass(false);
                }}
                key={eachCategory.id}
              >
                {eachCategory.name}
              </li>
            );
          })}
        </div>
        {category !== "" && difficulty !== "" ? (
          <Link to="/quiz" onClick={() => dataSet(data)}>
            <button className="start-btn">START QUIZ</button>
          </Link>
        ) : (
          <button
            onClick={() => {
              handleMessage();
            }}
            className="start-btn"
          >
            START QUIZ
          </button>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dataSet: (data) => {
      dispatch({ type: "SET_DATA", content: data });
    },
    catSet: (cat, name) => {
      dispatch({
        type: "SET_CATEGORY",
        categoryId: cat,
        categoryName: name,
      });
    },
    setDiff: (name) => {
      dispatch({
        type: "SET_DIFFICULTY",
        diffName: name,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

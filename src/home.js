import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { categoryList } from "./categoryList";
import { Link } from "react-router-dom";

const Home = ({ state, catSet, setDiff }) => {
  const [data, setData] = useState([]);
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

  console.log(data);

  return (
    <>
      <h2>
        {category.name}, {difficulty}
      </h2>
      {diff.map((e) => {
        return (
          <li key={e.id} onClick={() => setDiff(e.name)}>
            {e.name}
          </li>
        );
      })}
      {categoryList.map((eachCategory) => {
        return (
          <li
            onClick={() => catSet(eachCategory.id, eachCategory.name)}
            key={eachCategory.id}
          >
            {eachCategory.name}
          </li>
        );
      })}
      <Link to="/quiz">
        <button>START QUIZ</button>
      </Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
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

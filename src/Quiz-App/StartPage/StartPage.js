import React, { useState } from "react";
import "./StartPage.css";
import { BiCube } from "react-icons/bi";
import { MenuItem, TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import Categories from "../Data/Categories";

const StartPage = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = () => {
    if(!category || !difficulty || !name){
        setError(true);
        return;
    }else{
        setError(false);
        fetchQuestions(category,difficulty)
        navigate("/quiz");
    }
  }

  return (
    <>
      <div className="content">
        <div className="settings">
          <div className="home">
          <section>
            <div style={{ textAlign: "center" }}>
              <span>
                <BiCube className="cube" />
              </span>
            </div>
            <h1>Quiz App</h1>

            <div className="settings-select">
              {error && <ErrorPage>Please Fill all the Feilds</ErrorPage>}
              <TextField
                style={{
                  marginBottom: 25,
                  marginRight: 18,
                  background: "white",
                  borderRadius: 5,
                }}
                label="Enter Player Name"
                variant="filled"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                  select
                  label="Select Category"
                  variant="filled"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    marginBottom: 30,
                    marginRight: 18,
                    background: "white",
                    borderRadius: 5,
                  }}
                  placeholder="Select Category"
                >
                  {Categories.map((cat) => (
                    <MenuItem key={cat.category} value={cat.value}>
                      {cat.category}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Select Difficulty"
                  variant="filled"
                  style={{
                    marginBottom: 30,
                    marginRight: 18,
                    background: "white",
                    borderRadius: 5,
                  }}
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  placeholder="Select Difficulty"
                >
                  <MenuItem key="Easy" value="easy">
                    Easy
                  </MenuItem>
                  <MenuItem key="Medium" value="medium">
                    Medium
                  </MenuItem>
                  <MenuItem key="Hard" value="hard">
                    Hard
                  </MenuItem>
                </TextField>
                <Button
                  variant="contained"
                  style={{ marginBottom: 30, marginRight: 15 }}
                  color="primary"
                  size="large"
                  onClick={handleSubmit}
                >
                  Lets Play
                </Button>
            </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartPage;

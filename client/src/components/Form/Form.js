import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts.js";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => (p._id = currentId)) : null
  );
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      ingredients: "",
      instructions: "",
      selectedFile: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };
  /*if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} style={{ backgroundColor: "#d6e38e" }}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own recipes and like other's recipes
        </Typography>
      </Paper>
    );
  }*/
  return (
    <Paper className={classes.paper} style={{ backgroundColor: "#d6e38e" }}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating "} a recipe{" "}
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="ingredients"
          variant="outlined"
          label="Ingredients"
          fullWidth
          value={postData.ingredients}
          onChange={(e) =>
            setPostData({ ...postData, ingredients: e.target.value.split("-") })
          }
        />
        <TextField
          name="instructions"
          variant="outlined"
          label="Instructions"
          fullWidth
          value={postData.instructions}
          onChange={(e) =>
            setPostData({ ...postData, instructions: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Add your recipe
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
export default Form;

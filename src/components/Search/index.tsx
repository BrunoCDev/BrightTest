import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { returnSpecificValue } from "./../../utils/task2";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const Search = () => {
  const [values, setValues] = useState({
    name: "",
    date: "",
    metricID: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    if (event.key === "Enter") {
      setResult(
        returnSpecificValue(
          [values.name, values.date],
          parseInt(values.metricID)
        )
      );
    }
  };

  const classes = useStyles();
  return (
    <div style={{ width: "45em", margin: "auto" }}>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          onKeyDown={handleSubmit}
        />
        <TextField
          id="standard-name"
          label="Date"
          className={classes.textField}
          value={values.date}
          onChange={handleChange("date")}
          margin="normal"
          style={{ marginLeft: "1em" }}
          onKeyDown={handleSubmit}
        />
        <TextField
          id="standard-name"
          label="Metric ID"
          className={classes.textField}
          value={values.metricID}
          onChange={handleChange("metricID")}
          margin="normal"
          style={{ marginLeft: "1em" }}
          onKeyDown={handleSubmit}
        />
        {result ? (
          <div>
            <p>Result: {result}</p>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Search;

import React, { useState } from "react";
import "./index.css";

import { IResult, IMetric } from "./../../types";
import { getLabels } from "./../../utils/task1";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import UITable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface ITableProps {
  Data: IResult[];
}

const Table = (p: ITableProps) => {
  const [labels] = useState(getLabels());
  const [metricID] = useState(141);

  const getMetricValue = (metricID: number, metrics: IMetric[]) => {
    let value = null;
    metrics.forEach(metric => {
      if (metric.id === metricID.toString()) {
        value = metric.value.toFixed(2);
      }
    });
    return value;
  };

  const displayValues = (data: IResult) => {
    let tdElements: JSX.Element[] = [];
    labels.dates.forEach((y: string, index: number) => {
      data.values.forEach(value => {
        if (value.date === y) {
          tdElements.push(
            <StyledTableCell align="left" key={index}>
              {getMetricValue(metricID, value.metrics)}
            </StyledTableCell>
          );
        }
      });
    });

    return tdElements;
  };

  const displayTotal = (data: IResult) => {
    let totalElement = null;
    data.total.forEach(x => {
      if (x.id === metricID.toString()) {
        totalElement = (
          <StyledTableCell align="left">{x.value.toFixed(2)}</StyledTableCell>
        );
      }
    });
    return totalElement;
  };

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  }))(TableRow);

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    }
  }));

  const classes = useStyles();

  return (
    <div style={{ width: "45em", margin: "auto" }}>
      <Paper className={classes.root}>
        <UITable className={classes.table}>
          <TableHead>
            <TableRow style={{ userSelect: "none" }}>
              <StyledTableCell />
              {labels.dates.map((x: string, i: number) => (
                <StyledTableCell align="left" key={i}>
                  {x}
                </StyledTableCell>
              ))}
              <StyledTableCell align="left">Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {p.Data.map((x: IResult, i: number) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {x.name}
                </StyledTableCell>
                {displayValues(x)}
                {displayTotal(x)}
              </StyledTableRow>
            ))}
          </TableBody>
        </UITable>
      </Paper>
    </div>
  );
};

export default Table;

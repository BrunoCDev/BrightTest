import data from "../data";
import { IResult } from "../types";

// Parse data for displaying.
function parseData(data: any) {
  var results: IResult[] = [];
  if (data.children) {
    data.children.forEach((x: any) => {
      var result: IResult = {
        name: x.dval.value,
        values: [],
        total: getMetrics(x.metrics)
      };
      if (x.children) {
        x.children.forEach((y: any) => {
          var value = {
            date: y.dval.value,
            metrics: getMetrics(y.metrics)
          };
          result.values.push(value);
        });
        results.push(result);
      }
    });
  }
  return results;
}

function getMetrics(metrics: any) {
  var total = [];
  for (var key in metrics) {
    var metric = {
      id: key,
      value: parseFloat(metrics[key].value)
    };
    total.push(metric);
  }
  return total;
}

// Return parsing result
export function getResult() {
  return parseData(data);
}

// Get the labels for the table.
export function getLabels() {
  const dates: string[] = [];
  const names: string[] = [];
  const result = getResult();

  result.forEach(x => {
    if (names.indexOf(x.name) === -1) {
      names.push(x.name);
    }
    x.values.forEach(y => {
      if (dates.indexOf(y.date) === -1) {
        dates.push(y.date);
      }
    });
  });

  return { dates, names };
}

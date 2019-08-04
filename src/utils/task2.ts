import data from "../data";

// Get specific data from tree.
function extractValueFromTree(array: string[], metricID: number, data: any) {
  let finalResult: any = null;

  if (data && data.children) {
    let date: string = "";
    let name: string = "";

    // check which string is name/date
    array.forEach(x => {
      if (!!Date.parse(x)) {
        date = x;
      } else {
        name = x;
      }
    });

    // Recursive call for tree depth retrieval.
    data.children.forEach((x: any) => {
      getChildren(x, date, name, metricID, rs => {
        if (rs) {
          finalResult = rs;
        }
      });
    });
  }
  return finalResult;
}

// Recursive function to retrieve data from children.
function getChildren(
  data: any,
  date: string,
  name: string,
  metricsID: number,
  rs: (final: number) => void,
  dateChecked?: boolean,
  nameChecked?: boolean
) {
  // If the date/name has being found on the parent, we switch check to true.
  let dateCheck: boolean = dateChecked ? dateChecked : false;
  let nameCheck: boolean = nameChecked ? nameChecked : false;

  if (data.dval && data.dval.value && data.dval.value === name) {
    nameCheck = true;
  }
  if (data.dval && data.dval.value && data.dval.value === date) {
    dateCheck = true;
  }

  if (
    data.metrics &&
    data.metrics[metricsID] &&
    data.metrics[metricsID].value !== null &&
    dateCheck &&
    nameCheck
  ) {
    // If value was found and passed the date/name checks.
    rs(data.metrics[metricsID].value);
  } else {
    // If not we recursively check the children.
    if (data.children && data.children.length) {
      data.children.forEach((x: any) => {
        getChildren(
          x,
          date,
          name,
          metricsID,
          result => {
            if (result) {
              // If there's a result, we bubble it up to the first getChildren call.
              rs(result);
            }
          },
          dateCheck,
          nameCheck
        );
      });
    }
  }
}

export function returnSpecificValue(array: string[], metricID: number) {
  return extractValueFromTree(array, metricID, data);
}

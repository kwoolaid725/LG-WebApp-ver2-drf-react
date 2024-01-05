import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import axiosInstance from "../../axios";
import TestDetailsTableRow from "./TestDetailsTableRow";

const TestDetailsTable = (props) => {
  const [testMeasures, setTestMeasures] = useState(null);
  const [fetchedRows, setFetchedRows] = useState([]);
  const [rows, setRows] = useState();

  useEffect(() => {
    fetch('/test-measures.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setTestMeasures(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  useEffect(() => {
    if (props.testId) {
      axiosInstance(`/admin/tests/vacuum/testdetail/?test_no=${props.testId}`)
        .then((res) => {
          const fetchedRows = res.data || [];
          setFetchedRows(fetchedRows);
        })
        .catch((error) => {
          console.error('Error fetching detailed data: ', error);
        });
    }
  }, [props.testId]);

  useEffect(() => {
    if (fetchedRows.length > 0) {
      const combinedRows = fetchedRows.reduce((acc, row) => {
        const { slug, test_measure, value, units, ...otherValues } = row;

        if (!acc[slug]) {
          acc[slug] = {
            ...otherValues,
            slug,
            test_measure: test_measure ? [test_measure] : [],
            values: {},
            units: units ? [units] : [],
          };
        }

        if (test_measure) {
          if (!acc[slug].values[test_measure]) {
            acc[slug].values[test_measure] = { value: value || '', units: units || '' };
          }
        }

        return acc;
      }, {});

      const updatedRows = Object.keys(combinedRows).reduce((acc, slug) => {
        const { test_target, test_group } = combinedRows[slug];
        if (!acc[test_target]) {
          acc[test_target] = {};
        }
        if (!acc[test_target][test_group]) {
          acc[test_target][test_group] = [];
        }
        acc[test_target][test_group].push(combinedRows[slug]);
        return acc;
      }, {});

      // console.log('updatedRows', updatedRows);

      setRows(updatedRows);


    }
  }, [fetchedRows]);

  useEffect(() => {
    console.log('rows', rows);
  }, [rows]);


  return (
    <React.Fragment>
      {testMeasures &&
        Object.keys(testMeasures).map((target) => {
          const measures = testMeasures[target];
          return (
            <div key={target}>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    {target}
                  </Typography>

                  {Array.isArray(measures) ? (
                    measures.map((measure, index) => (
                      <div key={index}>
                        <Typography variant="body1">{Object.keys(measure)}</Typography>

                        {/* Find and render rows for this target and measure */}
                        {rows &&
                          rows[target] &&
                          rows[target][Object.keys(measure)[0]] &&
                          rows[target][Object.keys(measure)[0]].map((row, idx) => (
                            <TestDetailsTableRow
                              key={idx}
                              testId={row.test}
                              testTarget={target}
                              testGroup={Object.keys(measure)[0]}
                              testMeasures={row.values}
                              sample={row.sample}
                              brushType={row.brush_type}
                              tester={row.tester}
                              testCase={row.test_case}
                            />
                          ))}
                      </div>
                    ))
                  ) : (
                    <div key={Object.keys(measures)}>
                      <Typography variant="body1">{Object.keys(measures)}</Typography>
                    </div>
                  )}
                </Box>
              </TableCell>
            </div>
          );
        })}
    </React.Fragment>
  );


};

export default TestDetailsTable;

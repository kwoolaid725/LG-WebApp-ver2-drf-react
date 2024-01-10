import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TestDetailsTable from './TestDetailsTable';
import TestDetailsHeader from './TestDetailsHeader';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import {useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import TestDetailsTableCR from "./TestDetailsTableCR";
import TestDetailsBody from "./TestDetailsBody";

export default function TestDetails(props) {
  const [openFirst, setOpenFirst] = useState(true);
  const [sampleValue, setSampleValue] = useState('');
  const [invNoValue, setInvNoValue] = useState('');
  const [brushTypeValue, setBrushTypeValue] = useState('');
  const [testCaseValue, setTestCaseValue] = useState('');

  const {id} = useParams();

  const [data, setData] = useState();
  const [dataDetails, setDataDetails] = useState();

  useEffect(() => {
    axiosInstance(`/tests/`)
      .then((res) => {
        const test = res.data.find((test) => test.id === parseInt(id));
        setData(test);
        console.log('test:',test);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // handle error appropriately
      });
  }, [id]);
  //
  useEffect(() => {
    if (data?.id) {
      axiosInstance(`/admin/tests/vacuum/testdetail/?test_no=${data.id}`)
        .then((res) => {
          const testDataDetails = res.data;
          setDataDetails(testDataDetails);
          console.log('testDataDetails:', testDataDetails);
        })
        .catch((error) => {
          console.error("Error fetching detailed data: ", error);
          // handle erroz r appropriately
        });
    }
  }, [data?.id]);




  return (
    <React.Fragment>
      {/* TestDetailsHeader outside of the collapsible section */}
      <TestDetailsHeader
        testCategory={data?.test_category}
        productCategory={data?.product_category}
        testId={data?.id}
        description={data?.description}
        dueDate={data?.due_date}
        completionDate={data?.completion_date}
      />


      <TestDetailsBody/>
      {/* First collapsible section */}
      <div>Add Sample</div>
    </React.Fragment>
  );
}


import axios from "axios";
import { useState, useEffect } from "react";
import apiUrl from "../apiUrl";
import { Paper, Typography, Avatar, LinearProgress } from "@mui/material";
import useStyles from "./DisplayReportsStyles";
import IndividualReport from "./IndividualReport";
const DisplayReports = () => {
  const [reports, setReports] = useState([]);
  const classes = useStyles({});
  useEffect(() => {
    const getReports = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/users/reports`);
        setReports(res.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getReports();
  }, []);

  return (
    <div>
      {reports.map((report) => (
        <IndividualReport
          report={report}
          setReports={setReports}
          reports={reports}
          key={report._id}
        />
      ))}
    </div>
  );
};

export default DisplayReports;

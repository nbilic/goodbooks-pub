import useStyles from "./DisplayReportsStyles";
import axios from "axios";
import { Link } from "react-router-dom";
import apiUrl from "../apiUrl";
import { useState, useEffect } from "react";
import { Typography, Avatar, Tooltip, LinearProgress } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
const IndividualReport = ({ report, setReports, reports }) => {
  const classes = useStyles({});
  const [reportedUser, setReportedUser] = useState(null);
  const [reportedBy, setReportedBy] = useState(null);
  const [loading, setLoading] = useState([]);
  const resolve = async () => {
    try {
      await axios.delete(`${apiUrl}/api/users/report/${report._id}`, {
        withCredentials: true,
      });
      const c = reports;
      setReports(c.filter((r) => r !== report));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const reportedUserRes = await axios.get(
          `${apiUrl}/api/users/${report.reportedUser}`
        );
        const reportedByUser = await axios.get(
          `${apiUrl}/api/users/${report.reportedBy}`
        );
        setReportedBy(reportedByUser.data);
        setReportedUser(reportedUserRes.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getUsers();
  }, []);
  if (loading) return <LinearProgress color="secondary" />;
  return (
    <div key={report._id} className={classes.reportContainer}>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            src={reportedUser?.avatar}
            sx={{ width: 24, height: 24, margin: "5px", marginLeft: 0 }}
          />
          <Typography variant="subtitle2" className={classes.reportedUser}>
            <Link
              to={`/profile/${report.reportedUser}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {report.reportedUser}
            </Link>
          </Typography>
          <Typography variant="body2"> was reported by </Typography>

          <Avatar
            src={reportedBy?.avatar}
            sx={{ width: 24, height: 24, margin: "5px" }}
          />
          <Typography variant="subtitle2" className={classes.reportedBy}>
            <Link
              to={`/profile/${report.reportedBy}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {report.reportedBy}
            </Link>
          </Typography>
        </div>
        <div className={classes.reportReason}>
          <Typography variant="body2">Report reason:</Typography>
          <Typography variant="subtitle2" sx={{ marginLeft: 2 }}>
            {report.additionalInformation}
          </Typography>
        </div>
      </div>
      <Tooltip title="Mark as resolved">
        <DoneIcon className={classes.resolveIcon} onClick={resolve} />
      </Tooltip>
    </div>
  );
};

export default IndividualReport;

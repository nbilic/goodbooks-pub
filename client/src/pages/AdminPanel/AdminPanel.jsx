import { Header, DisplayReports, PendingBooks } from "../../components/index";
import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import useStyles from "./AdminPanelStyles";
import { useState } from "react";

const AdminPanel = () => {
  const classes = useStyles({});
  const [alignment, setAlignment] = useState("left");
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div>
      <Header />
      <Paper elevation={5} className={classes.container}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            Reports
          </ToggleButton>

          <ToggleButton value="center" aria-label="centered">
            Book Suggestions
          </ToggleButton>
        </ToggleButtonGroup>
        {alignment === "left" && <DisplayReports />}
        {alignment === "center" && <PendingBooks />}
      </Paper>
    </div>
  );
};

export default AdminPanel;

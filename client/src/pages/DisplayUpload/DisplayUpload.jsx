import { Header, BookUpload } from "../../components/index";
import useStyles from "./DisplayUploadStyles";

const DisplayUpload = () => {
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <Header />
      <BookUpload />
    </div>
  );
};

export default DisplayUpload;

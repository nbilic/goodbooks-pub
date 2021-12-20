import { Header, Friends } from "../../components/index";
import useStyles from "./FriendListStyles";

const FriendList = () => {
  const classes = useStyles({});
  return (
    <div className={classes.container}>
      <Header />
      <Friends />
    </div>
  );
};

export default FriendList;

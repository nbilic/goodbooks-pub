import { Route, Routes } from "react-router-dom";
import "./app.css";
import {
  DisplayReview,
  DisplayUpload,
  FriendList,
  Signup,
  Home,
  Profile,
  FilteredUsers,
} from "./pages/index";

import { Test, SearchUsers } from "./components/index";
import { useEffect } from "react";
import { updateUser } from "./redux/api";
import { useDispatch } from "react-redux";
const App = () => {
  //const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      updateUser(JSON.parse(localStorage.getItem("user")), dispatch);
      //setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/upload" element={<DisplayUpload />} />
        <Route path="/book/:id" element={<DisplayReview />} />
        <Route path="/profile/:username/friends" element={<FriendList />} />
        <Route path="/search/:filter" element={<FilteredUsers />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};

export default App;

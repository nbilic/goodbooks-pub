import { Route, Routes, Navigate } from "react-router-dom";
import "./app.css";
import {
  DisplayReview,
  DisplayUpload,
  FriendList,
  Signup,
  Home,
  Profile,
  FilteredUsers,
  AdminPanel,
} from "./pages/index";
import { useSelector } from "react-redux";
import { SearchBooks } from "./components/index";
import { useEffect } from "react";
import { updateUser } from "./redux/api";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      updateUser(JSON.parse(localStorage.getItem("user")), dispatch);
    }
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/upload" element={<SearchBooks />} />
        <Route path="/book/:id" element={<DisplayReview />} />
        <Route path="/profile/:username/friends" element={<FriendList />} />
        <Route path="/search/:filter" element={<FilteredUsers />} />
        <Route path="/book/suggestion" element={<DisplayUpload />} />
        <Route
          path="/admin/dashboard"
          element={activeUser?.isAdmin ? <AdminPanel /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;

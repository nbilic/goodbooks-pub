import { Header } from "../../components/index";

const Home = () => {
  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <Header />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://le3emepilier.com/wp-content/uploads/2019/04/img-under-construction.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;

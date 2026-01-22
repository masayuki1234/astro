import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Info } from "./components/infomation";
import { Top } from "./components/TopPage";
import { Form } from "./components/Applicate";
import { Confirm } from "./components/Confirm";
import { Complete } from "./components/Complete";
import { Inquiry } from "./components/Inquiry";
import "./styles.css";

export const App = () => {
  return (
    <>
      <Header />
      <div className="App" style={{ backgroundColor: "black" }}>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/infomation" element={<Info />} />
          <Route path="/form" element={<Form />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/Inquiry" element={<Inquiry />} />
        </Routes>
      </div>
    </>
  );
};

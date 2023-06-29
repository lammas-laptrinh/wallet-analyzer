import { Route, BrowserRouter, Routes } from "react-router-dom";
import Wallet from "../pages/Analyer/Wallet";
import App from "../App";
import Goal from "../pages/Goal";
import Tags from "../pages/Tags";

export default function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<Wallet />} />
          <Route index path="/goal" element={<Goal />} />
          <Route index path="/tags" element={<Tags />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

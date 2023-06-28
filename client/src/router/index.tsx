import { Route, BrowserRouter, Routes } from "react-router-dom";
import Wallet from "../pages/Analyer/Wallet";
import App from "../App";
import Goal from "../pages/Goal";

export default function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<Wallet />} />
          <Route index path="/goal" element={<Goal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

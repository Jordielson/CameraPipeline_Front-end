import "bootstrap/dist/css/bootstrap.min.css";
import MyRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <MyRoutes />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;

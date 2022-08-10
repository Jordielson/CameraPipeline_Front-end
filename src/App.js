import "bootstrap/dist/css/bootstrap.min.css";
import MyRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css";

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

import RolfRoutes from "./routes/Routes.tsx";
import {ToastContainer} from "react-toastify";


function App() {
  return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <RolfRoutes/>
    </>
  )
}

export default App

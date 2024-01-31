import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AllRoutes } from "./routes/AllRoutes";
import { GlobalProvider } from './context/GlobalContext';

const App = () => {
    return (
      <>
        <ToastContainer/>
        <GlobalProvider>
          <AllRoutes />
        </GlobalProvider>
      </>
    );
  };
  
  export default App;

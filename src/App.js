import Dashboard from "./pages/job_seeker/dashboard/Dashboard";
import Login from "./pages/job_seeker/login/Login";
import Register from "./pages/job_seeker/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserContext";
import CompanyProvider from "./context/CompanyContext";
import CompanyRegister from "./pages/job_provider/companyregister/CompanyRegister";
import CompanyLogin from "./pages/job_provider/companylogin/CompanyLogin";
import CompanyDashboard from "./pages/job_provider/companydashboard/CompanyDashboard";
import First from "./pages/fisrt/First";
import ViewDetails from "./pages/job_provider/viewdetails/ViewDetails";
import Selected from "./pages/job_provider/selected/Selected";
import Placed from "./pages/job_seeker/placed/Placed";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CompanyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<First/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/companyregister" element={<CompanyRegister/>}/>
          <Route path="/companylogin" element={<CompanyLogin/>}/>
          <Route path="/companydashboard" element={<CompanyDashboard/>}/>
          <Route path="/viewdetails/:email" element={<ViewDetails/>}/>
          <Route path="/select/:email" element={<Selected/>}/>
          <Route path="/placed/:email" element={<Placed/>}/>
        </Routes>
      </BrowserRouter>
      </CompanyProvider>
      </UserProvider>
    </div>
  );
}

export default App;

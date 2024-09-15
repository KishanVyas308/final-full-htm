
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "./atom/isLogin";
import Gov from "./Gov";
import Login from "./Login";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";  
import { Report } from "./Report";

function App() {
  const isUserLogin = useRecoilValue(isLoginAtom);

  // return <>{isUserLogin ? <Gov /> : <Login />}</>;




  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gov" element={<Gov />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );

}

export default App;

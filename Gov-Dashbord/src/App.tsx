
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "./atom/isLogin";
import Gov from "./Gov";
import Login from "./Login";

function App() {
  const isUserLogin = useRecoilValue(isLoginAtom);

  return <>{isUserLogin ? <Gov /> : <Login />}</>;
}

export default App;

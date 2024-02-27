import { Outlet } from "react-router";
import { ThemeProvider } from "./ThemeProvider";
import Header from "./components/ui/Header";
import { useRecoilState } from "recoil";
import { loginState } from "./state/atoms/LoginState";
import axios from "axios";
import { url } from "./helpers/Url";
import { useEffect } from "react";

function App() {

  const [login, setLogin] = useRecoilState(loginState);

  const checkLoginStatus = async () => {
    const stat = await axios.post(url + "user/verify", {
      headers: {
        token: ""
      }
    })
    if(stat.data.msg == "Success!"){
      setLogin(true);
    }else{
      setLogin(false);
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header></Header>
        <main>
          <Outlet></Outlet>
        </main>
    </ThemeProvider>
  );
}

export default App;

import { Outlet } from "react-router";
import { ThemeProvider } from "./ThemeProvider";
import Header from "./components/ui/Header";
import { useRecoilState } from "recoil";
import { loginState } from "./state/atoms/LoginState";
import axios from "axios";
import { url } from "./helpers/Url";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function App() {

  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const checkLoginStatus = async () => {
    const stat = await axios.get(url + "user/verify", {
      headers: {
        token: cookies.token
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

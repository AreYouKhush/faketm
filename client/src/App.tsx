import { Outlet } from "react-router";
import { ThemeProvider } from "./ThemeProvider";
import Header from "./components/ui/Header";
import { useRecoilState } from "recoil";
import { loginState } from "./state/atoms/LoginState";
import axios from "axios";
import { url } from "./helpers/Url";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { profileState } from "./state/atoms/Profile";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [userInfo, setUserInfo] = useRecoilState(profileState);

  const checkLoginStatus = async () => {
    const stat = await axios.get(url + "user/verify", {
      headers: {
        token: cookies.token,
      },
    });
    if (stat.data.msg == "Success!") {
      setLogin(true);
      const inf = JSON.parse(localStorage.getItem("userInfo") || "{}");
      setUserInfo(inf);
    } else {
      setLogin(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <Toaster></Toaster>
    </ThemeProvider>
  );
}

export default App;

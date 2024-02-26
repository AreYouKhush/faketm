import { Outlet } from "react-router";
import { ThemeProvider } from "./ThemeProvider";
import Header from "./components/ui/Header";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mx-14">
        <Header></Header>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

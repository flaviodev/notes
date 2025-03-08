import { HashRouter, Route, Routes} from "react-router-dom";
import { ReviewListPage } from "./pages/ReviewListPage";
import { ReviewPage } from "./pages/ReviewPage";
import { Error404 } from "./pages/Error404";
import { About } from "./pages/About";
import { NavBar } from "./components/NavBar/NavBar";

export const App = () => {
  return (
    <>
      <HashRouter>
        <NavBar/>
        <div style={{ marginTop: '80px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<ReviewListPage/>} />
            <Route path="/reviews/:name" element={<ReviewPage/>} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<Error404/>} />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
};

import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  HashRouter,
  Navigate,
} from "react-router-dom";
import { Layout } from "./layout/Layout";
import { publicRoutes, privateRoutes } from "./utils/routers";
import { PATH_CHAT, PATH_LOGIN } from "./utils/constats";
import { Main } from "./pages/Mainpage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { Context } from "./main.js";
import { Loader } from "./components/Loader";

function App() {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {loading ? (
              <Route path="*" element={<Loader />}></Route>
            ) : (
              <>
                <Route path="/" element={<Main />}></Route>
                {user ? (
                  <>
                    {privateRoutes.map(({ path, element }, index) => (
                      <Route key={index} path={path} element={element} />
                    ))}
                    <Route path="*" element={<Navigate to={PATH_CHAT} />} />
                  </>
                ) : (
                  <>
                    {publicRoutes.map(({ path, element }, index) => (
                      <Route key={index} path={path} element={element} />
                    ))}
                    <Route path="*" element={<Navigate to={PATH_LOGIN} />} />
                  </>
                )}
              </>
            )}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export { App };

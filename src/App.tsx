import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/auth/AuthProvider";
import RequireAuth from "./components/RequireAuth";

import { Auth, Home } from "./pages";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

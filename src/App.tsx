import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Success from "./pages/Success";
import { refreshAuth } from "./api/refreshAuth";

function App() {
  useEffect(() => {
    refreshAuth(); // on load

    const interval = setInterval(() => {
      refreshAuth(); // every 12 mins
    }, 12 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/:mode" element={<Auth />} />
          <Route path="/success" element={<Success />} />
          {/* Redirect /auth to /auth/signup by default */}
          <Route path="/auth" element={<Navigate to="/auth/signup" />} />
        </Routes>

        {/* ✅ Global toaster, available everywhere */}
        <Toaster
          position="top-center" 
          toastOptions={{
            className: "!bg-gray-800 !text-white !rounded-xl !px-6 !py-4 !shadow-lg",
            duration: 3000,
          }}
          containerClassName="!fixed inset-0 flex items-center justify-center z-50"
        />
      </Router>
    </Provider>
  );
}

export default App;

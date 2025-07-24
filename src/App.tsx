import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Success from './pages/Success';

function App() {
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
      </Router>
    </Provider>
  );
}

export default App;
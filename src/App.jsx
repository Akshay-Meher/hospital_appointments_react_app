import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import Router from './routes/Router';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import PatientRegistration from './components/PatientRegistration';


// const App = () => {
//   return (
//     <Router>
//       <div className="container">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {/* <Route path="/register" element={<PatientRegistration />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

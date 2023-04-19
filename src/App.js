import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Reset from './Reset';
import Dashboard from './Dashboard';
import Bookshelf from './Bookshelf';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/reset" element={<Reset />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/bookshelf" element={<Bookshelf />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

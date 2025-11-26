import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import ItemsList from './pages/Items.jsx';      
import ItemDetails from './pages/ItemDetails';
import Login from './pages/Login';
import Profile from './pages/Profile'
import Register from './pages/Register';
import { AuthProvider } from './context/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="items" element={<ItemsList />} /> 
        <Route path="items/:id" element={<ItemDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signup" element={<Register />} />
      </Route>
    </Routes>
    </AuthProvider>
  );
}
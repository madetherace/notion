import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import NoteDetails from './pages/NoteDetails';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogoClick = () => {
    if (user) {
      window.location.href = '/dashboard'; 
    } else {
      window.location.href = '/';
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span onClick={handleLogoClick} className="text-xl font-bold cursor-pointer">Note App</span> 
        <nav>
          {user && (
            <>
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <Link to="/notes" className="mr-4">Notes</Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded">
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="mr-4">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
            </PrivateRoute>
            } />
          <Route path="/notes" element={
            <PrivateRoute>
              <Notes />
            </PrivateRoute>
          } />
          <Route path="/note/:id" element={  
            <PrivateRoute>
              <NoteDetails />
            </PrivateRoute>
          } />
          <Route path="/create" element={ 
            <PrivateRoute>
              <CreateNote />
            </PrivateRoute>
          } />
          <Route path="/edit/:id" element={  
            <PrivateRoute>
              <EditNote />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
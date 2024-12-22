import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view your dashboard.</div>; 
  }

  const registrationDate = new Date(user.createdAt).toLocaleDateString(); 

  return (
    <div className="max-w-md mx-auto p-20">
      <h1 className="text-2xl font-semibold mb-4">Привет, {user.email}!</h1>
      <p>Дата регистрации: {registrationDate}</p>
      <Link to="/notes" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
        Перейти к заметкам
      </Link>
    </div>
  );
};

export default Dashboard;
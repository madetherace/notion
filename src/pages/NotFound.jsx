import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NotFound = () => {
  const { user } = useAuth(); 

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          404 - Страница не найдена
        </h2>
        <p className="mt-5 text-center text-lg text-gray-600">
          Запрашиваемая вами страница не существует.
        </p>
      </div>
      <div className="mt-10 flex justify-center gap-4"> 
        {user ? ( 
          <Link
            to="/notes" 
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Домашняя страница (Заметки)
          </Link>
        ) : (
          <Link
            to="/login" 
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Вход
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
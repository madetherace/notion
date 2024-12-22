import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const NoteDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5000/notes/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/not-found');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate('/notes');
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link to="/notes" className="inline-block mb-4 text-blue-500 hover:underline">
        &larr; Назад
      </Link>
      <h2 className="text-3xl font-bold mb-4">{note.title}</h2>
      <p className="whitespace-pre-wrap">{note.body}</p>
      <p className="text-gray-500 text-sm mt-4">Создано: {new Date(note.createdAt).toLocaleString()}</p>
      <div className="flex items-center space-x-4 mt-4">
        <Link to={`/edit/${note.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <span className="mr-2">✍️</span> Редактировать
        </Link>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <span className="mr-2">🗑</span> Удалить
        </button>
      </div>
    </div>
  );
};

export default NoteDetails;
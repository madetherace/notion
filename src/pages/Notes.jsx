import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/notes?authorId=${user.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const sortedNotes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotes(sortedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Please log in to view your notes.</div>;
  }

  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${noteId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Мои заметки</h1>
      <Link to="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Создать новую заметку
      </Link>
      <ul className="list-none p-0">
        {notes.map((note) => (
          <li key={note.id} className="border border-gray-300 rounded-md shadow-sm p-4 mb-4 flex items-center justify-between">
            <div>
              <Link to={`/note/${note.id}`} className="text-blue-600 hover:underline block">
                <h2 className="text-xl font-semibold">{note.title}</h2>
              </Link>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(note.createdAt).toLocaleDateString()}&nbsp;
                {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Link to={`/edit/${note.id}`}>
                <span className="text-2xl">✍️</span>
              </Link>
              <button onClick={() => handleDelete(note.id)} className="text-2xl text-red-500 hover:text-red-700">
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
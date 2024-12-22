import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { AuthContext } from '../context/AuthContext';

const createNoteSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

const CreateNote = () => {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = createNoteSchema.parse(formData);

      const response = await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validatedData, authorId: user.id, createdAt: Date.now() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newNote = await response.json();
      navigate(`/note/${newNote.id}`);

    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.flatten().fieldErrors);
      } else {
        console.error("Error creating note:", err);
        setErrors({ general: err.message || "An error occurred creating the note." });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };


  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Создать новую заметку</h1>
      <Link to="/notes" className="inline-block mb-4 text-blue-500 hover:underline">
      &larr; Назад
    </Link>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Заголовок:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={formData.title}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">Текст:</label>
          <textarea
            id="body"
            name="body"
            onChange={handleChange}
            value={formData.body}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Создать
        </button>
        {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}
      </form>
    </div>
  );
};


export default CreateNote;
import { useState, useEffect } from 'react';

function AdminForm({ onAdd, propertyToEdit, onUpdate, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('Rent');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (propertyToEdit) {
      setTitle(propertyToEdit.title);
      setLocation(propertyToEdit.location);
      setPrice(propertyToEdit.price);
      setType(propertyToEdit.type);
      setImage(propertyToEdit.image);
      setDescription(propertyToEdit.description);
    }
  }, [propertyToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !location || !price || !type) return;

    const propertyData = {
      id: propertyToEdit ? propertyToEdit.id : Date.now(),
      title,
      location,
      price: parseFloat(price),
      type,
      image: image || 'https://via.placeholder.com/400x300',
      description,
    };

    if (propertyToEdit) {
      onUpdate(propertyData);
    } else {
      onAdd(propertyData);
    }

    // إعادة تعيين النموذج
    setTitle('');
    setLocation('');
    setPrice('');
    setType('Rent');
    setImage('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">
        {propertyToEdit ? 'Edit Property' : 'Add New Property'}
      </h2>
      <input
        type="text"
        placeholder="Title"
        className="border rounded p-2 w-full mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="border rounded p-2 w-full mb-3"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="border rounded p-2 w-full mb-3"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select
        className="border rounded p-2 w-full mb-3"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="Rent">Rent</option>
        <option value="Sale">Sale</option>
      </select>
      <input
        type="text"
        placeholder="Image URL (optional)"
        className="border rounded p-2 w-full mb-3"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border rounded p-2 w-full mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            propertyToEdit ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
          } transition`}
        >
          {propertyToEdit ? 'Update' : 'Add Property'}
        </button>
        {propertyToEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AdminForm;

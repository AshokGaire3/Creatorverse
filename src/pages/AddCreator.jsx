import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate, Link } from 'react-router-dom';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('creators')
      .insert([formData]);

    if (error) {
      console.error('Error adding creator:', error);
      alert('Error adding creator. Check console for details.');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', paddingTop: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#c084fc' }}>Add a New Creator</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        
        <label htmlFor="url">
          URL (Channel or Page link)
          <input type="url" id="url" name="url" value={formData.url} onChange={handleChange} required />
        </label>
        
        <label htmlFor="description">
          Description
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="4"></textarea>
        </label>

        <label htmlFor="imageURL">
          Image URL (Optional)
          <input type="url" id="imageURL" name="imageURL" value={formData.imageURL} onChange={handleChange} />
        </label>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit">Add Creator</button>
          <Link to="/" role="button" className="secondary-button" style={{ width: '100%', textAlign: 'center' }}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;

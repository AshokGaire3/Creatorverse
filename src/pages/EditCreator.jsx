import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setFormData({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || ''
        });
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update(formData)
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
      alert('Error updating creator. Check console for details.');
    } else {
      navigate(`/creator/${id}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting creator:', error);
      } else {
        navigate('/');
      }
    }
  };

  if (loading) return <div className="loading">Loading creator details...</div>;

  return (
    <div className="container" style={{ maxWidth: '600px', paddingTop: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#c084fc' }}>Edit Creator</h2>
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
          <button type="submit">Update Creator</button>
          <button type="button" className="danger-button" onClick={handleDelete}>Delete Creator</button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Link to={`/creator/${id}`} role="button" className="secondary-button" style={{ width: '100%', textAlign: 'center' }}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;

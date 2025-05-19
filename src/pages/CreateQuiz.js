import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosConfig';
import '../styles/CreateQuiz.css';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_public: 1,
    category_id: ''
  });
  const [imageFile, setImageFile] = useState(null); // ✅ ảnh
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Gán giá trị input vào state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Tạo formData để gửi dạng multipart/form-data
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('is_public', formData.is_public);
      data.append('category_id', formData.category_id);
      if (imageFile) {
        data.append('image', imageFile); // ✅ ảnh gửi lên backend
      }

      const response = await axiosInstance.post('/api/quizzes', data);
      console.log('CreateQuiz - API response:', response.data);
      if (response.data && response.data.data && response.data.data.id) {
        const quizId = response.data.data.id;
        navigate(`/quiz-editor/${quizId}`);
      } else {
        setError('Quiz created but no ID returned, or backend error.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tạo quiz');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        const user_id = user ? user.id : null;
        const res = await axiosInstance.get('/categories', {
          params: { user_id }
        });
        setCategories((res.data && Array.isArray(res.data.data)) ? res.data.data : []);
      } catch (err) {
        console.error('Lỗi khi lấy danh mục:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !formData.category_id) {
      setFormData(prev => ({
        ...prev,
        category_id: categories[0].category_id
      }));
    }
  }, [categories]);

  return (
    <div className="create-quiz-container">
      <h1>Tạo Quiz Mới</h1>
      <button
        style={{ marginBottom: '16px' }}
        onClick={() => navigate('/my-quizzes')}
        type="button"
      >
        Danh sách quiz
      </button>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="quiz-form" encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="title">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Nhập tiêu đề quiz"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Nhập mô tả quiz"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Danh mục:</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id || ''}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Chọn danh mục</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Ảnh Quiz:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Đang tạo...' : 'Tạo Quiz'}
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;

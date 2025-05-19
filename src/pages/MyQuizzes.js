import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import '../styles/MyQuizzes.css';
import { useNavigate } from 'react-router-dom';

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axiosInstance.get('/api/quizzes/my-quizzes');
        console.log('API trả về:', res.data);
        setQuizzes(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        setError('Không thể tải danh sách quiz.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="my-quizzes-container">
      <h2 className="my-quizzes-title">Danh sách Quiz của bạn</h2>
      {quizzes.length === 0 ? (
        <div className="my-quizzes-empty">Bạn chưa có quiz nào.</div>
      ) : (
        <ul className="my-quizzes-list">
           {quizzes.map((quiz, idx) => (
              <li
                key={quiz.quiz_id}
                className="my-quizzes-item"
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => navigate(`/quiz-editor/${quiz.quiz_id}`)}
              >
                <span className="my-quizzes-item-index">Quiz {idx + 1}:</span>
                <span className="my-quizzes-item-title" style={{ flex: 1, marginLeft: 8 }}>{quiz.title}</span>
                <span
                  title="Sửa"
                  style={{ marginRight: 12, color: '#888', cursor: 'pointer' }}
                  onClick={e => { e.stopPropagation(); navigate(`/quiz/edit/${quiz.id}`); }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.586 3.586a2 2 0 0 1 2.828 2.828l-8.5 8.5-3.5.5.5-3.5 8.5-8.5z" stroke="#888" strokeWidth="1.5"/>
                  </svg>
                </span>
                <span
                  title="Xóa"
                  style={{ color: '#e74c3c', cursor: 'pointer' }}
                  onClick={e => { e.stopPropagation(); /* TODO: handle delete */ }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="8" width="10" height="7" rx="1" stroke="#e74c3c" strokeWidth="1.5"/>
                    <path d="M8 8V6a2 2 0 0 1 4 0v2" stroke="#e74c3c" strokeWidth="1.5"/>
                  </svg>
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MyQuizzes; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getToken } from '../../utils/auth';

const EditReview = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const token = getToken();
        const res = await axios.get(`/api/reviews/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookTitle(res.data.bookTitle);
        setReview(res.data.review);
        setRating(res.data.rating);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchReview();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();
      await axios.put(
        `/api/reviews/${id}`,
        { bookTitle, review, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push('/reviews');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Edit Review</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Title</label>
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditReview;

// src/features/auth/Callback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccessToken } from '@/api/auth';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      fetchAccessToken(code, state)
        .then(() => {
          // token is now stored in sessionService
          navigate('/'); // redirect to home or dashboard
        })
        .catch(err => {
          console.error(err);
          navigate('/login'); // or show an error
        });
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;

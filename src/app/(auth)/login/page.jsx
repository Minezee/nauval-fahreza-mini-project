'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, signInAnonymously, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase/init';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      document.cookie = `authToken=${token}; path=/`;
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const token = await auth.currentUser.getIdToken();
      document.cookie = `authToken=${token}; path=/`; // Set the token in cookies
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      const token = await auth.currentUser.getIdToken();
      document.cookie = `authToken=${token}; path=/`; // Set the token in cookies
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-secondary rounded-lg border-white/40 border">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-tertiary rounded-lg border border-primary2 focus:outline-none focus:ring-2 focus:ring-primary2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-tertiary rounded-lg border border-primary2 focus:outline-none focus:ring-2 focus:ring-primary2"
          />
          <button
            type="submit"
            className="w-full p-3 bg-primary2 hover:bg-primary rounded-lg font-bold border-white/20 border"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full p-3 bg-red-500 hover:bg-red-700 rounded-lg font-bold mt-4"
        >
          Login with Google
        </button>
        <button
          onClick={handleAnonymousLogin}
          className="w-full p-3 bg-gray-500 hover:bg-gray-700 rounded-lg font-bold mt-4"
        >
          Login Anonymously
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

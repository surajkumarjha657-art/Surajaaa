import { useState } from 'react';
import { motion } from 'motion/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, LogIn } from 'lucide-react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user is in 'admins' collection
      const adminDoc = await getDoc(doc(db, 'admins', result.user.uid));
      
      if (adminDoc.exists()) {
        navigate('/admin/dashboard');
      } else {
        setError("You are not authorized to view the dashboard.");
        // Optional: Let the developer become an admin if no admins exist or via a special flow
        // For development, we'll show a button if the email matches the developer's email
        // or just let them "request" it.
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const becomeAdmin = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await setDoc(doc(db, 'admins', auth.currentUser.uid), {
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        role: 'superadmin'
      });
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError("Failed to grant admin access. Check Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-cafe-cream px-6">
      <div className="max-w-md w-full glass-card rounded-[40px] p-12 text-center space-y-8 shadow-2xl border-cafe-brown/5">
        <div className="w-20 h-20 bg-cafe-brown/10 rounded-3xl flex items-center justify-center mx-auto text-cafe-brown">
          <ShieldAlert size={40} />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-cafe-brown">Admin Portal</h1>
          <p className="text-cafe-dark/60 italic">Secure access for cafe curation.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-center gap-3"
          >
            <ShieldAlert size={16} />
            {error}
          </motion.div>
        )}

        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full bg-cafe-brown text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-cafe-terracotta transition-all disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : <><LogIn size={20} /> SIGN IN WITH GOOGLE</>}
        </button>

        {error && error.includes("authorized") && (
          <div className="pt-6 border-t border-cafe-brown/5">
             <button 
              onClick={becomeAdmin}
              className="text-[10px] uppercase font-bold tracking-widest text-cafe-terracotta hover:text-cafe-brown underline"
            >
              Development: Grant Admin Access to current user
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

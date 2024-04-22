import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase'; // Adjust the path as necessary
import '../styles/AuthPageStyles.css'; // Ensure this path matches your project structure

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      // Step 1: Login the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Query Firestore for the user's role and collegeId
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const { role, collegeId } = userData;

        // Store collegeId in local storage if role is College
        if (role === 'College' && collegeId) {
          localStorage.setItem('collegeId', collegeId);
        }

        // Step 3: Redirect based on role
        if (role === 'Student') {
          navigate("/student-dashboard");
        } else if (role === 'College') {
          navigate("/college-dashboard");
        } else {
          setError("Role not recognized.");
          setLoading(false); // Reset loading state on error
        }
      } else {
        setError("No user data found.");
        setLoading(false); // Reset loading state on error
      }
    } catch (error) {
      setError(error.message);
      setLoading(false); // Reset loading state on error
    }
  };

  const handleSignUpNavigation = () => {
    navigate("/signup"); // Navigates to the sign-up page
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="input-container">
          <input
            className="input1" 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
          />
        </div>
        <div className="input-container">
          <input
            className="input1" 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div style={{marginTop: "20px"}}>
        <button className='button' onClick={handleSignUpNavigation}>New user? Sign up</button>
      </div>
    </div>
  );
};

export default LoginPage;

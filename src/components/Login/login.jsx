import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase'; // Make sure this path matches your project structure

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      // Step 1: Login the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Query Firestore for the user's role
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { role } = docSnap.data();

        // Step 3: Redirect based on role
        if (role === 'Student') {
          navigate("/student-dashboard");
        } else if (role === 'College') {
          navigate("/college-dashboard");
        } else {
          setError("Role not recognized.");
        }
      } else {
        setError("No user data found.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUpNavigation = () => {
    navigate("/signup"); // Navigates to the sign-up page
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <div style={{marginTop: "20px"}}>
        <button onClick={handleSignUpNavigation}>New user? Sign up</button>
      </div>
    </div>
  );
};

export default LoginPage;
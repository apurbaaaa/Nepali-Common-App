import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase'; // Ensure this path matches your project structure
import '../styles/AuthPageStyles.css'; // Update the path as necessary for your styling

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const role = event.target.elements.role.value;

    if (!email || password.length < 6 || !role) {
      setError("Please fill all fields correctly.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        email: email, // User's email
        role: role, // User's selected role
      };

      // If the role is College, store the user's UID as collegeId
      if (role === "College") {
        userData.collegeId = user.uid; // Storing UID as collegeId for colleges
      }

      // Store the user's data in Firestore
      await setDoc(doc(db, "users", user.uid), userData);
      
      console.log("User registered successfully with role:", role);
      // Navigate based on the role
      if (role === "Student") {
        navigate("/student-dashboard"); // Navigate to student dashboard
      } else if (role === "College") {
        navigate("/college-dashboard"); // Navigate to college dashboard
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <select name="role" required defaultValue="">
          <option value="" disabled>Select Role</option>
          <option value="Student">Student</option>
          <option value="College">College</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;

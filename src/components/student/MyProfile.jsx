import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import './MyProfile.css';

const ProfilePage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    email: '',
    phone: '',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
    educationDetails: '',
    eca: ''
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // This function is used when submitting data for any of the forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "studentdetails"), formData);
      console.log("Document written with ID: ", docRef.id);
      resetFormData();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      age: '',
      address: '',
      email: '',
      phone: '',
      fatherName: '',
      fatherPhone: '',
      motherName: '',
      motherPhone: '',
      educationDetails: '',
      eca: ''
    });
  };

  return (
    <div className="profile-page">
      <div className="tab-nav">
        <button
          className={`tab-nav-button ${activeTab === 'personalInfo' && 'active'}`}
          onClick={() => handleTabChange('personalInfo')}
        >
          Personal Info
        </button>
        <button
          className={`tab-nav-button ${activeTab === 'education' && 'active'}`}
          onClick={() => handleTabChange('education')}
        >
          Education
        </button>
        <button
          className={`tab-nav-button ${activeTab === 'eca' && 'active'}`}
          onClick={() => handleTabChange('eca')}
        >
          Extra Co-Curriculum Activities
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'personalInfo' && (
          <PersonalInfoForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}  // Used general handleSubmit for all forms
          />
        )}
        {activeTab === 'education' && (
          <EducationForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}  // Used general handleSubmit for all forms
          />
        )}
        {activeTab === 'eca' && (
          <Eca
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}  // Used general handleSubmit for all forms
          />
        )}
      </div>
    </div>
  );
};

const PersonalInfoForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father's Name" required />
      <input type="tel" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} placeholder="Father's Phone" required />
      <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Mother's Name" required />
      <input type="tel" name="motherPhone" value={formData.motherPhone} onChange={handleChange} placeholder="Mother's Phone" required />
    </form>
  );
};

const EducationForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        name="educationDetails"
        value={formData.educationDetails}
        onChange={handleChange}
        placeholder="Education Details"
        required
      />
    </form>
  );
};

const Eca = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        name="eca"
        value={formData.eca}
        onChange={handleChange}
        placeholder="Extra-Curricular Activities"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfilePage;

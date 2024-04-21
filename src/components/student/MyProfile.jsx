import React, { useState } from 'react';
import './MyProfile.css'; // Import your CSS file for styling

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personalInfo');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
        {activeTab === 'personalInfo' && <PersonalInfoForm />}
        {activeTab === 'education' && <EducationForm />}
        {activeTab === 'eca' && <Eca/>}
      </div>
    </div>
  );
};

const PersonalInfoForm = () => {
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

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
      <button type="submit">Submit</button>
    </form>
  );
};

const EducationForm = () => {
  const [formData, setFormData] = useState({
    educationDetails: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        name="educationDetails"
        value={formData.educationDetails}
        onChange={handleChange}
        placeholder="Education Details"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

const Eca = () => {
    const [formData, setFormData] = useState({
        eca: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
      };

      return(
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
}

export default ProfilePage;

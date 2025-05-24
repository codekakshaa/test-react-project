import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${formData.name}, Phone: ${formData.phone}, Date of Birth: ${formData.dob}, Email: ${formData.email}`);
    // In a real app, you would send this data to a backend
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input 
            type="date" 
            id="dob" 
            name="dob" 
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group password-field">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span 
              className="password-toggle" 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
        </div>
        <button type="submit" className="submit-btn">Sign Up</button>
        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup; 
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Signup() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Example: Password must be at least 8 characters long
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateEmail(formData.email)) {
      setError("Invalid email address.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      // Simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        dob: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
      });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Signup successful!</div>}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            id="confirmPassword" 
            name="confirmPassword" 
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="checkbox" 
            id="termsAccepted" 
            name="termsAccepted" 
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <label htmlFor="termsAccepted">I agree to the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link></label>
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <button type="button" className="cancel-btn" onClick={() => history.goBack()}>Cancel</button>
        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link> | <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup; 
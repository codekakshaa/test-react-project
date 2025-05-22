import './App.css';
import { useState } from 'react';

// Intentionally problematic function with ESLint issues
function processUserData(userData) {
  var result = [];  // Using var instead of const/let (ESLint prefers const/let)
  
  // Unused variable (ESLint warning)
  let unusedVariable = "This variable is never used";
  
  // Missing radix parameter in parseInt (ESLint warning)
  const userAge = parseInt(userData.age);
  
  // Unnecessary else after return (ESLint error)
  if (userAge > 18) {
    return "Adult";
  } else {
    return "Minor";
  }
  
  // Unreachable code (ESLint error)
  console.log("This code will never execute");
  
  // No-op assignment (ESLint warning)
  result = result;
  
  // Missing return statement (ESLint warning)
}

function App() {
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
  };

  return (
    <div className="App">
      <div className="form-container">
        <h2>Contact Form</h2>
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
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;

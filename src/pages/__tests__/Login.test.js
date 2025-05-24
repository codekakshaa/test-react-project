import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

// Mock the onLogin function
const mockOnLogin = jest.fn();

// Wrapper component to provide router context
const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login onLogin={mockOnLogin} />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockOnLogin.mockClear();
  });

  test('renders login form with all elements', () => {
    renderLogin();
    
    // Check if all form elements are present
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Test email input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    // Test password input
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('toggles password visibility', () => {
    renderLogin();
    
    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /👁️/i });

    // Initially password should be hidden
    expect(passwordInput.type).toBe('password');

    // Click toggle button
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    // Click toggle button again
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  test('submits form with valid credentials', async () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if onLogin was called with correct credentials
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('validates required fields', async () => {
    renderLogin();
    
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Try to submit without filling the form
    fireEvent.click(submitButton);

    // Check if onLogin was not called
    expect(mockOnLogin).not.toHaveBeenCalled();

    // Check if required validation is working
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });

  test('validates email format', async () => {
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // Check if onLogin was not called
    expect(mockOnLogin).not.toHaveBeenCalled();

    // Check if email validation is working
    expect(emailInput).toBeInvalid();
  });

  test('navigates to signup page', () => {
    renderLogin();
    
    const signupLink = screen.getByRole('link', { name: /sign up/i });
    expect(signupLink.getAttribute('href')).toBe('/signup');
  });
}); 
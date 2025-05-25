import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../Signup';

// Wrapper component to provide router context
const renderSignup = () => {
  return render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
};

describe('Signup Component', () => {
  test('renders signup form with all elements', () => {
    renderSignup();

    // Check if all form elements are present
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    renderSignup();

    const nameInput = screen.getByLabelText(/name/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const dobInput = screen.getByLabelText(/date of birth/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const termsCheckbox = screen.getByLabelText(/terms and conditions/i);

    // Test all input fields
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    expect(phoneInput.value).toBe('1234567890');

    fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
    expect(dobInput.value).toBe('1990-01-01');

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput.value).toBe('john@example.com');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');

    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    expect(confirmPasswordInput.value).toBe('password123');

    fireEvent.click(termsCheckbox);
    expect(termsCheckbox.checked).toBe(true);
  });

  test('toggles password visibility', () => {
    renderSignup();

    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const toggleButton = screen.getByRole('button', { name: /👁️/ });

    // Initially passwords should be hidden
    expect(passwordInput.type).toBe('password');
    expect(confirmPasswordInput.type).toBe('password');

    // Click toggle button
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    expect(confirmPasswordInput.type).toBe('text');

    // Click toggle button again
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
    expect(confirmPasswordInput.type).toBe('password');
  });

  test('validates required fields', async () => {
    renderSignup();

    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Try to submit empty form
    fireEvent.click(submitButton);

    // Check if all required fields are marked as invalid
    expect(screen.getByLabelText(/name/i)).toBeInvalid();
    expect(screen.getByLabelText(/phone/i)).toBeInvalid();
    expect(screen.getByLabelText(/date of birth/i)).toBeInvalid();
    expect(screen.getByLabelText(/email/i)).toBeInvalid();
    expect(screen.getByLabelText('Password')).toBeInvalid();
    expect(screen.getByLabelText(/confirm password/i)).toBeInvalid();
  });

  test('validates email format', async () => {
    renderSignup();

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // Check if email validation error is shown
    expect(screen.getByText('Invalid email address.')).toBeInTheDocument();
  });

  test('validates password match', async () => {
    renderSignup();

    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Enter different passwords
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.click(submitButton);

    // Check if password match error is shown
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });

  test('validates password length', async () => {
    renderSignup();

    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Enter short password
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    // Check if password length error is shown
    expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument();
  });

  test('requires terms acceptance', async () => {
    renderSignup();

    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Fill in valid form data but don't accept terms
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Check if terms acceptance error is shown
    expect(screen.getByText('You must accept the terms and conditions.')).toBeInTheDocument();
  });

  test('shows success message on successful submission', async () => {
    renderSignup();

    // Fill in valid form data
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByLabelText(/terms and conditions/i));

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Check if success message appears
    await waitFor(() => {
      expect(screen.getByText('Signup successful!')).toBeInTheDocument();
    });
  });

  test('navigates to login page', () => {
    renderSignup();

    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink.getAttribute('href')).toBe('/login');
  });

  test('navigates to terms and privacy pages', () => {
    renderSignup();

    const termsLink = screen.getByRole('link', { name: /terms and conditions/i });
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });

    expect(termsLink.getAttribute('href')).toBe('/terms');
    expect(privacyLink.getAttribute('href')).toBe('/privacy');
  });
}); 
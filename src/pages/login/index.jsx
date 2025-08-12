import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('hotelguest_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // If remember me was checked or session is still valid, redirect to dashboard
        if (user?.rememberMe || isSessionValid(user?.loginTime)) {
          navigate('/dashboard-principal');
        } else {
          // Clear expired session
          localStorage.removeItem('hotelguest_user');
        }
      } catch (error) {
        // Clear corrupted session data
        localStorage.removeItem('hotelguest_user');
      }
    }
  }, [navigate]);

  const isSessionValid = (loginTime) => {
    const now = new Date();
    const login = new Date(loginTime);
    const hoursDiff = (now - login) / (1000 * 60 * 60);
    return hoursDiff < 8; // Session valid for 8 hours
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main Login Container */}
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl shadow-modal p-8">
          {/* Header Section */}
          {/* <LoginHeader /> */}
          
          {/* Form Section */}
          <LoginForm />
          
          {/* Footer Section */}
          {/* <LoginFooter /> */}
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default LoginPage;
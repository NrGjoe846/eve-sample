import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Loader from './ui/Loader';

const AuthSystem = () => {
  const navigate = useNavigate();
  const { 
    logIn, 
    signUp, 
    googleSignIn, 
    githubSignIn,
    resetPassword, 
    skipAuth 
  } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !formData.username) {
      newErrors.username = 'Username is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      if (isLogin) {
        // Login with email/password
        await logIn(formData.email, formData.password);
      } else {
        // Sign up with email/password
        await signUp(formData.email, formData.password, formData.username);
      }
      
      // Show loader before navigating
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'Authentication failed. Please try again.';
      
      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection';
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error(error);
      setErrors({ submit: 'Google sign in failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle GitHub sign in
  const handleGithubSignIn = async () => {
    setLoading(true);
    try {
      await githubSignIn();
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error(error);
      setErrors({ submit: 'GitHub sign in failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handleResetPassword = async () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    setLoading(true);
    try {
      await resetPassword(formData.email);
      setResetSent(true);
    } catch (error: any) {
      console.error(error);
      setErrors({ submit: 'Failed to send reset email. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle skip authentication (guest mode)
  const handleSkip = () => {
    skipAuth();
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      navigate('/dashboard');
    }, 2000);
  };

  if (showLoader) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-white/70">
              {isLogin ? 'Sign in to continue to your account' : 'Sign up to get started with your new account'}
            </p>
          </div>
          
          {/* Reset Password Success Message */}
          {resetSent && (
            <div className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200">
              Password reset link sent to your email!
            </div>
          )}
          
          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
              {errors.submit}
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Username Field (Sign Up only) */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-white/70 mb-2 text-sm" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`bg-white/5 border ${
                      errors.username ? 'border-red-500/50' : 'border-white/10'
                    } text-white rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                    placeholder="Your username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                )}
              </div>
            )}
            
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-white/70 mb-2 text-sm" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white/5 border ${
                    errors.email ? 'border-red-500/50' : 'border-white/10'
                  } text-white rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
            
            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-white/70 mb-2 text-sm" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-white/5 border ${
                    errors.password ? 'border-red-500/50' : 'border-white/10'
                  } text-white rounded-lg block w-full pl-10 pr-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>
            
            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-sm text-purple-300 hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-70"
            >
              {loading ? (
                <span className="inline-block h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-white/10"></div>
              <span className="px-3 text-sm text-white/40">or continue with</span>
              <div className="flex-grow h-px bg-white/10"></div>
            </div>
            
            {/* Social Auth Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex items-center justify-center space-x-2 bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white hover:bg-white/10 transition-colors w-full"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>
              
              {/* GitHub Authentication Button */}
              <button
                type="button"
                onClick={handleGithubSignIn}
                disabled={loading}
                className="flex items-center justify-center space-x-2 bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white hover:bg-white/10 transition-colors w-full"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </button>
            </div>
            
            {/* Skip Authentication */}
            <div className="text-center mb-6">
              <button
                type="button"
                onClick={handleSkip}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Continue as guest
              </button>
            </div>
            
            {/* Toggle Login/Signup */}
            <div className="text-center">
              <p className="text-white/70">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-purple-300 hover:text-white transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;

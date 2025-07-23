import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useSelfHeal } from '../contexts/SelfHealContext';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import SelfHealBanner from './SelfHealBanner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { userProfiles } from '@/data/userProfiles';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const { isHealing } = useSelfHeal();
  const { login } = useUser();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Check credentials against predefined users
    const matchedUser = userProfiles.find(u => u.email === email && u.password === password);
    if (!matchedUser) {
      setIsLoading(false);
      alert('Login failed. Please check your credentials.');
      return;
    }
    setUserId(matchedUser.userId.toString());
    const success = await login(matchedUser.userId.toString(), email);
    setIsLoading(false);
    if (success) {
      navigate('/profile');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  const getElementId = (base: string) => {
    // if (isHealing) {
    //   // Simulate ID changes
    //   const idMap: { [key: string]: string } = {
    //     'email-input': 'user-email-field',
    //     'password-input': 'user-password-field',
    //     'login-submit': 'submit-login-button',
    //     'show-password': 'toggle-password-visibility'
    //   };
    //   return idMap[base] || base;
    // }
    return base;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 
              className="text-3xl font-bold text-gray-900 mb-2"
              id={isHealing ? 'login-page-title' : 'login-title'}
            >
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {isHealing && (
            <div className="mb-4 flex justify-center">
              <SelfHealBanner />
            </div>
          )}

          {/* Healing mode: visually change select layout and style, but preserve onChange logic */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isHealing ? (
              // Normal mode
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Quick Select User</label>
                  <select
                    id={getElementId('user-select')}
                    value={selectedUser}
                    onChange={e => {
                      setSelectedUser(e.target.value);
                      const user = userProfiles.find(u => u.email === e.target.value);
                      if (user) {
                        setEmail(user.email);
                        setPassword(user.password);
                        setUserId(user.userId.toString());
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg mb-4 border border-gray-300 bg-gray-50 font-medium"
                  >
                    <option value="">Choose a test user...</option>
                    {userProfiles.map(u => (
                      <option key={u.email} value={u.email}>{u.email}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Input
                    type="email"
                    id={getElementId('email-input')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id={getElementId('password-input')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    id={getElementId('show-password')}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:text-blue-700 bg-transparent shadow-none border-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </>
            ) : (
              // Healing mode: Restructured layout, extra wrappers, visual changes
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                  <div className="w-1/2">
                    <div className="bg-orange-100 p-2 rounded shadow">
                      <span className="text-xs text-orange-700">User Select Wrapper</span>
                      <select
                        className="w-full px-3 py-2 rounded-lg mb-2 border-2 border-orange-400 bg-orange-50 font-bold"
                        id={getElementId('user-select')}
                        value={selectedUser}
                        onChange={e => {
                          setSelectedUser(e.target.value);
                          const user = userProfiles.find(u => u.email === e.target.value);
                          if (user) {
                            setEmail(user.email);
                            setPassword(user.password);
                            setUserId(user.userId.toString());
                          }
                        }}
                      >
                        <option value="">Choose a test user...</option>
                        {userProfiles.map(u => (
                          <option key={u.email} value={u.email}>{u.email}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col gap-2">
                    <div className="bg-orange-100 p-2 rounded shadow">
                      <span className="text-xs text-orange-700">Email Wrapper</span>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                        <input
                          type="email"
                          id={getElementId('email-input')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50 font-bold"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="bg-orange-100 p-2 rounded shadow">
                      <span className="text-xs text-orange-700">Password Wrapper</span>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id={getElementId('password-input')}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50 font-bold"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          id={getElementId('show-password')}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Button
              type="submit"
              id={getElementId('login-submit')}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

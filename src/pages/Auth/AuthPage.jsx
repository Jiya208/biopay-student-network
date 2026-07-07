import { Suspense, lazy, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { detectRoleFromEmail, ROLE_META } from '../../utils/roleDetection';
import logo from '../../assets/logo-ui.png';

const Login3DBackground = lazy(() => import('../../components/auth/Login3DBackground'));

const validatePassword = (pw) => {
  return {
    minLength: pw.length >= 8,
    hasUpper: /[A-Z]/.test(pw),
    hasLower: /[a-z]/.test(pw),
    hasNumber: /[0-9]/.test(pw),
    hasSpecial: /[^A-Za-z0-9]/.test(pw)
  };
};

const PasswordChecklist = ({ password, isDarkMode }) => {
  const checks = validatePassword(password);

  const items = [
    { label: 'Minimum 8 characters', met: checks.minLength },
    { label: 'At least one uppercase letter (A-Z)', met: checks.hasUpper },
    { label: 'At least one lowercase letter (a-z)', met: checks.hasLower },
    { label: 'At least one number (0-9)', met: checks.hasNumber },
    { label: 'At least one special character', met: checks.hasSpecial },
  ];

  return (
    <div className={`mt-2.5 space-y-1.5 rounded-xl border p-3 text-left text-xs ${
      isDarkMode ? 'border-white/10 bg-black/40' : 'border-slate-200 bg-slate-50'
    }`}>
      <p className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        Password Requirements
      </p>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[10px] ${
            item.met
              ? 'bg-green-500/20 text-green-500'
              : isDarkMode
                ? 'bg-slate-800 text-slate-500'
                : 'bg-slate-200 text-slate-500'
          }`}>
            {item.met ? '✓' : '•'}
          </span>
          <span className={item.met ? 'font-semibold text-green-500' : isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function AuthPage({ initialMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register, settings } = useApp();
  const isDarkMode = settings?.darkMode ?? true;

  // Derive mode from URL
  const urlMode = location.pathname.includes('register') || location.pathname.includes('signup') ? 'register' : 'login';
  const [mode, setMode] = useState(initialMode || urlMode);

  // Registration step state
  const [registerStep, setRegisterStep] = useState(1);
  const [detectedRoleForRegister, setDetectedRoleForRegister] = useState(null);

  // Shared fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Register Step 1 fields
  const [name, setName] = useState('');

  // Register Step 2 — role-specific fields
  const [collegeName, setCollegeName] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [terms, setTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const switchMode = (m) => {
    setMode(m);
    setError('');
    setRegisterStep(1);
    setDetectedRoleForRegister(null);
    if (m === 'forgot') return;
    navigate(m === 'register' ? '/signup' : '/login', { replace: true });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password required');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      // Redirection after successful login directly to the main BSN dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Register Step 1: Validate → silently detect role → proceed to Step 2
  const handleRegisterContinue = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !name.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    // Silent background role detection
    const detection = detectRoleFromEmail(email);
    setDetectedRoleForRegister((detection && detection.role) || 'student');
    setRegisterStep(2);
  };

  // Register Step 2: Validate role-specific fields → create account → redirect
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) {
      setError('Password is required');
      return;
    }

    const checks = validatePassword(password);
    if (!Object.values(checks).every(Boolean)) {
      setError('Password does not meet all complexity requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!terms) {
      setError('You must agree to the Terms of Service & Privacy Policy');
      return;
    }

    const role = detectedRoleForRegister || 'student';

    if (role === 'student' && (!collegeName.trim() || !startYear.trim() || !endYear.trim())) {
      setError('Please fill in all fields');
      return;
    }
    if (role === 'faculty' && !institutionName.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (role === 'recruiter' && !companyName.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const university = collegeName.trim() || institutionName.trim() || companyName.trim() || 'BioPay University';
      const data = {
        name: name.trim(),
        email,
        password,
        role,
        college: university,
        university: university,
        graduationYear: endYear.trim(),
        startYear: startYear.trim(),
        endYear: endYear.trim(),
        institution: university,
        company: companyName.trim()
      };
      await register(data);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }

    const checks = validatePassword(password);
    if (!Object.values(checks).every(Boolean)) {
      setError('Password does not meet all complexity requirements');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Show success feedback in error field by wrapping in success object
      setError({ success: 'Password has been reset successfully! You can now log in.' });
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setMode('login');
        setError('');
      }, 3000);
    } catch {
      setError('Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    // Autofill with the mock student persona
    login('alex.rivera@university.edu', 'secret123')
      .then(() => navigate('/dashboard', { replace: true }))
      .catch(() => setError('OAuth simulation failed'))
      .finally(() => setLoading(false));
  };

  const getEyeIcon = (isVisible, toggleFunc) => (
    <button
      type="button"
      aria-label={isVisible ? 'Hide password' : 'Show password'}
      onClick={toggleFunc}
      className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 transition-colors ${
        isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'
      }`}
    >
      {isVisible ? (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.8 21.8 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a21.77 21.77 0 0 1-3.16 4.19M1 1l22 22M9.53 9.53a3 0 0 0 4.24 4.24" />
        </svg>
      ) : (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );

  const renderMessage = () => {
    if (!error) return null;
    const isSuccess = typeof error === 'object' && error.success;
    return (
      <div className={`text-[13px] border px-4 py-3 rounded-xl ${
        isSuccess
          ? 'text-green-300 bg-green-950/50 border-green-500/30'
          : 'text-red-300 bg-red-950/50 border-red-500/30'
      }`}>
        {isSuccess ? error.success : error}
      </div>
    );
  };

  const inputClass = isDarkMode
    ? 'w-full rounded-xl border border-white/12 bg-black/35 px-4 py-3 text-[14px] text-white placeholder:text-slate-500 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
    : 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-950 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/15';
  const labelClass = `mb-1.5 block text-[13px] font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`;
  const btnPrimaryClass = 'w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_25px_rgba(37,99,235,0.35)] transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(37,99,235,0.5)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100';
  const pageClass = isDarkMode
    ? 'min-h-screen bg-[#0B1220] text-white flex flex-col lg:flex-row relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white text-left'
    : 'min-h-screen bg-white text-slate-950 flex flex-col lg:flex-row relative overflow-hidden font-sans selection:bg-blue-100 selection:text-slate-950 text-left';
  const authCardClass = isDarkMode
    ? 'relative z-10 w-full max-w-[440px] rounded-[28px] border border-white/12 bg-[#0A101D]/75 p-6 shadow-[0_32px_80px_rgba(0,0,0,0.65),0_0_40px_rgba(37,99,235,0.12)] backdrop-blur-2xl transition-all duration-300 sm:bg-white/[0.045] sm:p-9'
    : 'relative z-10 w-full max-w-[440px] rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.10)] transition-all duration-300 sm:p-9';
  const tabBarClass = isDarkMode
    ? 'relative mb-7 flex rounded-2xl border border-white/10 bg-black/45 p-1.5 backdrop-blur-md'
    : 'relative mb-7 flex rounded-2xl border border-slate-200 bg-slate-100 p-1.5';
  const tabIndicatorClass = isDarkMode
    ? 'absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl border border-blue-400/30 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 shadow-[0_2px_12px_rgba(37,99,235,0.35)] transition-all duration-300 ease-out'
    : 'absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl border border-slate-200 bg-white shadow-[0_10px_22px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out';
  const headingClass = `font-display text-[24px] font-semibold tracking-tight sm:text-[26px] ${isDarkMode ? 'text-white' : 'text-slate-950'}`;
  const subheadingClass = `${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mt-1 text-[13px] leading-relaxed sm:text-[14px]`;
  const brandTitleClass = `text-[20px] font-display font-semibold leading-tight tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`;
  const brandSubtitleClass = `${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-[12px] font-normal`;
  const heroTitleClass = `font-display text-[36px] font-bold leading-[1.08] tracking-tight sm:text-[46px] xl:text-[52px] ${isDarkMode ? 'text-white' : 'text-slate-950'}`;
  const heroBodyClass = `${isDarkMode ? 'text-slate-300/90' : 'text-slate-600'} mt-5 max-w-[460px] text-[15px] leading-relaxed sm:text-[16px]`;
  const statValueClass = `text-[20px] font-display font-semibold tracking-tight sm:text-[22px] ${isDarkMode ? 'text-white' : 'text-slate-950'}`;
  const statLabelClass = `${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mt-0.5 text-[12px]`;
  const bottomMetaClass = `relative z-10 hidden items-center gap-6 text-[12px] font-medium sm:flex ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`;
  const inlineLinkClass = `bg-transparent border-none cursor-pointer text-[12px] font-medium transition-colors ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`;
  const backButtonClass = `rounded-xl border px-5 py-3.5 text-[14px] font-medium transition-all duration-200 ${isDarkMode ? 'border-white/12 text-slate-300 hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`;
  const checkboxClass = isDarkMode
    ? 'mt-1 rounded border-white/12 bg-black/35 text-blue-600 focus:ring-blue-500'
    : 'mt-1 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500';
  const socialButtonClass = isDarkMode
    ? 'w-full flex items-center justify-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] focus:outline-none'
    : 'w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none';
  const dividerLineClass = isDarkMode ? 'bg-white/10' : 'bg-slate-200';
  const dividerLabelClass = `${isDarkMode ? 'bg-[#0A101D] text-slate-500' : 'bg-white text-slate-500'} relative px-3 text-[10px] font-bold uppercase tracking-wider`;
  const footerNoteClass = `${isDarkMode ? 'text-slate-500' : 'text-slate-600'} mt-6 text-center text-[12px]`;

  return (
    <div className={pageClass}>
      <div className="absolute inset-0 h-full w-full pointer-events-none z-0">
        {isDarkMode ? (
          <Suspense
            fallback={
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(1000px 700px at 30% 50%, rgba(37,99,235,0.16), transparent 65%), radial-gradient(800px 600px at 80% 50%, rgba(124,58,237,0.12), transparent 60%), radial-gradient(600px 400px at 50% 90%, rgba(34,197,94,0.08), transparent 55%)',
                }}
              />
            }
          >
            <Login3DBackground />
          </Suspense>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(900px 620px at 20% 28%, rgba(37,99,235,0.10), transparent 58%), radial-gradient(700px 520px at 78% 26%, rgba(56,189,248,0.10), transparent 52%), linear-gradient(180deg, rgba(255,255,255,1), rgba(248,250,252,1))',
            }}
          />
        )}
      </div>

      <div className={`absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full blur-[140px] pointer-events-none z-0 ${isDarkMode ? 'bg-blue-600/15' : 'bg-blue-500/8'}`} />
      <div className={`absolute top-1/2 left-1/3 h-[500px] w-[500px] rounded-full blur-[150px] pointer-events-none z-0 ${isDarkMode ? 'bg-indigo-500/10' : 'bg-sky-400/8'}`} />
      <div className={`absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full blur-[140px] pointer-events-none z-0 ${isDarkMode ? 'bg-blue-500/10' : 'bg-cyan-400/8'}`} />

      {/* Left Hero Section */}
      <div className="relative w-full lg:w-[54%] xl:w-[56%] min-h-[380px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 z-10 order-1">
        {/* Brand Header */}
        <header className="relative z-10 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
            aria-label="Go back to landing page"
          >
            <img
              src={logo}
              alt="BioPay Student Network logo"
              className="w-11 h-11 object-contain drop-shadow-[0_4px_18px_rgba(37,99,235,0.45)]"
            />
            <div>
              <div className={brandTitleClass}>BioPay</div>
              <div className={brandSubtitleClass}>Student Network</div>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <main className="relative z-10 my-auto py-10 lg:py-16 max-w-[540px]">
          <h1 className={heroTitleClass}>
            One campus identity.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
              Every opportunity.
            </span>
          </h1>
          <p className={heroBodyClass}>
            Build your verified academic identity, showcase real achievements, and unlock internships, opportunities, and recognition — all in one place.
          </p>

          <div className={`mt-8 max-w-[460px] grid grid-cols-3 gap-4 border-t pt-8 sm:gap-6 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <div>
              <div className={statValueClass}>Verified Identity</div>
              <div className={statLabelClass}>College-confirmed profile</div>
            </div>
            <div>
              <div className={statValueClass}>Merit Scoring</div>
              <div className={statLabelClass}>Earn as you contribute</div>
            </div>
            <div>
              <div className={statValueClass}>Opportunity Match</div>
              <div className={statLabelClass}>Internships & more</div>
            </div>
          </div>
        </main>

        {/* Bottom Meta */}
        <footer className={bottomMetaClass}>
          <span className="flex items-center gap-1.5">✅ Verified Student Profiles</span>
          <span className="flex items-center gap-1.5">🏆 Merit-Based Recognition</span>
          <span className="flex items-center gap-1.5">🌐 BSN by ConnectBioPay</span>
        </footer>
      </div>

      {/* Right Auth Card Section */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-10 order-2 relative">
        <div className={authCardClass}>
          {/* Segmented Tab Bar */}
          {mode !== 'forgot' && (
            <div className={tabBarClass}>
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`relative z-10 flex-1 rounded-xl py-2.5 text-center text-[13px] font-medium transition-colors duration-200 sm:text-[14px] ${
                  mode === 'login'
                    ? isDarkMode
                      ? 'text-white'
                      : 'text-slate-950'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('register')}
                className={`relative z-10 flex-1 rounded-xl py-2.5 text-center text-[13px] font-medium transition-colors duration-200 sm:text-[14px] ${
                  mode === 'register'
                    ? isDarkMode
                      ? 'text-white'
                      : 'text-slate-950'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Register
              </button>
              {/* Animated indicator */}
              <div
                className={`${tabIndicatorClass} ${mode === 'login' ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}
              />
            </div>
          )}

          {/* Card Header — changes based on mode & step */}
          <div className="mb-6">
            <h2 className={headingClass}>
              {mode === 'login'
                ? 'Welcome back'
                : mode === 'forgot'
                  ? 'Reset password'
                  : registerStep === 1
                    ? 'Create an account'
                    : 'Complete your registration'}
            </h2>
            <p className={subheadingClass}>
              {mode === 'login'
                ? 'Enter your credentials to access your workspace'
                : mode === 'forgot'
                  ? 'Enter your email and set a new secure password'
                  : registerStep === 1
                    ? 'Join the BioPay Student Network in less than 60 seconds'
                    : 'Just a few more details to get started'}
            </p>
          </div>

          {/* ════════════════════ LOGIN FORM ════════════════════ */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="login-email" className={labelClass}>
                  Official Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@organization.com"
                  className={inputClass}
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="login-password" className={labelClass}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className={inlineLinkClass}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputClass} pr-11`}
                    required
                  />
                  {getEyeIcon(showPassword, () => setShowPassword(!showPassword))}
                </div>
              </div>

              {renderMessage()}

              <button
                type="submit"
                disabled={loading}
                className={btnPrimaryClass}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          )}

          {/* ════════════════════ REGISTER — STEP 1 ════════════════════ */}
          {mode === 'register' && registerStep === 1 && (
            <form onSubmit={handleRegisterContinue} className="space-y-5">
              <div>
                <label htmlFor="reg-email" className={labelClass}>
                  Official Email Address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@organization.com"
                  className={inputClass}
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="reg-name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="reg-name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                  required
                />
              </div>

              {renderMessage()}

              <button
                type="submit"
                className={btnPrimaryClass}
              >
                Continue
              </button>
            </form>
          )}

          {/* ════════════════════ REGISTER — STEP 2 (Dynamic) ════════════════════ */}
          {mode === 'register' && registerStep === 2 && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 max-h-[62vh] lg:max-h-[520px] overflow-y-auto pr-1">
              {/* Subtle role indicator */}
              {detectedRoleForRegister && ROLE_META[detectedRoleForRegister] && (
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[12px] font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
                    style={{
                      backgroundColor: ROLE_META[detectedRoleForRegister].bg,
                      color: ROLE_META[detectedRoleForRegister].color,
                    }}
                  >
                    {ROLE_META[detectedRoleForRegister].icon} {ROLE_META[detectedRoleForRegister].label}
                  </span>
                </div>
              )}

              {/* ── Student fields ── */}
              {detectedRoleForRegister === 'student' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className={labelClass}>College Name</label>
                    <input
                      value={collegeName}
                      onChange={e => setCollegeName(e.target.value)}
                      placeholder="e.g. IIT Patna"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Start Year</label>
                      <input
                        value={startYear}
                        onChange={e => setStartYear(e.target.value)}
                        placeholder="2023"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>End Year</label>
                      <input
                        value={endYear}
                        onChange={e => setEndYear(e.target.value)}
                        placeholder="2027"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Faculty fields ── */}
              {detectedRoleForRegister === 'faculty' && (
                <div className="pt-2">
                  <label className={labelClass}>Institution Name</label>
                  <input
                    value={institutionName}
                    onChange={e => setInstitutionName(e.target.value)}
                    placeholder="e.g. IIT Patna"
                    className={inputClass}
                    required
                  />
                </div>
              )}

              {/* ── Recruiter fields ── */}
              {detectedRoleForRegister === 'recruiter' && (
                <div className="pt-2">
                  <label className={labelClass}>Company Name</label>
                  <input
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Google"
                    className={inputClass}
                    required
                  />
                </div>
              )}

              {/* ── Password & Confirm Password (all roles) ── */}
              <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className={`${inputClass} pr-11`}
                      required
                    />
                    {getEyeIcon(showPassword, () => setShowPassword(!showPassword))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`${inputClass} pr-11`}
                      required
                    />
                    {getEyeIcon(showConfirmPassword, () => setShowConfirmPassword(!showConfirmPassword))}
                  </div>
                </div>
              </div>

              {password && <PasswordChecklist password={password} isDarkMode={isDarkMode} />}

              <div className="flex items-start gap-2 pt-1 text-left">
                <input
                  id="reg-terms"
                  type="checkbox"
                  checked={terms}
                  onChange={e => setTerms(e.target.checked)}
                  className={checkboxClass}
                />
                <label htmlFor="reg-terms" className={`text-xs leading-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  I agree to the Terms of Service & Privacy Policy *
                </label>
              </div>

              {renderMessage()}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setRegisterStep(1); setError(''); }}
                  className={backButtonClass}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 ${btnPrimaryClass}`}
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </div>
            </form>
          )}

          {/* ════════════════════ FORGOT PASSWORD FORM ════════════════════ */}
          {mode === 'forgot' && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label htmlFor="forgot-email" className={labelClass}>
                  Official Email Address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@organization.com"
                  className={inputClass}
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="forgot-password" className={labelClass}>
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="forgot-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputClass} pr-11`}
                    required
                  />
                  {getEyeIcon(showPassword, () => setShowPassword(!showPassword))}
                </div>
              </div>

              <div>
                <label htmlFor="forgot-confirm-password" className={labelClass}>
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="forgot-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputClass} pr-11`}
                    required
                  />
                  {getEyeIcon(showConfirmPassword, () => setShowConfirmPassword(!showConfirmPassword))}
                </div>
              </div>

              {password && <PasswordChecklist password={password} isDarkMode={isDarkMode} />}

              {renderMessage()}

              <button
                type="submit"
                disabled={loading}
                className={btnPrimaryClass}
              >
                {loading ? 'Resetting Password…' : 'Reset Password'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className={inlineLinkClass}
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* Social login separator & Google OAuth */}
          {mode === 'login' && (
            <>
              <div className="relative flex items-center justify-center my-5">
                <div className={`absolute inset-x-0 h-[1px] ${dividerLineClass}`}></div>
                <span className={dividerLabelClass}>
                  Or connect with
                </span>
              </div>

              <button
                onClick={handleGoogleSignIn}
                type="button"
                className={socialButtonClass}
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.484 0-6.29-2.905-6.29-6.514 0-3.61 2.806-6.515 6.29-6.515 1.5 0 2.87.525 3.96 1.485l3.15-3.15C18.17 1.05 15.345 0 12.24 0 5.865 0 .685 5.25.685 12c0 6.75 5.18 12 11.555 12 6.51 0 11.235-4.47 11.235-11.22 0-.705-.075-1.395-.195-2.07H12.24z"
                  />
                </svg>
                Google OAuth
              </button>
            </>
          )}

          <div className={footerNoteClass}>
            © {new Date().getFullYear()} BioPay Student Network • v2.0
          </div>
        </div>
      </div>
    </div>
  );
}

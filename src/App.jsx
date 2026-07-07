import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { RoleProvider } from './context/RoleContext';
import ProtectedRoute from './components/ProtectedRoute';

const LandingPage = lazy(() => import('./pages/Landing/LandingPage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/Auth/SignupPage'));
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage'));
const ProfileEditPage = lazy(() => import('./pages/Profile/ProfileEditPage'));
const SkillsEditPage = lazy(() => import('./pages/Profile/SkillsEditPage'));
const InterestsEditPage = lazy(() => import('./pages/Profile/InterestsEditPage'));
const SyllabusEditPage = lazy(() => import('./pages/Syllabus/SyllabusEditPage'));
const SettingsPage = lazy(() => import('./pages/Settings/SettingsPage'));
const NotificationsPage = lazy(() => import('./pages/Notifications/NotificationsPage'));
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));

function AppLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-sm space-y-4">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary/15 border-t-primary" />
        <div>
          <p className="font-poppins text-lg font-semibold text-on-surface">Loading BSN</p>
          <p className="mt-1 text-sm text-on-surface-variant">
            Preparing your experience without changing any of your existing functionality.
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <RoleProvider>
        <Router>
          <Suspense fallback={<AppLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route
                path="/dashboard"
                element={(
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/profile"
                element={(
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/profile/edit"
                element={(
                  <ProtectedRoute>
                    <ProfileEditPage />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/profile/edit/skills"
                element={(
                  <ProtectedRoute>
                    <SkillsEditPage />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/profile/edit/interests"
                element={(
                  <ProtectedRoute>
                    <InterestsEditPage />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/syllabus/edit"
                element={(
                  <ProtectedRoute>
                    <SyllabusEditPage />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/settings"
                element={(
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/notifications"
                element={(
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                )}
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>

          <Suspense fallback={null}>
            <ChatbotWidget />
          </Suspense>
        </Router>
      </RoleProvider>
    </AppProvider>
  );
}

export default App;

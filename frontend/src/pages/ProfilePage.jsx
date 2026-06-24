import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiUser, HiMail, HiLockClosed, HiCalendar, HiSparkles, HiOutlinePencil } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';

const ProfilePage = () => {
  const { user, updateProfile, changePassword } = useAuth();
  
  // Tab control: 'profile' or 'password'
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Edit fields state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // Password fields state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.name.trim()) {
      toast.error('Name cannot be empty.');
      return;
    }

    setProfileLoading(true);
    const result = await updateProfile(profileData);
    setProfileLoading(false);

    if (result.success) {
      toast.success('Profile details updated!');
    } else {
      toast.error(result.message || 'Profile update failed.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error('All password fields are required.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    setPasswordLoading(true);
    const result = await changePassword(currentPassword, newPassword);
    setPasswordLoading(false);

    if (result.success) {
      toast.success('Your password has been changed.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } else {
      toast.error(result.message || 'Password update failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        
        {/* Page title */}
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            User Profile
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm sm:text-base">
            Manage your account metrics, update chef bio details, and modify password credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Avatar & summary metrics */}
          <div className="zero-card rounded-[2.5rem] p-6 md:col-span-4 text-center space-y-5">
            <div className="relative inline-block mx-auto group">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-2 border-teal-500 shadow-md group-hover:scale-105 transition-transform object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-slate-105 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl text-slate-400">
                  🍳
                </div>
              )}
              {/* Profile decorator */}
              <span className="absolute bottom-0 right-0 bg-teal-600 border-2 border-white dark:border-slate-900 p-1.5 rounded-full text-white text-xs shadow-sm cursor-pointer">
                <HiOutlinePencil />
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{user?.name}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium font-mono">{user?.email}</p>
            </div>

            {user?.bio && (
              <p className="text-slate-505 dark:text-slate-400 text-xs italic leading-relaxed px-2">
                "{user.bio}"
              </p>
            )}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 text-left text-xs">
              <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                <HiCalendar className="text-teal-605 dark:text-teal-400 text-base" />
                <span>Joined: {user?.createdAt || '2026-06-20'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-505 dark:text-slate-400">
                <HiSparkles className="text-amber-500 text-base" />
                <span>Generations: {user?.generatedCount || 24} times</span>
              </div>
            </div>
          </div>

          {/* Right panel: Tab forms */}
          <div className="zero-card rounded-[2.5rem] p-6 md:col-span-8 space-y-6">
            
            {/* Tabs head */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500'
                }`}
              >
                Edit Profile details
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'password'
                    ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500'
                }`}
              >
                Change Password
              </button>
            </div>

            {/* Tab 1: Edit Profile */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-5 animate-fadeIn">
                <Input
                  label="Display Name"
                  id="name"
                  type="text"
                  placeholder="Chef Name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  icon={HiUser}
                  required
                />

                <Input
                  label="Email Address (read-only)"
                  id="email"
                  type="email"
                  value={profileData.email}
                  icon={HiMail}
                  disabled
                  title="Email cannot be modified directly."
                />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bio" className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Chef Biography
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us about your culinary journey..."
                    className="block w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 px-4 py-3.5 text-slate-900 dark:text-slate-105 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm outline-none placeholder-slate-400 dark:placeholder-slate-650"
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" loading={profileLoading}>
                    Save Changes
                  </Button>
                </div>
              </form>
            )}

            {/* Tab 2: Change Password */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-5 animate-fadeIn">
                <Input
                  label="Current Password"
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  icon={HiLockClosed}
                  required
                />

                <Input
                  label="New Password"
                  id="newPassword"
                  type="password"
                  placeholder="At least 6 characters"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  icon={HiLockClosed}
                  required
                />

                <Input
                  label="Confirm New Password"
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Verify new password"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  icon={HiLockClosed}
                  required
                />

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" loading={passwordLoading}>
                    Update Password
                  </Button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;

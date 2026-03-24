import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Gift, 
  TrendingUp,
  User,
  Home,
  LayoutGrid,
  History,
  Coins,
  Zap,
  Star,
  ChevronRight,
  AlertCircle,
  CalendarCheck, 
  ClipboardList, 
  PlayCircle, 
  Download, 
  UserPlus,
  Smartphone,
  Phone,
  Send,
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Task {
  id: string;
  title: string;
  reward: number;
  category: 'Daily' | 'Survey' | 'Offer' | 'Video';
  icon: React.ReactNode;
  completed: boolean;
  description: string;
}

interface UserData {
  balance: number;
  tasksCompleted: number;
  streak: number;
  level: number;
  exp: number;
}

// --- Constants ---
const INITIAL_TASKS: Task[] = [
  { 
    id: '1', 
    title: 'Daily Check-in', 
    reward: 50, 
    category: 'Daily', 
    icon: <CalendarCheck className="w-5 h-5" />, 
    completed: false,
    description: 'Claim your daily reward just for opening the app.'
  },
  { 
    id: '2', 
    title: 'Quick Survey: Tech Habits', 
    reward: 250, 
    category: 'Survey', 
    icon: <ClipboardList className="w-5 h-5" />, 
    completed: false,
    description: 'Tell us about your gadget usage in 2 minutes.'
  },
  { 
    id: '3', 
    title: 'Watch Short Video', 
    reward: 30, 
    category: 'Video', 
    icon: <PlayCircle className="w-5 h-5" />, 
    completed: false,
    description: 'Watch a 15-second promotional clip.'
  },
  { 
    id: '4', 
    title: 'Install "FitTrack" App', 
    reward: 1200, 
    category: 'Offer', 
    icon: <Download className="w-5 h-5" />, 
    completed: false,
    description: 'Download and open the app to earn big.'
  },
  { 
    id: '5', 
    title: 'Invite 3 Friends', 
    reward: 3000, 
    category: 'Offer', 
    icon: <UserPlus className="w-5 h-5" />, 
    completed: false,
    description: 'Share your referral code and get rewarded.'
  },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [authData, setAuthData] = useState({ email: '', password: '', phone: '', name: '' });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    balance: 1250,
    tasksCompleted: 12,
    streak: 4,
    level: 3,
    exp: 65,
  });

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState<'home' | 'tasks' | 'wallet' | 'profile'>('home');
  const [showRewardModal, setShowRewardModal] = useState<{show: boolean, amount: number}>({ show: false, amount: 0 });
  const [withdrawModal, setWithdrawModal] = useState<{show: boolean, method: 'Easypaisa' | 'JazzCash' | null}>({ show: false, method: null });
  const [withdrawDetails, setWithdrawDetails] = useState({ phone: '', name: '' });
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const completeTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task || task.completed) return;

    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
    setUserData(prev => ({
      ...prev,
      balance: prev.balance + task.reward,
      tasksCompleted: prev.tasksCompleted + 1,
      exp: (prev.exp + 20) % 100,
      level: prev.exp + 20 >= 100 ? prev.level + 1 : prev.level
    }));
    setShowRewardModal({ show: true, amount: task.reward });
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-[#1A1A1A] font-sans flex flex-col">
        <main className="flex-1 flex flex-col p-8 max-w-md mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-12 text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100 mx-auto mb-6">
                <Coins className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome to Earnly</h1>
              <p className="text-gray-500">Start earning rewards today</p>
            </div>

            <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
              <button 
                onClick={() => setAuthView('login')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${authView === 'login' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setAuthView('signup')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${authView === 'signup' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-5 flex-1">
              <div className="flex gap-4 mb-2">
                <button 
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition-all ${authMethod === 'email' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-400'}`}
                >
                  Email
                </button>
                <button 
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition-all ${authMethod === 'phone' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-400'}`}
                >
                  Phone
                </button>
              </div>

              {authView === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      value={authData.name}
                      onChange={(e) => setAuthData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                    />
                  </div>
                </div>
              )}

              {authMethod === 'email' ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="email" 
                      placeholder="name@example.com"
                      value={authData.email}
                      onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="tel" 
                      placeholder="03xx xxxxxxx"
                      value={authData.phone}
                      onChange={(e) => setAuthData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    required
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    value={authData.password}
                    onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {authView === 'login' && (
                <div className="text-right">
                  <button type="button" className="text-xs font-bold text-emerald-600 hover:underline">Forgot Password?</button>
                </div>
              )}

              <button 
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isAuthenticating ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  authView === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                By continuing, you agree to our <br />
                <span className="text-gray-600 font-medium underline">Terms of Service</span> and <span className="text-gray-600 font-medium underline">Privacy Policy</span>
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Coins className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Earnly</h1>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white">
            <Coins className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-emerald-700">{userData.balance.toLocaleString()}</span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium mb-1">Total Balance</p>
                      <h2 className="text-4xl font-bold">${(userData.balance / 100).toFixed(2)}</h2>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                      Level {userData.level}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-emerald-100">
                      <span>Progress to Level {userData.level + 1}</span>
                      <span>{userData.exp}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-white" 
                        initial={{ width: 0 }}
                        animate={{ width: `${userData.exp}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-2 group cursor-pointer hover:border-emerald-200 transition-colors">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">Daily Bonus</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Claim Now</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-2 group cursor-pointer hover:border-emerald-200 transition-colors">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">Leaderboard</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Top 100</span>
                </div>
              </div>

              {/* Featured Tasks */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Featured Tasks</h3>
                  <button 
                    onClick={() => setActiveTab('tasks')}
                    className="text-emerald-600 text-sm font-bold flex items-center gap-1"
                  >
                    See All <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {tasks.filter(t => !t.completed).slice(0, 3).map(task => (
                    <TaskCard key={task.id} task={task} onComplete={() => completeTask(task.id)} />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold mb-6">Available Tasks</h2>
              <div className="space-y-3">
                {tasks.map(task => (
                  <TaskCard key={task.id} task={task} onComplete={() => completeTask(task.id)} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'wallet' && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">Wallet</h2>
              
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available for Withdrawal</p>
                    <p className="text-2xl font-bold">${(userData.balance / 100).toFixed(2)}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Instant Cashout</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setWithdrawModal({ show: true, method: 'Easypaisa' })}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#3BB54A] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-emerald-800">Easypaisa</span>
                    </button>
                    <button 
                      onClick={() => setWithdrawModal({ show: true, method: 'JazzCash' })}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-red-100 bg-red-50/50 hover:bg-red-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#E31D2D] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-red-800">JazzCash</span>
                    </button>
                  </div>
                </div>
              </div>

              <section>
                <h3 className="font-bold mb-4">Redeem Gift Cards</h3>
                <div className="grid grid-cols-2 gap-4">
                  <RedeemCard name="Amazon" amount={10} cost={10000} color="bg-orange-500" />
                  <RedeemCard name="Google Play" amount={5} cost={5000} color="bg-blue-500" />
                  <RedeemCard name="PayPal" amount={25} cost={25000} color="bg-indigo-600" />
                  <RedeemCard name="Netflix" amount={15} cost={15000} color="bg-red-600" />
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center text-center pt-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-3xl font-bold border-4 border-white shadow-md">
                    JD
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold">John Doe</h2>
                <p className="text-gray-500 text-sm">Member since March 2024</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Tasks</p>
                  <p className="font-bold">{userData.tasksCompleted}</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Streak</p>
                  <p className="font-bold">{userData.streak}d</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Level</p>
                  <p className="font-bold">{userData.level}</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                <ProfileItem icon={<User className="w-5 h-5" />} label="Account Settings" />
                <ProfileItem icon={<History className="w-5 h-5" />} label="Transaction History" />
                <ProfileItem icon={<AlertCircle className="w-5 h-5" />} label="Help & Support" />
                <ProfileItem icon={<LayoutGrid className="w-5 h-5" />} label="Privacy Policy" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon={<Home className="w-6 h-6" />} 
          label="Home" 
        />
        <NavButton 
          active={activeTab === 'tasks'} 
          onClick={() => setActiveTab('tasks')} 
          icon={<LayoutGrid className="w-6 h-6" />} 
          label="Tasks" 
        />
        <NavButton 
          active={activeTab === 'wallet'} 
          onClick={() => setActiveTab('wallet')} 
          icon={<Wallet className="w-6 h-6" />} 
          label="Wallet" 
        />
        <NavButton 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
          icon={<User className="w-6 h-6" />} 
          label="Profile" 
        />
      </nav>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal.show && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 text-center max-w-xs w-full shadow-2xl"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <Coins className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Awesome!</h3>
              <p className="text-gray-500 mb-6">You just earned <span className="text-emerald-600 font-bold">{showRewardModal.amount} coins</span></p>
              <button 
                onClick={() => setShowRewardModal({ show: false, amount: 0 })}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-100"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {withdrawModal.show && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-3xl sm:rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => {
                  setWithdrawModal({ show: false, method: null });
                  setWithdrawSuccess(false);
                  setWithdrawDetails({ phone: '', name: '' });
                }}
                className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {!withdrawSuccess ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${withdrawModal.method === 'Easypaisa' ? 'bg-[#3BB54A]' : 'bg-[#E31D2D]'}`}>
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Withdraw to {withdrawModal.method}</h3>
                      <p className="text-sm text-gray-500">Instant transfer to your mobile wallet</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-800">Amount to Withdraw</span>
                    <span className="text-xl font-bold text-emerald-700">${(userData.balance / 100).toFixed(2)}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Account Number (Phone)</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="tel" 
                          placeholder="03xx xxxxxxx"
                          value={withdrawDetails.phone}
                          onChange={(e) => setWithdrawDetails(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Account Holder Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Full Name"
                          value={withdrawDetails.name}
                          onChange={(e) => setWithdrawDetails(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={!withdrawDetails.phone || !withdrawDetails.name || isWithdrawing || userData.balance < 500}
                    onClick={() => {
                      setIsWithdrawing(true);
                      setTimeout(() => {
                        setIsWithdrawing(false);
                        setWithdrawSuccess(true);
                        setUserData(prev => ({ ...prev, balance: 0 }));
                      }, 2000);
                    }}
                    className={`w-full py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${
                      !withdrawDetails.phone || !withdrawDetails.name || userData.balance < 500
                        ? 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed' 
                        : 'bg-emerald-600 text-white shadow-emerald-100 hover:bg-emerald-700'
                    }`}
                  >
                    {isWithdrawing ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Confirm Withdrawal
                      </>
                    )}
                  </button>
                  {userData.balance < 500 && (
                    <p className="text-center text-xs text-red-500 font-medium">Minimum withdrawal amount is $5.00 (500 coins)</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
                    <p className="text-gray-500">Your withdrawal request to <span className="font-bold text-gray-800">{withdrawModal.method}</span> is being processed. It usually takes 2-4 hours.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl text-left space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Account</span>
                      <span className="font-medium">{withdrawDetails.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Amount</span>
                      <span className="font-medium text-emerald-600">${(userData.balance / 100).toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setWithdrawModal({ show: false, method: null });
                      setWithdrawSuccess(false);
                      setWithdrawDetails({ phone: '', name: '' });
                    }}
                    className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100"
                  >
                    Back to Wallet
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TaskCard = ({ task, onComplete }: { task: Task; onComplete: () => void; key?: string }) => {
  return (
    <div className={`bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all ${task.completed ? 'opacity-60 grayscale' : 'hover:border-emerald-200'}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${task.completed ? 'bg-gray-100 text-gray-400' : 'bg-emerald-50 text-emerald-600'}`}>
        {task.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm truncate">{task.title}</h4>
        <p className="text-xs text-gray-400 truncate">{task.description}</p>
      </div>
      <div className="text-right">
        {task.completed ? (
          <div className="bg-gray-100 text-gray-400 p-1.5 rounded-full">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        ) : (
          <button 
            onClick={onComplete}
            className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-emerald-100"
          >
            +{task.reward}
          </button>
        )}
      </div>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-emerald-600' : 'text-gray-400'}`}
    >
      <div className={`p-1 rounded-xl transition-colors ${active ? 'bg-emerald-50' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}

const RedeemCard = ({ name, amount, cost, color }: { name: string; amount: number; cost: number; color: string; key?: string }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3 group cursor-pointer hover:border-emerald-200 transition-all">
      <div className={`w-full aspect-video rounded-xl ${color} flex items-center justify-center text-white font-bold text-xl shadow-inner`}>
        {name}
      </div>
      <div>
        <h4 className="font-bold text-sm">${amount} Card</h4>
        <div className="flex items-center gap-1 text-emerald-600">
          <Coins className="w-3 h-3" />
          <span className="text-xs font-bold">{cost.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

const ProfileItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="text-gray-400">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300" />
    </div>
  );
}

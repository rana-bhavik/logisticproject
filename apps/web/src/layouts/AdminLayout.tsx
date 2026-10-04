import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FileText, 
  Package, 
  Radio, 
  Truck, 
  Warehouse, 
  DollarSign, 
  Cpu, 
  Settings, 
  LogOut, 
  Bell,
  BarChart3
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const userRole = localStorage.getItem('role') || 'Super Admin';
  const rawUser = localStorage.getItem('user');
  const userObj = rawUser ? JSON.parse(rawUser) : { name: 'Super Administrator' };

  const allNavItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard, roles: ['Super Admin', 'Dispatcher', 'Warehouse Manager'] },
    { name: 'Mission Dispatch', path: '/admin/dispatch', icon: Radio, roles: ['Super Admin', 'Dispatcher'] },
    { name: 'Orders & Cargo', path: '/admin/orders', icon: Package, roles: ['Super Admin', 'Dispatcher', 'Warehouse Manager'] },
    { name: 'Fleet Telematics', path: '/admin/fleet', icon: Truck, roles: ['Super Admin', 'Dispatcher'] },
    { name: 'Warehouse & Inventory', path: '/admin/warehouse', icon: Warehouse, roles: ['Super Admin', 'Warehouse Manager'] },
    { name: 'AI Optimization', path: '/admin/ai', icon: Cpu, roles: ['Super Admin', 'Dispatcher'] },
    { name: 'Analytics & ESG', path: '/admin/analytics', icon: BarChart3, roles: ['Super Admin', 'Dispatcher', 'Company Admin'] },
    { name: 'Finance & Ledger', path: '/admin/finance', icon: DollarSign, roles: ['Super Admin'] },
    { name: 'Enterprises', path: '/admin/companies', icon: Building2, roles: ['Super Admin'] },
    { name: 'Users & Roles', path: '/admin/users', icon: Users, roles: ['Super Admin'] },
    { name: 'Audit Logs', path: '/admin/audit', icon: FileText, roles: ['Super Admin'] },
    { name: 'System Settings', path: '/admin/settings', icon: Settings, roles: ['Super Admin'] },
  ];

  const visibleNavItems = allNavItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-smoky-black text-morning-blue flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-dark-olive/30 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-dark-olive/30">
          <Link to="/" className="text-xl font-bold tracking-tighter text-white">LOGISTIS<span className="text-android-green">.admin</span></Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-dark-olive/40 text-android-green font-medium' 
                    : 'text-morning-blue/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-dark-olive/30">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-morning-blue/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-dark-olive/30 sticky top-0 bg-smoky-black/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">{userRole} Operations</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-android-green/10 text-android-green border border-android-green/30">
              {userRole}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-morning-blue/80 hover:text-android-green transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-android-green rounded-full"></span>
            </button>
            <div 
              className="px-3 py-1.5 rounded-xl bg-dark-olive/80 flex items-center gap-2 text-white font-medium border border-android-green/50 text-xs cursor-pointer"
              title={userObj.name}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {userObj.name?.split(' ')[0] || userRole}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

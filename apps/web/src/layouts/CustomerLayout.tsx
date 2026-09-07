import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Briefcase, Building2, Ticket, LifeBuoy, LogOut, Bell } from 'lucide-react';

const CustomerLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/customer', icon: Briefcase },
    { name: 'Company Profile', path: '/customer/profile', icon: Building2 },
    { name: 'Support Tickets', path: '/customer/tickets', icon: Ticket },
    { name: 'Help Center', path: '/customer/help', icon: LifeBuoy },
  ];

  return (
    <div className="min-h-screen bg-smoky-black text-morning-blue flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-dark-olive/30 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-dark-olive/30">
          <Link to="/" className="text-xl font-bold tracking-tighter text-white">LOGISTIS<span className="text-android-green">.client</span></Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
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
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-morning-blue/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-8 border-b border-dark-olive/30 sticky top-0 bg-smoky-black/80 backdrop-blur-md z-10">
          <h2 className="text-lg font-semibold text-white">Global Freight Ltd - Client Portal</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-morning-blue/80 hover:text-android-green transition-colors relative">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-dark-olive/80 flex items-center justify-center text-white font-medium border border-android-green/50 cursor-pointer">
              AF
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;

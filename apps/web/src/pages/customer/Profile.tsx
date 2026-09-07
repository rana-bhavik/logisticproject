import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Company Profile</h1>
        <p className="text-morning-blue/70">Manage your company details and billing information.</p>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-medium text-white mb-6">General Information</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-morning-blue mb-2">Company Name</label>
              <input type="text" defaultValue="Global Freight Ltd" className="w-full px-4 py-3 bg-smoky-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-android-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-morning-blue mb-2">Industry</label>
              <input type="text" defaultValue="Logistics & Supply Chain" className="w-full px-4 py-3 bg-smoky-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-android-green" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-morning-blue mb-2">Headquarters Address</label>
            <input type="text" defaultValue="1200 Logistics Way, Suite 400, Chicago, IL 60601" className="w-full px-4 py-3 bg-smoky-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-android-green" />
          </div>

          <div className="pt-4 flex justify-end">
            <button className="px-6 py-3 bg-dark-olive text-white font-medium rounded-lg hover:bg-android-green hover:text-smoky-black transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl p-8 backdrop-blur-sm mt-8">
        <h3 className="text-lg font-medium text-white mb-2">Current Plan: Enterprise</h3>
        <p className="text-morning-blue/70 mb-6">You are on the top tier plan with unlimited shipments and API access.</p>
        
        <div className="p-6 border border-android-green/30 bg-android-green/5 rounded-lg flex justify-between items-center">
          <div>
            <h4 className="text-white font-medium mb-1">Billing Cycle</h4>
            <p className="text-sm text-morning-blue/80">Next invoice on Oct 1, 2026 for $12,500.00</p>
          </div>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium">
            Manage Billing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

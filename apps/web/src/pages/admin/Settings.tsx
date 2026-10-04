import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Shield, Key, Database, CreditCard, RefreshCw, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'api' | 'billing'>('general');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Platform Settings</h1>
          <p className="text-morning-blue">Manage configurations, integrations, and security policies.</p>
        </div>
        <button className="px-4 py-2 bg-android-green text-smoky-black font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="flex gap-6">
        {/* Settings Sidebar */}
        <div className="w-64 shrink-0 space-y-2">
          {[
            { id: 'general', icon: Globe, label: 'Global & Localization' },
            { id: 'security', icon: Shield, label: 'Security & SSO' },
            { id: 'api', icon: Key, label: 'API & Webhooks (3PL)' },
            { id: 'billing', icon: CreditCard, label: 'Billing & Tax (VAT)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-android-green/10 text-android-green border border-android-green/20'
                  : 'text-morning-blue hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm min-h-[500px]">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-white border-b border-dark-olive/40 pb-2">Global Settings</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-2">Base Currency</label>
                  <select className="w-full bg-[#0c120c] border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green outline-none">
                    <option>INR (₹) - Indian Rupee</option>
                    <option>USD ($) - US Dollar</option>
                    <option>EUR (€) - Euro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-2">Primary Timezone</label>
                  <select className="w-full bg-[#0c120c] border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green outline-none">
                    <option>Asia/Kolkata (IST)</option>
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>Europe/Berlin (CET)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-bold text-white border-b border-dark-olive/40 pb-2 mb-4">Automated Database Backups</h3>
                <div className="flex items-center justify-between p-4 bg-[#0c120c] rounded-lg border border-dark-olive/30">
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      <Database size={16} className="text-sky-400" /> Hourly Snapshots Enabled
                    </div>
                    <div className="text-xs text-morning-blue/60 mt-1">Retention policy: 30 days. Last backup: 12 minutes ago.</div>
                  </div>
                  <button className="px-3 py-1.5 bg-white/10 text-white rounded-md text-xs hover:bg-white/20 flex items-center gap-1 cursor-pointer">
                    <RefreshCw size={14} /> Force Backup
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-white border-b border-dark-olive/40 pb-2">API Gateway & Developer Sandbox</h3>
              
              <div className="bg-[#0c120c] p-4 rounded-lg border border-dark-olive/30">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-white font-medium">Production API Key</div>
                    <div className="text-xs text-morning-blue/60">Used for ERP Sync (SAP/Oracle) and EDI Parsers.</div>
                  </div>
                  <button className="text-xs text-android-green hover:underline cursor-pointer">Regenerate Key</button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-black p-2 rounded text-android-green text-sm font-mono border border-dark-olive/40">
                    pk_live_8f92a3b1c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0
                  </code>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-bold text-white border-b border-dark-olive/40 pb-2 mb-4">3PL Webhook Dispatcher</h3>
                <div className="space-y-3">
                  {['Shipment Created', 'Milestone Updated', 'POD Signed'].map(event => (
                    <div key={event} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                      <span className="text-sm text-white font-medium">{event}</span>
                      <input 
                        type="text" 
                        placeholder="https://your-server.com/webhook" 
                        className="w-1/2 bg-[#0c120c] border border-dark-olive/50 rounded-md px-3 py-1.5 text-xs text-white outline-none focus:border-android-green"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-white border-b border-dark-olive/40 pb-2">Tax, VAT, & Duty Rules Engine</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#0c120c] border border-dark-olive/30 rounded-lg">
                  <div className="text-sm text-white mb-2">Default GST/VAT Rate (%)</div>
                  <input type="number" defaultValue="18" className="w-full bg-black border border-dark-olive/50 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-android-green" />
                </div>
                <div className="p-4 bg-[#0c120c] border border-dark-olive/30 rounded-lg">
                  <div className="text-sm text-white mb-2">Cross-Border Duty Default (%)</div>
                  <input type="number" defaultValue="5.5" className="w-full bg-black border border-dark-olive/50 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-android-green" />
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-bold text-white border-b border-dark-olive/40 pb-2 mb-4">Enterprise Subscription Tier</h3>
                <div className="p-5 border border-android-green/40 bg-android-green/5 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-medium text-lg mb-1">Logistis Unlimited Plan</h4>
                    <p className="text-sm text-morning-blue/80">Next billing cycle: Oct 1, 2026</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-android-green">₹1,25,000 / mo</div>
                    <button className="text-xs text-white hover:underline mt-1 cursor-pointer">Manage Billing</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-white border-b border-dark-olive/40 pb-2">Security & Single Sign-On (SSO)</h3>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 bg-[#0c120c] border border-dark-olive/30 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <input type="checkbox" defaultChecked className="accent-android-green w-4 h-4 cursor-pointer" />
                  <div>
                    <div className="text-white font-medium">Require Multi-Factor Authentication (MFA)</div>
                    <div className="text-xs text-morning-blue/60">Enforce MFA for all Super Admin and Dispatcher roles.</div>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-4 bg-[#0c120c] border border-dark-olive/30 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <input type="checkbox" defaultChecked className="accent-android-green w-4 h-4 cursor-pointer" />
                  <div>
                    <div className="text-white font-medium">Enterprise SAML / OAuth 2.0</div>
                    <div className="text-xs text-morning-blue/60">Allow users to log in via Okta, Azure AD, or Google Workspace.</div>
                  </div>
                </label>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;

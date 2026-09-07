import React from 'react';
import { Search, Filter, AlertCircle, Info, ShieldAlert } from 'lucide-react';

const AuditLogs: React.FC = () => {
  const logs = [
    { id: 'AL-9021', user: 'Charlie Davis', action: 'Modified System Settings', target: 'Global Rate Limits', time: '10 mins ago', severity: 'High' },
    { id: 'AL-9020', user: 'System', action: 'Automated Backup Completed', target: 'Database Main', time: '1 hour ago', severity: 'Info' },
    { id: 'AL-9019', user: 'Alice Freeman', action: 'Created New Driver Profile', target: 'John Doe', time: '2 hours ago', severity: 'Low' },
    { id: 'AL-9018', user: 'Bob Smith', action: 'Overrode Route Warning', target: 'Route #40921', time: '5 hours ago', severity: 'Medium' },
    { id: 'AL-9017', user: 'System', action: 'Failed Login Attempt', target: 'diana@ecologistics.com', time: '1 day ago', severity: 'High' },
  ];

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'High': return <ShieldAlert size={16} className="text-red-500" />;
      case 'Medium': return <AlertCircle size={16} className="text-yellow-500" />;
      case 'Low': return <Info size={16} className="text-blue-500" />;
      default: return <Info size={16} className="text-morning-blue" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Audit Logs</h1>
          <p className="text-morning-blue/70">System-wide immutable ledger of all actions and events.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium text-sm">
          Export CSV
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-morning-blue/50">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-android-green transition-colors"
            placeholder="Search logs by ID, user, or action..."
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-morning-blue">
            <thead className="text-xs uppercase bg-black/20 text-morning-blue/70">
              <tr>
                <th className="px-6 py-4">Log ID</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User/System</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target</th>
                <th className="px-6 py-4">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-white/50">{log.id}</td>
                  <td className="px-6 py-4">{log.time}</td>
                  <td className="px-6 py-4 font-medium text-white">{log.user}</td>
                  <td className="px-6 py-4">{log.action}</td>
                  <td className="px-6 py-4 text-white/70">{log.target}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5">
                      {getSeverityIcon(log.severity)}
                      {log.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;

import React from 'react';
import { Plus, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const Tickets: React.FC = () => {
  const tickets = [
    { id: 'T-10492', subject: 'API Integration Webhook Failure', status: 'Open', priority: 'High', updated: '2 hours ago' },
    { id: 'T-10488', subject: 'Question regarding new route optimization feature', status: 'Pending', priority: 'Medium', updated: '1 day ago' },
    { id: 'T-10475', subject: 'Billing discrepancy on invoice INV-2026-08', status: 'Resolved', priority: 'High', updated: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Support Tickets</h1>
          <p className="text-morning-blue/70">Get help from our 24/7 logistics support team.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-android-green text-smoky-black rounded-lg hover:bg-june-bud transition-colors font-semibold text-sm">
          <Plus size={18} />
          New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white/5 border border-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className={`p-3 rounded-xl mt-1 ${ticket.status === 'Resolved' ? 'bg-dark-olive/20 text-android-green' : 'bg-white/10 text-white'}`}>
                  {ticket.status === 'Resolved' ? <CheckCircle size={24} /> : <MessageSquare size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-android-green transition-colors">{ticket.subject}</h3>
                  <div className="flex items-center gap-4 text-sm text-morning-blue/60">
                    <span>{ticket.id}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {ticket.updated}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  ticket.status === 'Open' ? 'bg-blue-500/10 text-blue-400' :
                  ticket.status === 'Resolved' ? 'bg-android-green/10 text-android-green' : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {ticket.status}
                </span>
                <span className="text-xs text-morning-blue/50 uppercase tracking-wider">{ticket.priority} Priority</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;

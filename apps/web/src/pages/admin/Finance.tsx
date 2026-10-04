import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  FileCheck, 
  AlertCircle, 
  ArrowUpRight, 
  Download, 
  Plus, 
  Calendar,
  CheckCircle2,
  Receipt,
  X
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { financeApi, type Invoice } from '../../services/api';

const Finance: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [analytics, setAnalytics] = useState<{ totalRevenue: number; operatingCosts: number; netMargin: number; marginPct: number }>({
    totalRevenue: 2845000,
    operatingCosts: 1690000,
    netMargin: 1155000,
    marginPct: 40.6,
  });
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    amount: 15000,
    currency: 'USD',
  });

  const chartData = [
    { month: 'Apr', revenue: 380000, cost: 230000, profit: 150000 },
    { month: 'May', revenue: 420000, cost: 250000, profit: 170000 },
    { month: 'Jun', revenue: 490000, cost: 280000, profit: 210000 },
    { month: 'Jul', revenue: 460000, cost: 270000, profit: 190000 },
    { month: 'Aug', revenue: 530000, cost: 310000, profit: 220000 },
    { month: 'Sep', revenue: 565000, cost: 330000, profit: 235000 },
  ];

  useEffect(() => {
    financeApi.getLedger()
      .then(res => {
        if (res?.invoices) setInvoices(res.invoices);
        if (res?.analytics) setAnalytics(res.analytics);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Invoice = {
      _id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: newInvoice.clientName || 'Enterprise Partner',
      amount: Number(newInvoice.amount),
      currency: newInvoice.currency,
      status: 'Pending',
      issuedDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
      itemsCount: 3,
    };
    setInvoices([created, ...invoices]);
    setShowCreateModal(false);
  };

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"><CheckCircle2 size={12} /> Paid</span>;
      case 'Pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30"><Calendar size={12} /> Pending</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30"><AlertCircle size={12} /> Overdue</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Finance & Corporate Ledger</h1>
          <p className="text-morning-blue/70 mt-1">
            Freight invoice reconciliation, operational cost breakdown, and net operating margins.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-android-green text-smoky-black font-semibold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(166,188,54,0.3)] cursor-pointer"
        >
          <Plus size={18} /> Issue Freight Invoice
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-start text-morning-blue/60 text-xs uppercase tracking-wider mb-2">
            <span>Gross Revenue (YTD)</span>
            <DollarSign size={16} className="text-android-green" />
          </div>
          <div className="text-2xl font-bold text-white">₹{(analytics.totalRevenue / 1000000).toFixed(2)}M</div>
          <div className="text-xs text-android-green mt-1 flex items-center gap-1">
            <TrendingUp size={12} /> +18.4% vs last period
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-start text-morning-blue/60 text-xs uppercase tracking-wider mb-2">
            <span>Fuel & Transit Costs</span>
            <CreditCard size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">₹{(analytics.operatingCosts / 1000000).toFixed(2)}M</div>
          <div className="text-xs text-morning-blue/60 mt-1">Fleet telematics verified</div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-start text-morning-blue/60 text-xs uppercase tracking-wider mb-2">
            <span>Net Operating Margin</span>
            <ArrowUpRight size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">₹{(analytics.netMargin / 1000000).toFixed(2)}M</div>
          <div className="text-xs text-emerald-400 mt-1">{analytics.marginPct}% profit margin</div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-start text-morning-blue/60 text-xs uppercase tracking-wider mb-2">
            <span>Unpaid Receivables</span>
            <FileCheck size={16} className="text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-sky-400">
            ₹{(invoices.filter(i => i.status !== 'Paid').reduce((acc, i) => acc + i.amount, 0) / 1000).toFixed(1)}k
          </div>
          <div className="text-xs text-morning-blue/60 mt-1">Net-30 corporate terms</div>
        </div>
      </div>

      {/* Revenue & Profit Trends Chart */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-1">Financial Trajectory & Corridor Yields</h3>
        <p className="text-xs text-morning-blue/60 mb-6">Gross freight billings vs operating expenditure over the last 6 fiscal months.</p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a6bc36" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a6bc36" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e3d1a" vertical={false} opacity={0.4} />
              <XAxis dataKey="month" stroke="#8d9b93" />
              <YAxis stroke="#8d9b93" tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0c120c', borderColor: '#a6bc36', borderRadius: '8px' }}
                formatter={(value: any) => [`₹${value.toLocaleString()}`, '']}
              />
              <Area type="monotone" dataKey="revenue" name="Gross Revenue" stroke="#a6bc36" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              <Area type="monotone" dataKey="cost" name="Operating Cost" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-4 border-b border-dark-olive/40 flex justify-between items-center">
          <h3 className="text-base font-bold text-white">Commercial Invoice Ledger</h3>
          <span className="text-xs text-morning-blue/60">{invoices.length} Registered Accounts</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-morning-blue/80">
            <thead className="text-xs uppercase bg-white/5 text-morning-blue border-b border-dark-olive/40 tracking-wider">
              <tr>
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Billed Enterprise</th>
                <th className="px-6 py-4">Issued / Due</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-olive/20">
              {invoices.map(inv => (
                <tr key={inv._id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-white">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">{inv.clientName}</div>
                    <div className="text-xs text-morning-blue/50">{inv.itemsCount} Billable Containers</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <div className="text-white">{inv.issuedDate}</div>
                    <div className="text-morning-blue/50">Due: {inv.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-base font-bold text-white">
                      ₹{inv.amount.toLocaleString()}
                    </span>{' '}
                    <span className="text-xs text-morning-blue/60">{inv.currency}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(inv.status)}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => alert(`Generating compliant audit PDF invoice for ${inv.invoiceNumber}`)}
                      className="p-2 text-morning-blue/60 hover:text-android-green hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      title="Download PDF Invoice"
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0c120c] border border-android-green/40 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 text-morning-blue/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-1">Generate Freight Invoice</h3>
            <p className="text-xs text-morning-blue/70 mb-4">Post billable freight ledger charge to corporate account.</p>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">Corporate Client</label>
                <input
                  type="text"
                  required
                  value={newInvoice.clientName}
                  onChange={e => setNewInvoice({ ...newInvoice, clientName: e.target.value })}
                  placeholder="e.g. Tesla Gigafactory Berlin"
                  className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">Invoice Total (₹ INR)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newInvoice.amount}
                  onChange={e => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-dark-olive/30">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-android-green text-smoky-black font-semibold rounded-lg text-sm"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;

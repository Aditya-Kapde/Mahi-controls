import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Inbox, FileText, CheckCircle, ArrowRight, Download } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { exportRfqsToCsv } from '../../utils/exportCsv';

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold font-poppins text-slate-900">{value}</h3>
      </div>
      <div className="p-3 bg-slate-50 rounded-lg">
        <Icon className="w-6 h-6 text-slate-400" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center gap-2">
        <div className={`flex items-center text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-amber-600'}`}>
          <TrendingUp className={`w-3.5 h-3.5 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
          {Math.abs(trend)}%
        </div>
        <span className="text-xs text-slate-400">{trendLabel}</span>
      </div>
    )}
  </motion.div>
);

const AdminDashboard = () => {
  const { token } = useAuth();
  const [rfqs, setRfqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentRfqs = async () => {
      try {
        const response = await api.getAdminRfqs(token);
        // Assuming response.content for paginated data
        setRfqs(response?.content?.slice(0, 5) || []);
      } catch (error) {
        console.error("Failed to fetch recent RFQs", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token) fetchRecentRfqs();
  }, [token]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'NEW': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CONTACTED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'QUOTATION_SENT': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'CLOSED_WON': return 'bg-green-100 text-green-800 border-green-200';
      case 'CLOSED_LOST': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Inquiries" value="248" icon={Inbox} trend={12} trendLabel="vs last month" delay={0.1} />
        <StatCard title="New Unassigned" value="12" icon={TrendingUp} trend={-2} trendLabel="vs last week" delay={0.2} />
        <StatCard title="Quotations Sent" value="84" icon={FileText} trend={8} trendLabel="vs last month" delay={0.3} />
        <StatCard title="Deals Won" value="32" icon={CheckCircle} trend={15} trendLabel="vs last month" delay={0.4} />
      </div>

      {/* Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
        className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50/50">
          <h2 className="text-lg font-semibold text-slate-800 font-poppins">Recent RFQ Pipeline Activity</h2>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => exportRfqsToCsv(rfqs || [], 'admin_leads_backup')}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors shadow-sm"
              title="Download leads backup as CSV"
            >
              <Download className="w-3.5 h-3.5 text-amber-700"/>
              <span className="hidden sm:inline">Download Leads Backup (CSV)</span>
            </button>
            <Link to="/admin/rfqs" className="text-sm font-medium text-[#F97316] hover:text-orange-700 flex items-center gap-1 transition-colors">
              View All Pipeline <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Company / Contact</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Received</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Loading recent activity...
                  </td>
                </tr>
              ) : rfqs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No recent RFQs found.
                  </td>
                </tr>
              ) : (
                rfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{rfq.companyName}</p>
                      <p className="text-slate-500">{rfq.contactPerson}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{rfq.projectLocation || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(rfq.status)}`}>
                        {rfq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(rfq.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to="/admin/rfqs" className="text-[#F97316] hover:text-orange-700 font-medium text-sm">
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;

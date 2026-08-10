import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Building2, Mail, Phone, MapPin, Calendar, Clock, ArrowRight, MessageSquare, Plus, Save } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const STATUS_TABS = ['ALL', 'NEW', 'CONTACTED', 'QUOTATION_SENT', 'CLOSED_WON', 'CLOSED_LOST'];

const AdminRfqs = () => {
  const { token } = useAuth();
  const [rfqs, setRfqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  
  // Drawer State
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchRfqs();
  }, [token]);

  const fetchRfqs = async () => {
    setIsLoading(true);
    try {
      const response = await api.getAdminRfqs(token);
      const rfqList = Array.isArray(response) ? response : (response?.content || []);
      setRfqs(rfqList);
    } catch (error) {
      console.error("Failed to fetch RFQs", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRfqs = useMemo(() => {
    return rfqs.filter(rfq => {
      const matchesTab = activeTab === 'ALL' || rfq.status === activeTab;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        (rfq.companyName && rfq.companyName.toLowerCase().includes(searchLower)) ||
        (rfq.email && rfq.email.toLowerCase().includes(searchLower)) ||
        (rfq.projectLocation && rfq.projectLocation.toLowerCase().includes(searchLower));
      return matchesTab && matchesSearch;
    });
  }, [rfqs, activeTab, searchQuery]);

  const handleRowClick = (rfq) => {
    setSelectedRfq(rfq);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedRfq(null), 300);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (!selectedRfq) return;
    
    setIsUpdating(true);
    try {
      await api.updateRfqStatus(token, selectedRfq.id, newStatus);
      setSelectedRfq(prev => ({ ...prev, status: newStatus }));
      setRfqs(prev => prev.map(r => r.id === selectedRfq.id ? { ...r, status: newStatus } : r));
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !selectedRfq) return;
    
    setIsUpdating(true);
    try {
      const noteResponse = await api.addRfqNote(token, selectedRfq.id, newNote);
      // Backend returns the created note or we can refetch. Assuming it returns the note:
      // Note: If backend doesn't return the full note with id and createdAt, we might need to refetch the RFQ.
      // For simplicity, we just refetch all RFQs here to keep data fresh, and update the selectedRfq
      await fetchRfqs();
      // Temporary local update for immediate UI feedback (would ideally fetch full RFQ by ID)
      setSelectedRfq(prev => ({
        ...prev,
        notes: [...(prev.notes || []), { id: Date.now(), content: newNote, createdBy: 'Admin', createdAt: new Date().toISOString() }]
      }));
      setNewNote('');
    } catch (error) {
      console.error("Failed to add note", error);
      alert("Failed to add note.");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(new Date(dateString));
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
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
    <div className="max-w-7xl mx-auto h-full flex flex-col space-y-6">
      
      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm overflow-x-auto max-w-full">
          {STATUS_TABS.map(tab => {
            const count = tab === 'ALL' ? rfqs.length : rfqs.filter(r => r.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                  activeTab === tab 
                    ? 'bg-slate-100 text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.replace('_', ' ')}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab ? 'bg-white text-slate-800 border border-slate-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search company, email, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">Company / Contact</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Products Requested</th>
                <th className="px-6 py-4">Date Received</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">Loading RFQs...</td>
                </tr>
              ) : filteredRfqs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    <Inbox className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                    <p>No RFQs found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredRfqs.map((rfq) => (
                  <tr 
                    key={rfq.id} 
                    onClick={() => handleRowClick(rfq)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 group-hover:text-[#F97316] transition-colors">{rfq.companyName}</p>
                      <p className="text-slate-500">{rfq.contactPerson} • {rfq.email}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{rfq.projectLocation || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {rfq.items?.length || 0} item(s)
                    </td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(rfq.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(rfq.status)}`}>
                        {rfq.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedRfq && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:max-w-xl bg-white shadow-2xl z-50 flex flex-col overflow-hidden border-l border-slate-200"
            >
              {/* Drawer Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h2 className="text-lg font-bold text-slate-800 font-poppins flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-slate-500" />
                  {selectedRfq.companyName}
                </h2>
                <button 
                  onClick={closeDrawer}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
                
                {/* Client Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact</p>
                    <p className="text-sm font-medium text-slate-900">{selectedRfq.contactPerson}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                    <a href={`mailto:${selectedRfq.email}`} className="text-sm font-medium text-[#F97316] hover:underline flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> {selectedRfq.email}
                    </a>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</p>
                    <p className="text-sm font-medium text-slate-900 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {selectedRfq.phone || 'N/A'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</p>
                    <p className="text-sm font-medium text-slate-900 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedRfq.projectLocation || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Status Control */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Pipeline Status</label>
                  <div className="flex items-center gap-4">
                    <select
                      value={selectedRfq.status}
                      onChange={handleStatusChange}
                      disabled={isUpdating}
                      className={`text-sm font-semibold rounded-lg border-2 focus:ring-0 ${getStatusStyle(selectedRfq.status)}`}
                    >
                      {STATUS_TABS.filter(t => t !== 'ALL').map(status => (
                        <option key={status} value={status} className="bg-white text-slate-900">{status.replace('_', ' ')}</option>
                      ))}
                    </select>
                    {isUpdating && <span className="text-xs text-slate-400 animate-pulse">Updating...</span>}
                  </div>
                </div>

                {/* Scope & Message */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Requirement Scope</p>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
                    {selectedRfq.message || 'No additional details provided.'}
                  </div>
                </div>

                {/* Items Table */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Requested Products</p>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <tr>
                          <th className="px-4 py-2 font-medium">Product</th>
                          <th className="px-4 py-2 font-medium w-24">Qty</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedRfq.items?.length > 0 ? selectedRfq.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 font-medium text-slate-900">{item.productName}</td>
                            <td className="px-4 py-3 text-slate-600">{item.quantity}</td>
                          </tr>
                        )) : (
                          <tr><td colSpan="2" className="px-4 py-3 text-slate-500">No specific items listed.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Internal Activity Log</p>
                  <div className="space-y-4 mb-4">
                    {selectedRfq.notes?.length > 0 ? selectedRfq.notes.map((note, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                          <MessageSquare className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-3 flex-1 shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-semibold text-slate-700">{note.createdBy || 'User'}</span>
                            <span className="text-[10px] text-slate-400">{formatDateTime(note.createdAt)}</span>
                          </div>
                          <p className="text-sm text-slate-600 whitespace-pre-wrap">{note.content}</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-slate-400 italic">No internal notes yet.</p>
                    )}
                  </div>
                  
                  {/* Add Note Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a private note..."
                      className="flex-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] text-sm shadow-sm"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                    />
                    <button
                      onClick={handleAddNote}
                      disabled={isUpdating || !newNote.trim()}
                      className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shadow-sm"
                    >
                      <Save className="w-4 h-4" /> Save
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminRfqs;

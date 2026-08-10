import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Save, CheckCircle, MapPin } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ImageUploader from '../../components/admin/ImageUploader';

const AdminProjects = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '', clientName: '', location: '', completionYear: new Date().getFullYear(), summary: '', description: '', equipmentSupplied: '', isFeatured: false, primaryImageUrl: '', imagePublicId: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.getAdminProjects(token, { size: 100 });
      setProjects(response.content || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        clientName: project.clientName,
        location: project.location,
        completionYear: project.completionYear,
        summary: project.summary,
        description: project.description || '',
        equipmentSupplied: project.equipmentSupplied || '',
        isFeatured: project.isFeatured,
        primaryImageUrl: project.primaryImageUrl || '',
        imagePublicId: project.imagePublicId || ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '', clientName: '', location: '', completionYear: new Date().getFullYear(), summary: '', description: '', equipmentSupplied: '', isFeatured: false, primaryImageUrl: '', imagePublicId: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, formData, token);
      } else {
        await api.createProject(formData, token);
      }
      await fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save project", error);
      alert("Error saving project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (response) => {
    setFormData(prev => ({
      ...prev,
      primaryImageUrl: response.imageUrl,
      imagePublicId: response.publicId
    }));
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      primaryImageUrl: '',
      imagePublicId: ''
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this project/case study?")) {
      try {
        await api.deleteProject(id, token);
        await fetchData();
      } catch (error) {
        console.error("Failed to delete", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 font-poppins">Project & Case Studies</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#0F172A] hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">No projects found. Add your first case study.</div>
        ) : (
          projects.map((proj) => (
            <div key={proj.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group transition-shadow hover:shadow-md">
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                {proj.primaryImageUrl ? (
                  <img src={proj.primaryImageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"><ImageIcon className="w-8 h-8 text-slate-300" /></div>
                )}
                {proj.isFeatured && (
                  <div className="absolute top-3 right-3 bg-[#F97316] text-white text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Featured
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 font-poppins leading-tight">{proj.title}</h3>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{proj.completionYear}</span>
                </div>
                <p className="text-xs font-medium text-[#F97316] mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" /> {proj.location}</p>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">{proj.summary}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium truncate pr-2">Client: {proj.clientName}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleOpenModal(proj)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(proj.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800 font-poppins">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="projectForm" onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Project Title *</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Client Name *</label>
                      <input required type="text" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Location *</label>
                      <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Completion Year</label>
                      <input type="number" value={formData.completionYear} onChange={e => setFormData({...formData, completionYear: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Summary (Short) *</label>
                    <textarea required maxLength="500" rows="2" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Full Description</label>
                    <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Equipment Supplied (Comma separated)</label>
                    <textarea rows="2" value={formData.equipmentSupplied} onChange={e => setFormData({...formData, equipmentSupplied: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F172A] outline-none" />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="featured" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 text-[#0F172A] rounded border-slate-300 focus:ring-[#0F172A]" />
                    <label htmlFor="featured" className="text-sm font-medium text-slate-700">Showcase on Homepage</label>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Cover Image</h3>
                    <ImageUploader 
                      folder="indussource/projects" 
                      multiple={false} 
                      existingImages={formData.primaryImageUrl ? [{ imageUrl: formData.primaryImageUrl, publicId: formData.imagePublicId }] : []} 
                      onUploadSuccess={handleImageUpload} 
                      onRemoveImage={handleRemoveImage}
                    />
                  </div>
                </form>
              </div>

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                <button type="submit" form="projectForm" disabled={isSaving} className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70">
                  {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Project</>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProjects;

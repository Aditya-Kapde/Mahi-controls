import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Save, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ImageUploader from '../../components/admin/ImageUploader';

const AdminProducts = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '', categoryId: '', shortDescription: '', fullDescription: '', specifications: '', isFeatured: false, status: 'ACTIVE'
  });
  const [productImages, setProductImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.getAdminProducts(token, { size: 100 }),
        api.getCategories()
      ]);
      setProducts(prodRes.content || []);
      setCategories(catRes || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        categoryId: product.categoryId || '',
        shortDescription: product.shortDescription || '',
        fullDescription: product.fullDescription || '',
        specifications: product.specifications || '',
        isFeatured: product.isFeatured || false,
        status: product.status || 'ACTIVE'
      });
      setProductImages(product.images || []);
    } else {
      setEditingProduct(null);
      setFormData({
        title: '', categoryId: '', shortDescription: '', fullDescription: '', specifications: '', isFeatured: false, status: 'ACTIVE'
      });
      setProductImages([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formData, token);
      } else {
        const newProduct = await api.createProduct(formData, token);
        // If images were uploaded before saving, they need to be linked. 
        // In this simple flow, images are linked immediately if editingProduct exists. 
        // If it's a new product, we create it first, then attach images.
        if (productImages.length > 0) {
           for (const img of productImages) {
              if (img.isNew) {
                await api.addProductImage(newProduct.id, { imageUrl: img.imageUrl, publicId: img.publicId }, token);
              }
           }
        }
      }
      await fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save product", error);
      alert("Error saving product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (response) => {
    if (editingProduct) {
      // Immediately link to existing product
      try {
        const updated = await api.addProductImage(editingProduct.id, { imageUrl: response.imageUrl, publicId: response.publicId }, token);
        setProductImages(updated.images || []);
      } catch(e) {
        console.error(e);
      }
    } else {
      // Temporarily hold until product is created
      setProductImages(prev => [...prev, { ...response, isNew: true }]);
    }
  };

  const handleRemoveImage = async (img) => {
    if (editingProduct && !img.isNew) {
      try {
        const updated = await api.removeProductImage(editingProduct.id, img.publicId, token);
        setProductImages(updated.images || []);
      } catch(e) {
        console.error(e);
      }
    } else {
      setProductImages(prev => prev.filter(i => i.publicId !== img.publicId));
    }
  };

  const toggleStatus = async (prod) => {
    try {
      const newStatus = prod.status === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE';
      const payload = {
        title: prod.title,
        categoryId: prod.categoryId,
        shortDescription: prod.shortDescription,
        fullDescription: prod.fullDescription,
        specifications: prod.specifications,
        isFeatured: prod.isFeatured,
        status: newStatus
      };
      await api.updateProduct(prod.id, payload, token);
      await fetchData();
    } catch (error) {
      console.error("Failed to toggle status", error);
      alert("Error updating status");
    }
  };

  const handleArchive = async (id) => {
    if (window.confirm("Archive this product?")) {
      try {
        await api.archiveProduct(id, token);
        await fetchData();
      } catch (error) {
        console.error("Failed to archive", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 font-poppins">Product Catalog</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#F97316] hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900">Product</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900">Category</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 text-center">Featured</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 text-center">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3 min-w-[250px]">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0].imageUrl} alt={product.title} className="w-10 h-10 rounded object-cover border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                          <Package className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-slate-900">{product.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap">
                      {product.categoryName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {product.isFeatured ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {product.status === "ACTIVE" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-800">
                          ARCHIVED
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(product)}
                          className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                            product.status === "ACTIVE" 
                              ? "bg-slate-100 text-slate-700 hover:bg-slate-200" 
                              : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                          }`}
                        >
                          {product.status === "ACTIVE" ? "Archive" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-1.5 text-slate-400 hover:text-[#F97316] hover:bg-orange-50 rounded transition-colors"
                          title="Edit Product"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800 font-poppins">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="productForm" onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Product Title *</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Category *</label>
                      <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none bg-white">
                        <option value="">Select Category...</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Short Description</label>
                    <textarea rows="2" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Full Description</label>
                    <textarea rows="4" value={formData.fullDescription} onChange={e => setFormData({...formData, fullDescription: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Specifications (JSON or Text)</label>
                    <textarea rows="3" value={formData.specifications} onChange={e => setFormData({...formData, specifications: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none font-mono text-xs" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-2 mt-8">
                      <input type="checkbox" id="featured" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 text-[#F97316] rounded border-slate-300 focus:ring-[#F97316]" />
                      <label htmlFor="featured" className="text-sm font-medium text-slate-700">Feature on Homepage</label>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Status</label>
                      <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none bg-white">
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Product Media</h3>
                    <ImageUploader 
                      folder="indussource/products" 
                      multiple={true} 
                      existingImages={productImages} 
                      onUploadSuccess={handleImageUpload} 
                      onRemoveImage={handleRemoveImage}
                    />
                  </div>
                </form>
              </div>

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                <button type="submit" form="productForm" disabled={isSaving} className="px-4 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70">
                  {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Product</>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;

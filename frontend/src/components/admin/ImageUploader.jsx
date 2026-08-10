import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ImageUploader = ({ folder = "indussource/general", onUploadSuccess, existingImages = [], onRemoveImage, multiple = false }) => {
  const { token } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await processFiles(e.target.files);
    }
  };

  const processFiles = async (files) => {
    const filesArray = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (filesArray.length === 0) return;
    
    const filesToUpload = multiple ? filesArray : [filesArray[0]];
    setIsUploading(true);

    for (const file of filesToUpload) {
      try {
        const response = await api.uploadImage(file, folder, token);
        if (onUploadSuccess) {
          onUploadSuccess(response);
        }
      } catch (error) {
        console.error("Upload failed for file:", file.name, error);
        alert(`Failed to upload ${file.name}`);
      }
    }
    
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <div 
        className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all ${
          isDragging 
            ? 'border-[#F97316] bg-orange-50' 
            : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
        } ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-[#F97316] animate-spin mb-3" />
            <p className="text-sm font-medium text-slate-600">Uploading media...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-sm font-semibold text-slate-700 mb-1">
              Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
            </p>
            <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 5MB)</p>
          </div>
        )}
      </div>

      {/* Existing Images Gallery */}
      {existingImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {existingImages.map((img, idx) => (
            <div key={img.publicId || idx} className="relative group rounded-lg overflow-hidden border border-slate-200 bg-white aspect-video flex items-center justify-center">
              {img.imageUrl ? (
                <img src={img.imageUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-300" />
              )}
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onRemoveImage) onRemoveImage(img);
                  }}
                  className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

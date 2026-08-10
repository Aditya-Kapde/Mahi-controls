package com.indussource.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret) {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        cloudinary = new Cloudinary(config);
    }

    public Map<String, String> uploadImage(MultipartFile file, String folderName) throws IOException {
        Map<String, Object> options = new HashMap<>();
        options.put("folder", folderName);
        
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), options);
        
        Map<String, String> result = new HashMap<>();
        result.put("imageUrl", (String) uploadResult.get("secure_url"));
        result.put("publicId", (String) uploadResult.get("public_id"));
        
        return result;
    }

    public void deleteImage(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}

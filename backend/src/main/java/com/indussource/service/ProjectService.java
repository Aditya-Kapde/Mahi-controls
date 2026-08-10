package com.indussource.service;

import com.indussource.dto.ProjectRequest;
import com.indussource.dto.ProjectResponse;
import com.indussource.exception.ResourceNotFoundException;
import com.indussource.model.Project;
import com.indussource.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Page<ProjectResponse> getAllProjects(Pageable pageable) {
        return projectRepository.findAll(pageable).map(this::mapToResponse);
    }

    public List<ProjectResponse> getFeaturedProjects() {
        return projectRepository.findByIsFeaturedTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ProjectResponse getProjectBySlug(String slug) {
        Project project = projectRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with slug: " + slug));
        return mapToResponse(project);
    }

    public ProjectResponse createProject(ProjectRequest request) {
        String slug = generateSlug(request.getTitle());
        if (projectRepository.existsBySlug(slug)) {
            slug = slug + "-" + UUID.randomUUID().toString().substring(0, 8);
        }

        Project project = Project.builder()
                .title(request.getTitle())
                .slug(slug)
                .clientName(request.getClientName())
                .location(request.getLocation())
                .completionYear(request.getCompletionYear())
                .summary(request.getSummary())
                .description(request.getDescription())
                .equipmentSupplied(request.getEquipmentSupplied())
                .isFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false)
                .primaryImageUrl(request.getPrimaryImageUrl())
                .imagePublicId(request.getImagePublicId())
                .build();

        return mapToResponse(projectRepository.save(project));
    }

    public ProjectResponse updateProject(UUID id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        project.setTitle(request.getTitle());
        project.setClientName(request.getClientName());
        project.setLocation(request.getLocation());
        project.setCompletionYear(request.getCompletionYear());
        project.setSummary(request.getSummary());
        project.setDescription(request.getDescription());
        project.setEquipmentSupplied(request.getEquipmentSupplied());
        if (request.getIsFeatured() != null) {
            project.setIsFeatured(request.getIsFeatured());
        }
        project.setPrimaryImageUrl(request.getPrimaryImageUrl());
        project.setImagePublicId(request.getImagePublicId());

        return mapToResponse(projectRepository.save(project));
    }

    public void deleteProject(UUID id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found");
        }
        projectRepository.deleteById(id);
    }

    private String generateSlug(String title) {
        if (title == null) return "";
        return title.toLowerCase().replaceAll("[^a-z0-9\\s-]", "").replaceAll("\\s+", "-");
    }

    private ProjectResponse mapToResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .slug(project.getSlug())
                .clientName(project.getClientName())
                .location(project.getLocation())
                .completionYear(project.getCompletionYear())
                .summary(project.getSummary())
                .description(project.getDescription())
                .equipmentSupplied(project.getEquipmentSupplied())
                .isFeatured(project.getIsFeatured())
                .primaryImageUrl(project.getPrimaryImageUrl())
                .imagePublicId(project.getImagePublicId())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}

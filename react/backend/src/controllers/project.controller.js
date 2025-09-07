import Project from '../models/Project.js';
import ProjectImage from '../models/ProjectImage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads/projects');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: ProjectImage, as: 'images' }],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{ model: ProjectImage, as: 'images', order: [['display_order', 'ASC']] }]
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, framework, github_url, demo_url, description, features, technologies } = req.body;
    
    const project = await Project.create({
      title,
      framework,
      github_url,
      demo_url,
      description,
      features: Array.isArray(features) ? features : JSON.parse(features || '[]'),
      technologies: Array.isArray(technologies) ? technologies : JSON.parse(technologies || '[]')
    });
    
    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { title, framework, github_url, demo_url, description, features, technologies } = req.body;
    
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    await project.update({
      title,
      framework,
      github_url,
      demo_url,
      description,
      features: Array.isArray(features) ? features : JSON.parse(features || '[]'),
      technologies: Array.isArray(technologies) ? technologies : JSON.parse(technologies || '[]')
    });
    
    res.status(200).json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{ model: ProjectImage, as: 'images' }]
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Delete associated images from filesystem
    for (const image of project.images) {
      const imagePath = path.join(uploadsDir, path.basename(image.image_path));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await project.destroy();
    
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add image to project
export const addProjectImage = async (req, res) => {
  try {
    const { project_id, image_path, display_order } = req.body;
    
    const project = await Project.findByPk(project_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const projectImage = await ProjectImage.create({
      project_id,
      image_path,
      display_order: display_order || 0
    });
    
    res.status(201).json({
      message: 'Project image added successfully',
      projectImage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete project image
export const deleteProjectImage = async (req, res) => {
  try {
    const image = await ProjectImage.findByPk(req.params.id);
    
    if (!image) {
      return res.status(404).json({ message: 'Project image not found' });
    }
    
    // Delete image from filesystem
    const imagePath = path.join(uploadsDir, path.basename(image.image_path));
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    
    await image.destroy();
    
    res.status(200).json({ message: 'Project image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update project image order
export const updateProjectImageOrder = async (req, res) => {
  try {
    const { imageOrders } = req.body;
    
    if (!Array.isArray(imageOrders)) {
      return res.status(400).json({ message: 'Invalid image orders format' });
    }
    
    // Update each image's display order
    for (const item of imageOrders) {
      await ProjectImage.update(
        { display_order: item.order },
        { where: { id: item.id } }
      );
    }
    
    res.status(200).json({ message: 'Image order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
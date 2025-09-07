import Experience from '../models/Experience.js';

// Get all experiences
export const getAllExperiences = async (req, res) => {
  try {
    const type = req.query.type; // Optional filter by type (professional or education)
    
    const whereClause = type ? { type } : {};
    
    const experiences = await Experience.findAll({
      where: whereClause,
      order: [['start_date', 'DESC']]
    });
    
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get experience by ID
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new experience
export const createExperience = async (req, res) => {
  try {
    const { title, company, location, start_date, end_date, description, type } = req.body;
    
    const experience = await Experience.create({
      title,
      company,
      location,
      start_date,
      end_date,
      description,
      type
    });
    
    res.status(201).json({
      message: 'Experience created successfully',
      experience
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an experience
export const updateExperience = async (req, res) => {
  try {
    const { title, company, location, start_date, end_date, description, type } = req.body;
    
    const experience = await Experience.findByPk(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    await experience.update({
      title,
      company,
      location,
      start_date,
      end_date,
      description,
      type
    });
    
    res.status(200).json({
      message: 'Experience updated successfully',
      experience
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an experience
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    await experience.destroy();
    
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
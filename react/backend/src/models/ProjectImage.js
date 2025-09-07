import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import Project from './Project.js';

const ProjectImage = db.define('ProjectImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  display_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: true
});

// Define association
Project.hasMany(ProjectImage, { foreignKey: 'project_id', as: 'images' });
ProjectImage.belongsTo(Project, { foreignKey: 'project_id' });

export default ProjectImage;
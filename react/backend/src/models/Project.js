import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Project = db.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  framework: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['react', 'nextjs']]
    }
  },
  github_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  demo_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  features: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  technologies: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  }
}, {
  timestamps: true
});

export default Project;
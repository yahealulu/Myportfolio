import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const About = db.define('About', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  passion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cv_file_path: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

export default About;
import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Contact = db.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  github: {
    type: DataTypes.STRING,
    allowNull: true
  },
  twitter: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

export default Contact;
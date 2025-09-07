import mobileStore1 from './myprojectsdata/react/mobilestore/1.png';
import mobileStore2 from './myprojectsdata/react/mobilestore/2.png';
import mobileStore3 from './myprojectsdata/react/mobilestore/3.png';
import todoApp1 from './myprojectsdata/react/todoapp/1.png';
import todoApp2 from './myprojectsdata/react/todoapp/2.png';
import todoApp3 from './myprojectsdata/react/todoapp/3.png';
import adminDashboard1 from './myprojectsdata/react/admindashboard/1.png';
import adminDashboard2 from './myprojectsdata/react/admindashboard/2.png';
import adminDashboard3 from './myprojectsdata/react/admindashboard/3.png';
import landingPage1 from './myprojectsdata/nextjs/landing page/1.png';
import landingPage2 from './myprojectsdata/nextjs/landing page/2.png';
import landingPage3 from './myprojectsdata/nextjs/landing page/3.png';
import rentCars1 from './myprojectsdata/nextjs/rentcars/1.png';
import rentCars2 from './myprojectsdata/nextjs/rentcars/2.png';
import rentCars3 from './myprojectsdata/nextjs/rentcars/3.png';
import carGame1 from './myprojectsdata/nextjs/cargame/1.png';
import carGame2 from './myprojectsdata/nextjs/cargame/2.png';
import carGame3 from './myprojectsdata/nextjs/cargame/3.png';
// Import images for React projects
// Import images for Next.js projects
export interface Project {
  id: string;
  title: string;
  github: string;
  demo: string;
  images: string[];
  description: string;
  features: string[];
  technologies: string[];
}

interface ProjectsData {
  [key: string]: Project[];
}

export const projectsData: ProjectsData = {
  react: [
    {
      id: 'react1',
      title: 'E-Commerce',
      github: 'https://github.com/yahealulu/mobilestore',
      demo: 'https://mobilestore-tau.vercel.app/',
      images: [mobileStore1, mobileStore2, mobileStore3],
      description: 'A full-featured e-commerce platform mobile store built with React and redux.',
      features: [
        'Responsive design with styled components',
        'Real-time cart updates and checkout process',
        'Integration with Stripe payment gateway'
      ],
      technologies: ['React', 'Redux', 'Stripe']
    },
    {
      id: 'react2',
      title: 'ToDoApp',
      github: 'https://github.com/yahealulu/Todoapp',
      demo: 'https://todoapp-zeta-gold.vercel.app/',
      images: [todoApp1, todoApp2, todoApp3],
      description: 'A Beautiful to do app with confetti and progress data.',
      features: [
        'Responsive design components',
        'ability to set end time to the tasks to being uptodata',
        'dark mode and light mode toggle'
      ],
      technologies: ['React', 'tailwind']
    },
    {
      id: 'react3',
      title: 'Dashboard',
      github: 'https://github.com/yahealulu/Admin_dashboard',
      demo: 'https://admin-dashboard-beta-beige.vercel.app',
      images: [adminDashboard1, adminDashboard2, adminDashboard3],
      description: 'An admin dashboard built with React, featuring customizable charts and tables.',
      features: [
        'Adding users and roles for each user',
        'Responsive design components',
        'Integration with Chart.js and React-Table'
      ],
      technologies: ['React', 'Chart.js', 'React-Table']
    }
  ],
  nextjs: [
    {
      id: 'next1',
      title: 'landing page',
      github: 'https://github.com/yahealulu/techlandingpage',
      demo: 'https://techlandingpage1.vercel.app/',
      images: [landingPage1, landingPage2, landingPage3],
      description: 'A landing page for tech company that\'s represent company features.',
      features: [
        'design the website to like a game',
        'modern ui with styled component'
      ],
      technologies: ['Next.js', 'react hooks']
    },
    {
      id: 'next2',
      title: 'RACE RENTALS',
      github: 'https://github.com/yahealulu/carrenting',
      demo: 'https://carrenting.vercel.app/',
      images: [rentCars1, rentCars2, rentCars3],
      description: 'This project is a Luxury Race Track Car Rental Platform designed to provide an immersive and interactive experience for users looking to rent high-performance supercars',
      features: [
        'Interactive Car Showcase',
        'Responsive Design',
        'Race Track Theme'
      ],
      technologies: ['Vanilla JavaScript', 'SVG Graphics and Animations', ' CSS Media Queries']
    },
    {
      id: 'next3',
      title: 'Car Game',
      github: 'https://github.com/yahealulu/car-game',
      demo: 'https://car-game-one-coral.vercel.app',
      images: [carGame1, carGame2, carGame3],
      description: 'A Car Game using one html file includes the styles and javascript codes',
      features: [
        'To win the race you must reach the finish line before time runs out.',
        '3d model for the car',
        'open world driving'
      ],
      technologies: ['Vanilla javascript', 'html', 'inline css']
    }
  ]
};
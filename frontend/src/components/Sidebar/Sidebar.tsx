import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTag, faUser, faClock, faFilm, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/discount">
            <FontAwesomeIcon icon={faTag} />
            <span>Discount</span>
          </Link>
        </li>
        <li>
          <Link to="/members">
            <FontAwesomeIcon icon={faUser} />
            <span>Members</span>
          </Link>
        </li>
        <li>
          <Link to="/showtimes">
            <FontAwesomeIcon icon={faClock} />
            <span>Showtimes</span>
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <FontAwesomeIcon icon={faFilm} />
            <span>Movies</span>
          </Link>
        </li>
        <li>
          <Link to="/analytics">
            <FontAwesomeIcon icon={faChartBar} />
            <span>Analytics</span>
          </Link>
        </li>
        <li className="logout">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Log out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

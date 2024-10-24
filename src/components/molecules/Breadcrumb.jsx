import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="bg-cover p-3 rounded">
      <ul className="flex">
        <li>
          <Link to="/" className="text-blue-500">Home</Link>
        </li>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const to = `/${paths.slice(0, index + 1).join('/')}`;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {!isLast ? (
                <Link to={to} className="text-blue-500 capitalize">{path}</Link>
              ) : (
                <span className="capitalize">{path}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;

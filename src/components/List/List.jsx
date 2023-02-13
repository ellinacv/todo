import React from 'react';
import './List.scss';

export const List = ({ items }) => {
  return (
    <ul className="list">
      {items.map((item) => (
        <li className="list-item active">
          <div className="list-item__icon">
            {item.icon ? (
              item.icon
            ) : (
              <i className={`badge badge_${item.color}`}></i>
            )}
          </div>
          <div>{item.title}</div>
        </li>
      ))}
    </ul>
  );
};

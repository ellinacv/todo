import React from 'react';
import classNames from 'classnames';
import './List.scss';

export const List = ({ items, isRemovable }) => {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames('list-item', item.className, {
            active: item.active,
          })}
        >
          <div className="list-item__icon">
            {item.icon ? (
              item.icon
            ) : (
              <i className={`badge badge_${item.color}`}></i>
            )}
          </div>
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

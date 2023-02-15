import React from 'react';
import classNames from 'classnames';
import { Badge } from '../Badge/Badge';
import './List.scss';

export const List = ({ items, isRemovable, onClick }) => {
  return (
    <ul onClick={onClick} className="list">
      {items.map((item) => (
        <li
          key={item.id}
          className={classNames('list-item', item.className, {
            active: item.active,
          })}
        >
          <div className="list-item__icon">
            {item.icon ? item.icon : <Badge color={item.color} />}
          </div>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

import React from 'react';
import classNames from 'classnames';
import { Badge } from '../Badge/Badge';
import './List.scss';

export const List = ({ items, colors, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (
      window.confirm(`Вы действительно хотите удалить список "${item.name}"?`)
    ) {
      return onRemove(item.id);
    }
  };
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
            {item.icon ? (
              item.icon
            ) : (
              <Badge
                color={
                  (colors.find((c) => c.id === item.colorId) || { hex: '#ccc' })
                    .hex
                }
              />
            )}
          </div>
          <span>{item.name}</span>
          {isRemovable && (
            <button
              type="button"
              className="btn_remove"
              onClick={() => removeList(item)}
            >
              &#x2715;
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

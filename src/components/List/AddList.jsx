import React, { useState } from 'react';
import { List } from './List';
import { Badge } from '../Badge/Badge';
import './AddList.scss';

export const AddList = ({ colors }) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="add-list">
      <List
        onClick={() => setShowPopup(!showPopup)}
        items={[
          {
            className: 'list-item__icon-btn',
            icon: (
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1V11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: 'Добавить папку',
          },
        ]}
      />
      {showPopup && (
        <div className="add-list-popup">
          <input className="field" type="text" placeholder="Название списка" />
          <div className="add-list-popup__colors">
            {colors.map((color) => (
              <Badge key={color.hex} color={color.name} />
            ))}
          </div>
          <button className="button add-list__button">Добавить</button>
        </div>
      )}
    </div>
  );
};

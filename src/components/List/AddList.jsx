import React, { useState, useEffect } from 'react';
import { List } from './List';
import { Badge } from '../Badge/Badge';
import './AddList.scss';

export const AddList = ({ colors, onAdd }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors) === true && colors.length > 0) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const togglePopup = () => {
    if (showPopup === true) {
      setShowPopup(false);
      setInputValue('');
      selectColor(colors[0].id);
      return;
    }
    setShowPopup(true);
  };

  const addList = async () => {
    if (!inputValue) {
      alert('Add name list');
      return;
    }
    await onAdd({
      name: inputValue,
      colorId: selectedColor,
    });
    setShowPopup(false);
    setInputValue('');
    selectColor(colors[0].id);
  };
  return (
    <div className="add-list">
      <List
        onClick={togglePopup}
        items={[
          {
            id: '_0',
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
            name: 'Добавить папку',
          },
        ]}
      />
      {showPopup && (
        <div className="add-list-popup">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list-popup__colors">
            {colors.map((color) => (
              <Badge
                key={color.hex}
                color={color.hex}
                className={selectedColor === color.id && 'active'}
                onClick={() => selectColor(color.id)}
              />
            ))}
          </div>
          <button onClick={addList} className="button add-list__button">
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import classNames from 'classnames';
import './Badge.scss';

export const Badge = ({ color, onClick, className }) => (
  <i
    onClick={onClick}
    className={classNames('badge', className)}
    style={{ backgroundColor: color }}
  ></i>
);

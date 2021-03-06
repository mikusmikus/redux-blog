import React, { FC } from 'react';
import style from './textarea.module.scss';

type Props = {
  value: string;
  placeholder?: string;
  children?: React.ReactNode;
  rows?: number;
  id?: string;
  required?: boolean;
  onChangeHandler: (value: string) => void;
};

const Textarea: FC<Props> = ({
  children,
  id,
  required,
  rows=10,
  value,
  placeholder = 'Enter text here',
  onChangeHandler,
}) => {
  return (
    <textarea
      className={style.textarea}
      placeholder={placeholder}
      rows={rows}
      value={value}
      id={id}
      required={required}
      onChange={(e) => onChangeHandler(e.target.value)}
    >
      {children}
    </textarea>
  );
};

export default Textarea;

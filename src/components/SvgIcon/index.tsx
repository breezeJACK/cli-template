import React from 'react';
import styles from './index.module.less';

interface IProps {
  className?: string;
  fill?: string; // ex: fill-primay
  type: string;
  color?: string;
  size?: string | number;
  style?: React.CSSProperties;
  onClick?: () => void;
}
const SvgIcon: React.FC<IProps> = props => {
  const { className, fill, type, color = '#eeeeee', size = 16, onClick, style } = props;
  return (
    <i className={`${styles.svgIcon} ${className}`} style={style} onClick={onClick}>
      <svg
        className={`${styles.svg} ${fill}`}
        aria-hidden="true"
        style={{ width: size, height: size, color, fill: fill ? '' : 'currentColor' }}
      >
        <use xlinkHref={`#icon-${type}`} />
      </svg>
    </i>
  );
};

export default SvgIcon;

import styles from './footer.module.css';
import { MinusOutlined } from '@ant-design/icons';
import { message } from 'antd';
const FooterMobile = ({
  drawerVisible,
  handleChangeDrawer,
  wheaterCurrent,
  wheaterUnit
}) => {
  return (
    <div
      className={styles.footer}
      onClick={() => {
        handleChangeDrawer(!drawerVisible);
      }}
    >
      <div className={styles.icon__container}>
        <MinusOutlined className={styles.footer__icon} />
      </div>
      <div className={styles.footer__infoContainer}>
        <img
          className={styles.condition__icon}
          src={wheaterCurrent?.condition?.icon}
          alt={wheaterCurrent?.condition?.text}
        />
        <p>
          Sensación térmica:{' '}
          {wheaterUnit === 'celsius'
            ? wheaterCurrent?.feelslike_c
            : wheaterCurrent?.feelslike_f}{' '}
          °
          <br />
          <i>{wheaterCurrent?.condition?.text}</i>
        </p>
      </div>
    </div>
  );
};

export default FooterMobile;

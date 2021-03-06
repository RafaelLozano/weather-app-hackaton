import styles from './footer.module.css';
import { MinusOutlined, SettingOutlined } from '@ant-design/icons';
import en from '../../i18n/en';
import es from '../../i18n/es';
const FooterMobile = ({
  drawerVisible,
  handleChangeDrawer,
  wheaterCurrent,
  wheaterUnit,
  language
}) => {
  const t = language === 'es' ? es : en;
  return (
    <div
      className={wheaterCurrent?.is_day ? styles.footer : styles.footerNight}
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
          {`${t.footer.feelsLike}: `}

          {wheaterUnit === 'celsius'
            ? `${wheaterCurrent?.feelslike_c} °c`
            : `${wheaterCurrent?.feelslike_c} °f`}
          <br />
          <i>{wheaterCurrent?.condition?.text}</i>
        </p>
      </div>
      <SettingOutlined className={styles.settingsIcon} />
    </div>
  );
};

export default FooterMobile;

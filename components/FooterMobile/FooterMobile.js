import styles from './footer.module.css';

const FooterMobile = ({ drawerVisible, handleChangeDrawer }) => {
  return (
    <div
      className={styles.footer}
      onClick={() => handleChangeDrawer(!drawerVisible)}
    >
      FooterMobile
    </div>
  );
};

export default FooterMobile;

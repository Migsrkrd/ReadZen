const Footer = () => {

  const styles = {
    siteFooter : {
      backgroundColor: '#2b2024',
      color: '#fbf9fa',
      padding: '45px 0 20px',
      fontSize: '15px',
      lineHeight: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '200px',
    },
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    footerContent: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    footerInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      fontSize: '14px',
    },
    footerSocials: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    socialList: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      listStyleType: 'none',
      padding: '0',
      fontSize: '40px',
    },
    socialLogo: {
      color: '#fd0054',
      padding: '0 10px',
    },
    email: {
      color: '#fd0054',
    }
  }

    return (
<footer style={styles.siteFooter}>
  <div style={styles.container}>
    <div style={styles.footerContent}>
      <div style={styles.footerInfo}>
        <p>&copy; 2023 ReadZen. All Rights Reserved.</p>
        <p>Designed and Developed with ❤️ by Your Team Name</p>
        <p>Contact us: <a style={styles.email} href="mailto:info@readzen.com">info@readzen.com</a></p>
      </div>
      <div style={styles.footerSocials}>
        <p>Follow us:</p>
        <ul style={styles.socialList}>
          <li><a style={styles.socialLogo} href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
          <li><a style={styles.socialLogo} href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
          <li><a style={styles.socialLogo} href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
          <li><a style={styles.socialLogo} href="#" target="_blank"><i className="fa fa-github"></i></a></li>
        </ul>
      </div>
      <div>
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
        <p>Accessibility</p>
      </div>
      <div>
        <p>ReadZen</p>
        <p>1234 Main St</p>
        <p>City, State 12345</p>
      </div>
    </div>
  </div>
</footer>
    );
    }

    export default Footer;
const Footer = () => {

    return (
<footer className="site-footer">
  <div className="container">
    <div className="footer-content">
      <div className="footer-logo">
        <img src="logo.png" alt="ReadZen Logo"/>
      </div>
      <div className="footer-info">
        <p>&copy; 2023 ReadZen. All Rights Reserved.</p>
        <p>Designed and Developed with ❤️ by Your Team Name</p>
        <p>Contact us: <a href="mailto:info@readzen.com">info@readzen.com</a></p>
      </div>
      <div className="footer-social">
        <p>Follow us:</p>
        <ul>
          <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
          <li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
          <li><a href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
          <li><a href="#" target="_blank"><i className="fa fa-github"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
    );
    }

    export default Footer;
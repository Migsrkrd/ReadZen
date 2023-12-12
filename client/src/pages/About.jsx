const About = () => {
  const styles = {
    span: {
      fontWeight: "bold",
    },
    aboutUs: {
      color: "#fbf9fa",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 5%",
      paddingLeft: "5%",
      paddingRight: "5%",
      borderRight: "4px solid #fd0054",
      borderLeft: "4px solid #fd0054",
    },
    main: {
      textAlign: "center",
      backgroundColor: "#2b2024",
      border: "2px solid #fd0054",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "70%",
      padding: "0 20px",
      margin: "30px 20px 30px 20px",
      borderRadius: "10px",
      lineHeight: "1.5",
    },
    mission: {
      backgroundColor: "#2b2024",
      border: "2px solid #fd0054",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      margin: "30px 20px 50px 20px",
      borderRadius: "10px",
      lineHeight: "1.5",
    },
    features: {
      backgroundColor: "#2b2024",
      border: "2px solid #fd0054",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      margin: "30px 20px 50px 20px",
      borderRadius: "10px",
      lineHeight: "1.5",
    },
    howItWorks: {
      backgroundColor: "#2b2024",
      border: "2px solid #fd0054",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      margin: "30px 20px 40px 20px",
      borderRadius: "10px",
      lineHeight: "1.5",

    },
    join: {
      textAlign: "center",
      backgroundColor: "#2b2024",
      border: "2px solid #fd0054",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      margin: "20px",
      borderRadius: "10px",
      lineHeight: "1.5",
      width: "70%",
    },
    holder: {
      paddingTop: "150px",
    }
  };

  return (
    <div style={styles.holder}>
    <div style={styles.aboutUs}>
      <div style={styles.main}>
        <h1>About ReadZen</h1>
        <p>
          Welcome to ReadZen, your go-to platform for effortlessly creating and
          sharing well-crafted READMEs for your GitHub projects. At ReadZen, we
          understand the importance of a clear and informative README file for
          any development project. Our platform provides you with a
          user-friendly interface to streamline the README creation process and
          showcase your projects to the world.
        </p>
      </div>
      <div style={styles.listArea}>
        <div style={styles.mission}>
          <h3>Our Mission</h3>
          <p>
            <span style={styles.span}>Empowering Developers:</span> ReadZen is
            built with the mission to empower developers by simplifying the
            process of creating professional and comprehensive READMEs. We
            believe that every project, big or small, deserves to have a clear
            documentation that not only helps the developer but also allows
            others to understand and contribute to the project.
            <br />
            <br />
            <span style={styles.span}>Streamlined Experience:</span> Our
            platform offers a seamless experience for developers, allowing them
            to sign in or sign up with ease. Once you're part of the ReadZen
            community, you can effortlessly create, share, and explore a variety
            of web development projects.
          </p>
        </div>
        <div style={styles.features}>
          <h3>Key Features</h3>
          <ol>
            <li>
              <span style={styles.span}>User-Friendly UI:</span> Our intuitive
              user interface ensures that generating a README is a quick and
              straightforward process. No more struggling with markdown syntax –
              let ReadZen handle it for you.
            </li>
            <li>
              <span style={styles.span}>Project Showcase:</span>Your projects
              take center stage on our homepage. Each project is presented in a
              card format, providing key details such as your name, project
              description, a deployed link, and a link to the GitHub repository.
            </li>
            <li>
              <span style={styles.span}>Interactive Sharing: </span> Share your
              projects with the community by simply clicking a button. Your
              projects become visible to others, fostering collaboration and
              allowing fellow developers to interact with and appreciate your
              work.
            </li>
            <li>
              <span style={styles.span}>Modal Readme Display: </span> Clicking
              on a project card reveals a modal displaying the full README. Dive
              deeper into the project details without leaving the homepage.
            </li>
          </ol>
        </div>
        <div style={styles.howItWorks}>
          <h3>How It Works</h3>
          <ol>
            <li>
              <span style={styles.span}>Sign In/Sign Up:</span> Join our
              community by creating an account or signing in if you're already a
              member. Your ReadZen profile becomes your hub for managing and
              showcasing your projects.
            </li>
            <li>
              <span style={styles.span}>Create READMEs with Ease:</span>Utilize
              our user-friendly interface to input the details of your project.
              From project title to deployment links, our platform guides you
              through the process.
            </li>
            <li>
              <span style={styles.span}>Save and Share:</span> Once your README
              is complete, your project is automatically saved to your profile.
              Share it on our homepage for others to discover and appreciate.
            </li>
            <li>
              <span style={styles.span}>Explore and Interact:</span> Browse
              through a diverse range of projects on our homepage. Interact with
              other developers, provide feedback, and find inspiration for your
              next venture.
            </li>
          </ol>
        </div>
      </div>
      <div style={styles.join}>
        <h3>Join ReadZen Today!</h3>
        <p>
          Embark on a journey of simplified README creation and collaborative
          development. Join ReadZen today and experience the joy of sharing and
          discovering innovative web development projects. Let's build a
          community where documentation is as exciting as the code itself. Happy
          coding! 🚀
        </p>
      </div>
    </div>
    </div>
  );
};

export default About;

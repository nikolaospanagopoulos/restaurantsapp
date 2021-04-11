import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About</h1>
      <h3>
        this is an application created by Nikolaos Panagopoulos using node.js
        and React
      </h3>
      <h4>
        It is an open source project made so that people can learn how to code
        properly
      </h4>
      <h4>
        Github repo:{" "}
        <a href="https://github.com/nikolaospanagopoulos/restaurantsapp">
          https://github.com/nikolaospanagopoulos/restaurantsapp
        </a>
      </h4>
      <h4>
        Website:{" "}
        <a href="https://www.nikospan.com/">https://www.nikospan.com/</a>
      </h4>
      <h4>
        Email: <a href="mailto:nikos4222@outlook.com.gr">here</a>
      </h4>
    </div>
  );
};

export default AboutPage;

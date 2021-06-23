import React, { useEffect, Fragment } from "react";
import AOS from "aos";
import $ from "jquery";

import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import "./Contact.css"
import "aos/dist/aos.css";
import "../assets/styles/main.scss";

const Landing = () => {
  useEffect(() => {
    AOS.init({ once: true });

    let navElement = $("nav");

    $(function() {
      $(window).scrollTop() > navElement.innerHeight()
        ? navElement.addClass("sticky")
        : navElement.removeClass("sticky");
    });
    $(window).on("scroll", function() {
      $(window).scrollTop() > navElement.innerHeight()
        ? navElement.addClass("sticky")
        : navElement.removeClass("sticky");
    });
  });

  return (
    <Fragment>
      <Header />
      <main>
        <Home />
        <About />
        <Contact />
      </main>
    </Fragment>
  );
};

export default Landing;
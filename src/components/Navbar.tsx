import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          DD
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="Origins" />
            </a>
          </li>
          <li>
            <a data-href="#tech" href="#tech">
              <HoverLinks text="Tech Hub" />
            </a>
          </li>
          <li>
            <a data-href="#terminal" href="#terminal">
              <HoverLinks text="Showcase" />
            </a>
          </li>
          <li>
            <a data-href="#career" href="#career">
              <HoverLinks text="Timeline" />
            </a>
          </li>
          <li>
            <a data-href="#education" href="#education">
              <HoverLinks text="Education" />
            </a>
          </li>
          <li>
            <a data-href="#activity" href="#activity">
              <HoverLinks text="Activity" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="Projects" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="Contact" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;

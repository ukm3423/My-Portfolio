import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Example icon for menu
import { CSSTransition } from 'react-transition-group';
import './styles.css'; // Import the custom CSS for transitions

const Home: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const scrollToSection = (id: string) => {
    closeDrawer();
    const element = document.getElementById(id);
    if (element) {
      const offset = 60; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading">
          <span className="text-teal-500">BIDISHA</span> <span className="text-gray-200">MAM 👩‍🎓</span>
        </h1>
        <button
          className="md:hidden "
          onClick={toggleDrawer}
          aria-label="Open menu"
        >
          <FaBars size={24} />
        </button>
        <nav className="hidden md:flex space-x-4">
          <a href="#about" className="hover:underline font-semibold">About</a>
          <a href="#projects" className="hover:underline font-semibold">Projects</a>
          <a href="#contact" className="hover:underline font-semibold">Contact Us</a>
        </nav>
      </header>

      {/* Drawer */}
      <CSSTransition
        in={isDrawerOpen}
        timeout={300}
        classNames="drawer"
        unmountOnExit
      >
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-40 flex justify-end">
          <div className="w-64 bg-gray-800 text-white p-4 h-full">
            <button className="text-xl mb-4" onClick={closeDrawer}>Close</button>
            <nav>
              <ul className="space-y-4">
                <li><a href="#about" onClick={() => scrollToSection('about')} className="hover:underline font-semibold">About</a></li>
                <li><a href="#projects" onClick={() => scrollToSection('projects')} className="hover:underline font-semibold">Projects</a></li>
                <li><a href="#contact" onClick={() => scrollToSection('contact')} className="hover:underline font-semibold">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </CSSTransition>

      <main className="pt-10"> {/* Adjust top padding if needed */}

        <section id="about" className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-8 mb-4 pt-16 relative overflow-hidden">
          <div className="flex-1 md:mr-8 p-6 relative">
            <div className="absolute inset-0 bg-teal-500 opacity-10 transform rotate-12 -z-10 blur-md"></div>
            <h2 className="text-xl md:text-5xl font-extrabold mb-4 text-gray-800 relative overflow-hidden">
              <span className="writing-animation">I'm <span className="text-teal-600">Umesh Kumar</span>, Software Developer..</span>
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Hi, I'm a Java Developer with a passion for creating robust and scalable applications. With experience in various frameworks and tools, I strive to deliver high-quality solutions and innovative ideas.
            </p>

            <a href="/path/to/your-resume.pdf" download="Umesh-Kumar-Resume.pdf">
              <button className="mt-6 px-4 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300">
                Download Resume
              </button>
            </a>
          </div>
          <div className="flex-1 mt-4 md:mt-0 flex justify-center">
            <img src="https://avatars.githubusercontent.com/u/141232431?v=4" alt="Profile" className="w-80 h-80 md:w-80 md:h-80 rounded-full border-4 border-gray-300 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl" />
          </div>
        </section>





        <section id="projects" className="min-h-screen bg-white p-4 mb-4 pt-20">
          <h2 className="text-2xl font-bold mb-4">My Projects</h2>
          <p>
            Here are some of the projects I've worked on. Each project showcases different aspects of my skills and experience.
          </p>
          {/* Add your project details here */}
        </section>

        <section id="contact" className="min-h-screen bg-gray-200 p-4 pt-20">
          <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
          <p>
            Feel free to reach out to me for any inquiries or collaboration opportunities.
          </p>
          {/* Add your contact details or form here */}
        </section>
      </main>
    </div>
  );
};

export default Home;

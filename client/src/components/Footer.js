import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p>© {new Date().getFullYear()} Все права защищены.</p>
    </footer>
  );
};

export default Footer;
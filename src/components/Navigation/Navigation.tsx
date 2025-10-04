import React from 'react';
import ecolexLogo from '../../assets/ecolex-logo.png';
import NavigationItem from './NavigationItem';

const Navigation: React.FC = () => {
  return (
    <nav className="w-64 h-screen bg-green p-6 shadow-lg">
      {/* Logo */}
      <div className="mb-8">
        <img src={ecolexLogo} alt="EcoLex Logo" className="h-8 w-auto" />
      </div>
      
      {/* Menu Items */}
      <ul className="space-y-4 ">
        <NavigationItem label="Home" destiny="/" />
        <NavigationItem label="Dashboard" destiny="/dashboard" />
        <NavigationItem label="Novo projeto" destiny="/novo-projeto" />
        <NavigationItem label="Legislação" destiny="/legislacao" />
      </ul>
    </nav>
  );
};

export default Navigation;
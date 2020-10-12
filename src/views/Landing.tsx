import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import logoImg from '../assets/logo.svg';
import '../styles/views/landing.css';
import { Link } from 'react-router-dom';

interface ILandingProps {
}

const Landing: React.FunctionComponent<ILandingProps> = (props) => {
  return (
    <div id='page-landing'>
      <div className='content-wrapper'>
        <img src={logoImg} alt='Logo' />
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>
        <div className='location'>
          <strong>Blumenau</strong>
          <span>Santa Catarina</span>
        </div>
        <Link to='/app' className='enter-app'>
          <FiArrowRight size={26} color='rgba(0, 0, 0.6)'/>
        </Link>
      </div>
    </div>
  );
};

export default Landing;

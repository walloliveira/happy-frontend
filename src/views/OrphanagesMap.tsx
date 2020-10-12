import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../assets/map-marker.svg';
import '../styles/views/orphanages-map.css';

interface IOrphanagesMapProps {
}

const OrphanagesMap: React.FunctionComponent<IOrphanagesMapProps> = (props) => {
  const url = `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_BOXMAP_TOKEN}`;
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMarkerImg} alt='Happy' />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Blumenau</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map
        center={[-26.8697179, -49.1120323]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}
        <TileLayer
          url={url} />
      </Map>

      <Link to='/ap' className='create-orphanage'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </div>
  );
};

export default OrphanagesMap;

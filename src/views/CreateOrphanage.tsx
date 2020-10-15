import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import SideBar from '../components/Sidebar';
import '../styles/views/create-orphanage.css';
import { LeafletMouseEvent } from 'leaflet'
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

interface Position {
  latitude: number;
  longitude: number;
}

const CreateOrphanage: React.FC = () => {
  const url = `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_BOXMAP_TOKEN}`;
  const [position, setPosition] = useState<Position>({
    latitude: 0,
    longitude: 0,
  });
  const history = useHistory();
  const [name, setName] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [opening_hours, setOpeningHours] = useState<string>('');
  const [opens_at_weekends, setOpensAtWeekends] = useState<boolean>(true);
  const [images, setImages] = useState<Array<File>>([]);
  const [previewImages, setPreviewImages] = useState<Array<string>>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;
    const data = new FormData();
    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('opens_at_weekends', String(opens_at_weekends));
    images.forEach(image => data.append('images', image));

    api.post('/orphanages', data)
      .then(() => {
        history.push('/map');
      });
  }

  return (
    <div id='page-create-orphanage'>
      <SideBar />

      <main>
        <form className='create-orphanage-form' onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-26.8697179, -49.1120323]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}

            >
              <TileLayer
                url={url}
              />
              {
                position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )
              }
            </Map>

            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                id='name'
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='about'>Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id='about'
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='images'>Fotos</label>

              <div className='images-container'>
                {previewImages.map((previewImage, index) => {
                  return (
                    <img
                      src={previewImage}
                      key={index}
                      alt={`${index}`}
                    />
                  );
                })}
                <label htmlFor='image[]' className='new-image'>
                  <FiPlus size={24} color='#15b6d6' />
                </label>
              </div>
              <input type='file' id='image[]' multiple onChange={handleSelectedImages}/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className='input-block'>
              <label htmlFor='instructions'>Instruções</label>
              <textarea
                id='instructions'
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='opening_hours'>Horário de funcionamento</label>
              <input
                id='opening_hours'
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>

              <div className='button-select'>
                <button
                  type='button'
                  className={opens_at_weekends ? 'active': ''}
                  onClick={() => setOpensAtWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type='button'
                  className={!opens_at_weekends ? 'active': ''}
                  onClick={() => setOpensAtWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className='confirm-button' type='submit'>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage;

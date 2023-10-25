
import React, { useState } from 'react';
import { Cities } from '../../const';

type CitiesTabsProps = {
  updateActiveCity: (city: keyof typeof Cities) => void;
}

const cities = Object.keys(Cities);

export default function CitiesTabs({updateActiveCity}: CitiesTabsProps): JSX.Element {
  const [ activeCity, setActiveCity ] = useState<keyof typeof Cities>(Cities.Paris);

  const handleCityClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>, city: keyof typeof Cities) => {
    evt.preventDefault();
    setActiveCity(city);
    updateActiveCity(city);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) =>
            (
              <li key={city} className="locations__item">
                <a
                  className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
                  href="#"
                  onClick={(evt) => {
                    handleCityClick(evt, city as keyof typeof Cities);
                  }}
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

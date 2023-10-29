import { useDispatch, useSelector } from 'react-redux';
import { getCity } from '../../store/city-data/selectors';
import { Cities } from '../../const';
import { updateCity } from '../../store/city-data/city-data';

const cities = Object.keys(Cities);

export default function CitiesTabs(): JSX.Element {
  const activeCity = useSelector(getCity);
  const dispatch = useDispatch();

  const handleCityClick = (city: keyof typeof Cities) => {
    dispatch(updateCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) =>
            (
              <li key={city} className="locations__item">
                <span
                  className={`locations__item-link tabs__item is-clickable ${city === activeCity ? 'tabs__item--active' : ''}`}
                  onClick={() => {
                    handleCityClick(city as keyof typeof Cities);
                  }}
                >
                  <span>{city}</span>
                </span>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import { getCity } from '../../store/city-data/selectors';
import { cities, CityName } from '../../const';
import { updateCity } from '../../store/city-data/city-data';

export default function CitiesTabs(): JSX.Element {
  const activeCity = useSelector(getCity);
  const dispatch = useDispatch();

  const handleCityClick = (city: CityName) => {
    dispatch(updateCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list" data-testid="locations__list">
          {cities.map((city) =>
            (
              <li key={city} className="locations__item">
                <span
                  className={`locations__item-link tabs__item is-clickable ${city === activeCity ? 'tabs__item--active' : ''}`}
                  onClick={() => {
                    handleCityClick(city);
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

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../../const';
import { Offer, City } from '../../types';

export type MapProps = {
  offers: Offer[];
  activeOffer: Offer;
}

export default function Map({offers, activeOffer}: MapProps): JSX.Element {
  const firstOffer = activeOffer;

  const place: City = {
    name: firstOffer.title,
    location: {
      latitude: firstOffer.location.latitude,
      longitude: firstOffer.location.longitude,
      zoom: firstOffer.location.zoom,
    }
  };

  const mapRef = useRef(null);
  const map = useMap(mapRef, place);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_ACTIVE,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {

        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: (offer.id === activeOffer?.id) ? currentCustomIcon : defaultCustomIcon,
        })
          .addTo(map);
      });

      map.setView([activeOffer.location.latitude, activeOffer.location.longitude], 13);
    }
  }, [map, offers, activeOffer]);

  return (
    <section ref={mapRef} className="cities__map map">
    </section>
  );
}

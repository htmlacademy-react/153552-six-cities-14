import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { MarkerUrl } from '../../const';
import { Offer, City } from '../../types';
import useMap from '../../hooks/useMap';

export type MapProps = {
  offers: Offer[];
  activeOffer: Offer;
  hoveredOffer?: Offer | null;
  isOfferPage?: boolean;
  type: string;
  isActiveOfferOrange?: boolean;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: MarkerUrl.Default,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: MarkerUrl.Active,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export default function Map({ offers, activeOffer, hoveredOffer, isOfferPage, type, isActiveOfferOrange }: MapProps): JSX.Element {
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

  const currentIconType = isActiveOfferOrange ? currentCustomIcon : defaultCustomIcon;

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: ((offer.id === hoveredOffer?.id) || (isOfferPage && offer.id === activeOffer?.id)) ? currentIconType : defaultCustomIcon,
        })
          .addTo(map);
      });

      map.setView([activeOffer.location.latitude, activeOffer.location.longitude], 13);
    }
  }, [map, offers, activeOffer, isOfferPage, hoveredOffer, currentIconType]);

  return (
    <section data-testid="map__id" ref={mapRef} className={`map ${type === 'city' ? 'cities__map' : 'offer__map'}`}>
    </section>
  );
}

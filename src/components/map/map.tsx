import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hoc/useMap';
import { MarkersUrls } from '../../const';
import { Offer, City } from '../../types';

export type MapProps = {
  offers: Offer[];
  activeOffer: Offer;
  hoveredOffer?: Offer | null;
  isOfferPage?: boolean;
  type: string;
  isActiveOfferOrange?: boolean;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: MarkersUrls.Default,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: MarkersUrls.Active,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export default function Map({offers, activeOffer, hoveredOffer, isOfferPage, type, isActiveOfferOrange }: MapProps): JSX.Element {
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
      offers.forEach((offer, index) => {
        if (index < 3) {
          leaflet.marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: ((offer.id === activeOffer?.id) || (isOfferPage && offer.id === activeOffer?.id)) ? currentIconType : defaultCustomIcon,
          })
            .addTo(map);
        }
      });

      map.setView([activeOffer.location.latitude, activeOffer.location.longitude], 13);
    }
  }, [map, offers, activeOffer, hoveredOffer, currentIconType]);

  return (
    <section data-testid="map__id" ref={mapRef} className={`map ${type === 'city' ? 'cities__map' : 'offer__map'}`}>
    </section>
  );
}

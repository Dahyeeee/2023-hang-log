import { MARKER_STYLE } from '@constants/map';
import { useEffect, useState } from 'react';

interface TripItemMarkerProps {
  map: google.maps.Map;
  id: number;
  lat: number;
  lng: number;
  isSelected: boolean;
}

const TripItemMarker = ({ map, id, lat, lng, isSelected }: TripItemMarkerProps) => {
  const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  useEffect(() => {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng },
      map,
    });

    setMarker(marker);

    return () => {
      marker.map = null;
    };
  }, [id, lat, lng, map]);

  useEffect(() => {
    if (marker) {
      const pin = isSelected
        ? new google.maps.marker.PinElement(MARKER_STYLE.SELECTED)
        : new google.maps.marker.PinElement(MARKER_STYLE.DEFAULT);

      marker.content = pin.element;
    }
  }, [id, isSelected, marker]);

  return null;
};

export default TripItemMarker;
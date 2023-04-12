import { useRef, useEffect } from "react";
import "./Map.css";

const Map = ({ obj }) => {
  const { className, style, center, zoom } = obj || {};
  const mapRef = useRef();

  // we use useEffect here and we are sure that the re-render is going to take place
  // because initially zoom and center variables will be undefined.
  // by the second time it will change the useRef will already be holding the values assigned to it
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    // a marker is used to identify a location on a map
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style}></div>;
};

export default Map;

/**
 * To render google maps, we need google map sdk
 * useRef persists between renders of your component
 * useRef does not cause your component to re-render after every change
 * useRef variables survive the re-render cycle of the component and thus they don't lose their
 * value after each re-render
 */

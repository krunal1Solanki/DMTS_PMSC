"use client"
import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import ClusterComponet from "../Components/ClusterComponent";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Button } from '@chakra-ui/react';

const MapComponent = ({ center, locations, mapHeight, mapTypeId, onInfoItemClick, zoomLevel, mapMarker }) => {
  const [map, setMap] = useState(null);
  const [initialCenter, setInitialCenter] = useState(center);
  const [initialZoom, setInitialZoom] = useState(zoomLevel);

  useEffect(() => {
    if (center && locations.length > 0) {
      setInitialCenter(center);
    }
  }, [center, locations]);

  useEffect(() => {
    setInitialZoom(zoomLevel);
  }, [zoomLevel]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
googleMapsApiKey: 'AIzaSyC_mmyHAnkTF9dUjcTngzxG9eHfS3oMbfM',

  });

  const containerStyle = {
    width: "100%",
    height: mapHeight,
    position: "relative",
  };

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const resetView = () => {
    if (map) {
      map.panTo(initialCenter);
      map.setZoom(initialZoom);
    }
  };

  const resetButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "100px",
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  };

  return (
    <div className="map-container">
      <div style={containerStyle}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={initialCenter}
            zoom={initialZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapTypeId={mapTypeId ? mapTypeId : 'roadmap'}
          >
            {locations ? <ClusterComponet locations={locations} onInfoItemClick={onInfoItemClick} mapMarker={mapMarker} /> : null}
          </GoogleMap>
        ) : (
          <div>Loading....</div>
        )}
        <Button style={resetButtonStyle} colorScheme='blue' onClick={resetView}>Reset View</Button>
      </div>
    </div>
  );
};

MapComponent.propTypes = {
  center: PropTypes.object,
  locations: PropTypes.array,
  mapHeight: PropTypes.string,
  mapTypeId: PropTypes.string,
  onInfoItemClick: PropTypes.func,
  zoomLevel: PropTypes.number,
  mapMarker: PropTypes.any,
};

MapComponent.defaultProps = {
  zoomLevel: 13,
  mapMarker: null,
};

export default MapComponent ;

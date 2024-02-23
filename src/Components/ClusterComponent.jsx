"use client"
import React from "react";
import mapLocationMarker from "../Images/mapmarker.png";
import mapMarker from "../Images/member.svg";
import PropTypes from 'prop-types';
// import InfoComponent from "./InfoComponent";
import { MarkerClusterer, InfoWindow, Marker } from '@react-google-maps/api';
var moment = require('moment');

const ClusterComponet = ({ locations,onInfoItemClick, mapMarker }) => {
  const [activeMarker, setActiveMarker] = React.useState(null);
  // console.log('ClusterComponet-locations',locations);
  const createKey=(location)=>{
    // console.log('createKey',location);
    // console.log('createKey-location',location);
    // const latitude=location.lat?location.lat:location.latitude;
    // const longitude=location.lng?location.lng:location.longitude;
    // console.log('createKey-location',location);
    // console.log('createKey-location.aquaLogixID',location);
    // return latitude.toString()+longitude.toString();
    return location._id.toString();
  }
  const handleMarkerClick = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // const bindMarkers=()=>{
  //   if(siteData){
  //     if(siteData.length>0){
  //       return (
  //         <MarkerClusterer>
  //             {(clusterer) =>
  //               siteData.map((location) =>                
  //               {
  //                 // console.log('location',location);
  //                 const locationObject={lat:parseFloat(location.latLog[0]),lng:parseFloat(location.latLog[1])};
  //                 // console.log('locationObject',locationObject);
  //                 return(
  //                   <Marker key={createKey(location)} position={locationObject} clusterer={clusterer} icon={mapMarker} onClick={()=>handleMarkerClick(createKey(location._id))}>
  //                     {/* {activeMarker === createKey(location) ? (
  //                       <InfoWindow onCloseClick={() => setActiveMarker(null)}>
  //                         <InfoComponent site={location.site} />
  //                       </InfoWindow>
  //                     ) : null} */}
  //                   </Marker>
  //                 )
  //               })
  //             }
  //           </MarkerClusterer>
  //       )
  //     }
  //   }    
  // }
  const bindMarkers=()=>{
    if(locations){
      if(locations.length>0){
        return (
          <MarkerClusterer>
              {(clusterer) =>
                locations.map((location) => 
                {
                  // console.log('bindMarkers-location',location);
                  ////////////////////////////////////////////////////////////////////////////////////////////////////////
                  ///Condition to differenciat user map and site map on site dashboard screen.
                  ////////////////////////////////////////////////////////////////////////////////////////////////////////
                  if(location.empData){
                    // console.log('location',location.content);
                    // console.log('location',location.content.time);
                    const datetime=moment(new Date(location.empData.time)).format("DD/MM/YYYY");                    
                    const currDatetime=moment(new Date()).format("DD/MM/YYYY");
                    // console.log('datetime',datetime);
                    // console.log('currDatetime',currDatetime);
                    // var g2 = new Date();
                    if (datetime === currDatetime){
                      return(
                        <Marker key={createKey(location)} position={{lat:parseFloat(location.lat?location.lat:location.latitude), lng:parseFloat(location.lng?location.lng:location.longitude)}} clusterer={clusterer} icon={mapMarker?mapMarker:mapLocationMarker} onClick={()=>handleMarkerClick(createKey(location))}>
                          {activeMarker === createKey(location) ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                              {/* <InfoComponent site={location} onInfoItemClick={onInfoItemClick} /> */}
                            </InfoWindow>
                          ) : null}
                        </Marker>
                      )
                    }                  
                  }
                  else{
                    return(<Marker key={createKey(location)} position={{lat:parseFloat(location.lat?location.lat:location.latitude), lng:parseFloat(location.lng?location.lng:location.longitude)}} clusterer={clusterer} icon={mapMarker?mapMarker:mapLocationMarker} onClick={()=>handleMarkerClick(createKey(location))}>
                      {activeMarker === createKey(location) ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                          <InfoComponent site={location} onInfoItemClick={onInfoItemClick} />
                        </InfoWindow>
                      ) : null}
                    </Marker>)
                  }

                }
              )}
            </MarkerClusterer>
        )
      }
    }    
  }
  return (
    <>
      {bindMarkers()}
    </>
  );
};

ClusterComponet.propTypes = {
  locations: PropTypes.array,
  siteData: PropTypes.array,
  onInfoItemClick:PropTypes.func,
  mapMarker:PropTypes.any,
};
export default ClusterComponet ;

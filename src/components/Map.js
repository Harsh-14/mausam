import React, { Fragment, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { GlobalStoreContext } from './Store';
import '../css/marker.scss';
import Divider from "@mui/material/Divider";


export default function Map(props) {

  const [globalStore] = useContext(GlobalStoreContext);

  return (
    <>
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA9f_ARjt6AgrQZATjg3VyUmtvlaxcfEBs'}}
        center={{lat: globalStore.latitude, lng: globalStore.longitude}}
        defaultZoom={9}
        onClick={props.handleMapClick}
      >
        <Marker lat={globalStore.latitude} lng={globalStore.longitude} />
      </GoogleMapReact>
    </div>
    <Divider/>
    </>
  )
}

function Marker() {
  return (
    <Fragment>
      <div className="pin"></div>
      <div className="pulse"></div>
    </Fragment>
  );
}

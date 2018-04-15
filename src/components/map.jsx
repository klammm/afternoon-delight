import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from 'google-map-react';

// const GMAPS_KEY = process.env.GOOGLE_MAPS_API_KEY;

class Map extends Component {
  constructor(props) {
    super(props);

    this.renderMarkers = this.renderMarkers.bind(this);
  }

  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      // position: myLatLng
      map,
      title: "Hello World!"
    });

    return marker;
  }

  render() {
    return (
      <div className="Map" style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        >
        </GoogleMapReact>
      </div>
    )
  }
}

Map.displayName = "Map";

Map.defaultProps = {
  center: {
    lat: 37.79,
    lng: -122.42
  },
  zoom: 12
};

Map.propTypes = {
  /*
  ** Center the map's view on page load
  */
  center: PropTypes.object,
  /*
  ** Keep the zoom to a certain maximize/minimize threshold
  */
  zoom: PropTypes.number,
};

export default Map;

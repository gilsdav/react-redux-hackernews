import React, { Component } from 'react';
import * as ol from 'openlayers';
import 'openlayers/css/ol.css';

class Map extends Component {

    componentDidMount() {
        this.initMap();
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateMap();
    }

    initMap() {
        // create feature layer and vector source
        const featuresLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [],
            })
        });

        // create map object with feature layer
        const map = new ol.Map({
            target: this.refs.mapContainer,
            layers: [
                //default OSM layer
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                featuresLayer
            ],
            view: new ol.View({
                center: [-11718716.28195593, 4869217.172379018], //Boulder, CO
                zoom: 13,
            })
        });

        map.on('click', this.handleMapClick.bind(this));

        // save map and layer references to local state
        this.setState({
            map: map,
            featuresLayer: featuresLayer
        });
    }

    updateMap() {
        this.state.featuresLayer.setSource(
            new ol.source.Vector({
                features: this.props.routes
            })
        );
    }

    handleMapClick(event) {

        // create WKT writer
        const wktWriter = new ol.format.WKT();
    
        // derive map coordinate (references map from Wrapper Component state)
        const clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);
    
        // create Point geometry from clicked coordinate
        const clickedPointGeom = new ol.geom.Point( clickedCoordinate );
    
        // write Point geometry to WKT with wktWriter
        const clickedPointWkt = wktWriter.writeGeometry( clickedPointGeom );
        
        // place Flux Action call to notify Store map coordinate was clicked
        // Actions.setRoutingCoord( clickedPointWkt );
    
    }


    render() {
        return (
            <div ref="mapContainer"></div>
        );
    }
}

export default Map;

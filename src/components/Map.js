import React, { Component } from 'react';
import * as ol from 'openlayers';
import 'openlayers/css/ol.css';
import { getReadableWorks } from '../selectors/map';
import { connect } from 'react-redux';

class Map extends Component {

    componentDidMount() {
        this.initMap();
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateMap();
        console.log('update');
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
                center: [487907.65690432955, 6579390.890153458], //Boulder, CO
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

    getPolygon() {
        const values = [
            [487907.65690432955, 6579390.890153458],
            [487105.06810733624, 6580384.571521165],
            [487105.06810733624, 6580308.13449288],
            [484429.7721173587, 6580996.067747446],
            [483512.5277779378, 6580843.193690876],
            [481983.7872122364, 6581148.941804016],
            [480607.92070310505, 6583059.867511143],
            [479919.98744853935, 6584894.356189984],
            [478849.86905254837, 6584817.919161699],
            [478238.3728262678, 6586652.407840541],
            [476786.06928885134, 6586270.222699116],
            [475563.0768362902, 6587340.341095107],
            [474263.647355444, 6587646.089208247],
            [473499.2770725932, 6588486.8965193825]
        ];
        const i = new Date().getTime() % 13;
        return new ol.Feature(new ol.geom.Point(values[i]));
    }

    updateMap() {
        this.state.featuresLayer.setSource(
            new ol.source.Vector({
                features: [this.getPolygon()]
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
            <div>
                <div ref="mapContainer"></div>
                {JSON.stringify(this.props.works)}
            </div>
        );
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     onFetchStories: query => dispatch(doFetchStories(query)),
//   });
  
  const mapStateToProps = state => ({
    works: getReadableWorks(state),
  });
  
  export default connect(
    mapStateToProps
  )(Map);


// export default Map;

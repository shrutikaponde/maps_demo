import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

export default class MapExpanded extends Component {

  constructor(props) {
    super(props);
    this.state = { flex: 0 };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ flex: 1 }), 5);
  }

  render() {
    const { region, markers } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          zoomControlEnabled={true}
          style={[styles.map, { flex: this.state.flex }]}
          initialRegion={region}
          cacheEnabled={false}
        >
          {markers.map((marker, index) => <Marker
            key={index}
            coordinate={marker.coordinate}
          />)}
        </MapView>
        <MapView.Callout>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.getDirection()}
              style={styles.bubble}
            >
              <Text>GET DIRECTIONS</Text>
            </TouchableOpacity>
          </View>
        </MapView.Callout>
      </View>
    )
  }

  getDirection() {
    //get src api
    const dest = 'columbia asia hospital pune';
    const destination = dest.replace(/ /gi, '+') ;
    // get direction API call
    const url = 'https://www.google.com/maps/dir/?api=1&destination=' + destination  //+'&travelmode=' + travelMode
    Linking.openURL(url)
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: width,
    height: height
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',

  },
});

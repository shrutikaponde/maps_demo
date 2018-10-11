import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 18.5515;
const LONGITUDE = 73.9348;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      markers: [
        {
          id: 0,
          amount: 99,
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
        },
        {
          id: 1,
          amount: 199,
          coordinate: {
            latitude: 19.0760,
            longitude: 72.8777,
          },
        },
      ]
    };
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }

  render() {
    return (
      <View >
        <View style={{ height: 300 }}>
          <MapView
            onPress={ (event) => {
                this.props.navigation.navigate('MapExpanded',{
                  region: this.state.region,
                  markers: this.state.markers})
            }
            }
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.region}
            rotateEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            zoomEnabled={false}
          >
            {this.state.markers.map((marker, index) => <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
            />)}
          </MapView>
        </View>
       <View style={styles.buttonContainer}>
       <Button title={`Show Map`} onPress={()=> this.props.navigation.navigate('MarkerClustering')}/>
      </View>
       </View>
    );
  }
}

App.propTypes = {
  provider: ProviderPropType,
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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

    alignItems: 'flex-start',
  },
  buttonContainer: {
    width: width/3,
    flexDirection: 'column',
    marginVertical: 20,
  },
});


export default App;
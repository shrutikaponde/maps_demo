
// @flow
'use-strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { generateRandomPoints } from './generator'  

const puneCenterLatitude = 18.5204,
      puneCenterLongitude = 73.8567,
      radius = 600000
export default class MarkerClustering extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pins: []
    }
  }

  componentDidMount() {
    this.reload()
  }

  reload = () => {
    const pins = generateRandomPoints({latitude: puneCenterLatitude, longitude: puneCenterLongitude}, radius, 50, this.state.pins.length)
    this.setState({ pins: pins})
  }

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

    return (
      <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>
            {pointCount} {/* figure out to put count in marker*/}
          </Text>
        </View>
      </Marker>
    )
  }

  renderMarker = (pin) => {
    return (
      <Marker identifier={`pin-${pin.id}`} key={pin.id} coordinate={pin.location} />
    )
  }

  render() {
    return (
      <View style={styles.container} style={{flex: 1}}>
        
        {/* Cluster Map Example */}      
        <ClusteredMapView
          style={{flex: 1}}
          data={this.state.pins}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          initialRegion={{latitude: puneCenterLatitude, longitude: puneCenterLongitude, latitudeDelta: 12, longitudeDelta: 12 }}>
        </ClusteredMapView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  clusterContainer: {
    width: 30,
    height: 30,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  clusterText: {
    fontSize: 13,
    color: '#65bc46',
    fontWeight: '500',
    textAlign: 'center',
  },
  clusterContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})
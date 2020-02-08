// Import Module
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  YellowBox,
  Image,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SockJsClient from 'react-stomp';
import * as Animatable from 'react-native-animatable';

// Disable Bugs : componentWillReceiveProps has been renamed
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps has been renamed',
]);

// LacakScreen Class
export default class LacakScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      stateUser: {
        latitude: -6.263065,
        longitude: 106.786975,
        latitudeDelta: 0.00522,
        longitudeDelta:
          (Dimensions.get('window').width / Dimensions.get('window').height) *
          0.00522,
      },
      stateView: {
        latitude: -6.263065,
        longitude: 106.786975,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      stateMarker: {
        latitude: -6.259993,
        longitude: 106.789122,
      },
    };
  }

  onPressZoomIn() {
    this.region = {
      latitude: this.state.stateView.latitude,
      longitude: this.state.stateView.longitude,
      latitudeDelta: this.state.stateView.latitudeDelta / 5,
      longitudeDelta: this.state.stateView.longitudeDelta / 5,
    };

    this.setState({
      stateView: {
        latitudeDelta: this.region.latitudeDelta,
        longitudeDelta: this.region.longitudeDelta,
        latitude: this.region.latitude,
        longitude: this.region.longitude,
      },
    });
    this.map.animateToRegion(this.region, 100);
  }

  onPressZoomOut() {
    this.region = {
      latitude: this.state.stateView.latitude,
      longitude: this.state.stateView.longitude,
      latitudeDelta: this.state.stateView.latitudeDelta * 5,
      longitudeDelta: this.state.stateView.longitudeDelta * 5,
    };
    this.setState({
      stateView: {
        latitudeDelta: this.region.latitudeDelta,
        longitudeDelta: this.region.longitudeDelta,
        latitude: this.region.latitude,
        longitude: this.region.longitude,
      },
    });
    this.map.animateToRegion(this.region, 100);
  }

  onPresslacak() {
    this.region = {
      latitude: this.state.stateMarker.latitude,
      longitude: this.state.stateMarker.longitude,
      latitudeDelta: this.state.stateView.latitudeDelta,
      longitudeDelta: this.state.stateView.longitudeDelta,
    };
    this.setState({
      stateView: {
        latitudeDelta: this.region.latitudeDelta,
        longitudeDelta: this.region.longitudeDelta,
        latitude: this.region.latitude,
        longitude: this.region.longitude,
      },
    });
    this.map.animateToRegion(this.region, 100);
  }
  onPressMe() {
    this.region = {
      latitude: this.state.stateUser.latitude,
      longitude: this.state.stateUser.longitude,
      latitudeDelta: this.state.stateView.latitudeDelta,
      longitudeDelta: this.state.stateView.longitudeDelta,
    };
    this.setState({
      stateView: {
        latitudeDelta: this.region.latitudeDelta,
        longitudeDelta: this.region.longitudeDelta,
        latitude: this.region.latitude,
        longitude: this.region.longitude,
      },
    });
    this.map.animateToRegion(this.region, 100);
  }

  sendMessage = msg => {
    this.clientRef.sendMessage('/topic/BCAKMINI20190003', msg);
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          stateUser: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00522,
            longitudeDelta:
              (Dimensions.get('window').width /
                Dimensions.get('window').height) *
              0.00522,
            error: null,
          },
          stateView: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      },
      error => this.setState({error: error.message}),
      {enableHighAccurancy: true, timeout: 20000, maximumAge: 2000},
    );
  }

  render() {
    return (
      <View
        style={styles.container}
        onPress={() => this.requestLocationPermission()}>
        <StatusBar backgroundColor="#aaaaaa" />
        <SockJsClient
          url="http://157.230.36.131:8080/websocket/tracker"
          topics={['/topic/BCAKMINI20190003']}
          onMessage={msg => {
            this.setState({
              stateMarker: {
                latitude:
                  msg && Number(msg.latitude) ? Number(msg.latitude) : 0,
                longitude:
                  msg && Number(msg.longitude) ? Number(msg.longitude) : 0,
              },
            });
          }}
        />
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={false}
          ref={ref => (this.map = ref)}
          region={this.state.stateView}
          style={styles.maps}
          initialRegion={this.state.stateUser}>
          <Marker
            coordinate={this.state.stateMarker}
            pinColor={'#fc0303'}
            onPress={e => console.log(e.nativeEvent.coordinate)}
            title={'BCAKMINI20190003'}
            description={'Tracker Connected'}>
            <View>
              <Animatable.Text
                animation="flash"
                easing="ease-out"
                iterationCount="infinite"
                style={{textAlign: 'center'}}>
                <Text style={{fontSize: 150, color: 'red'}}>.</Text>
              </Animatable.Text>
            </View>
          </Marker>
        </MapView>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonMin}
            onPress={() => {
              this.onPressZoomOut();
            }}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMax}
            onPress={() => {
              this.onPressZoomIn();
            }}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerLacak}>
          <TouchableOpacity
            style={styles.buttonLacak}
            onPress={() => {
              this.onPresslacak();
            }}>
            <Text style={styles.buttonTextLacak}>LACAK</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerMe}>
          <TouchableOpacity
            style={styles.buttonMe}
            onPress={() => {
              this.onPressMe();
            }}>
            <Image
              style={styles.buttonMe}
              source={require('../images/myLocation.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  maps: {
    ...StyleSheet.absoluteFillObject,
  },
  containerButton: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  containerLacak: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerMe: {
    position: 'absolute',
    flex: 1,
    top: 10,
    right: 10,
  },
  buttonMax: {
    height: 75,
    width: 141,
    backgroundColor: '#00A1D5',
    borderRadius: 5,
    margin: 10,
  },
  buttonMin: {
    height: 75,
    width: 141,
    backgroundColor: '#00A1D5',
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonLacak: {
    height: 75,
    width: 300,
    backgroundColor: '#00A1D5',
    borderRadius: 5,
    margin: 10,
  },
  buttonTextLacak: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 25,
    padding: 20,
  },
  buttonMe: {
    width: 50,
    height: 50,
  },
});

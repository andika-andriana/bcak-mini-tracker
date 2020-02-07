// Import Module
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

// Import Pages
import Routes from './Routes';

// Main Class
class Main extends Component<{}> {
  render() {
    const {
      authData: {isLoggedIn},
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Routes isLoggedIn={isLoggedIn} />
      </View>
    );
  }
}

// StyleSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Redux Side
mapStateToProps = state => ({
  authData: state.authReducer.authData,
});

export default connect(
  mapStateToProps,
  null,
)(Main);

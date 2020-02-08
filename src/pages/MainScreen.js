// Import Module
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// Import Actions
import {connect} from 'react-redux';
import {logoutUser} from '../actions/auth.actions';
import {Actions} from 'react-native-router-flux';

// Import components
import Logo from '../components/Logo';

// MainScreen Class
class MainScreen extends Component {
  logoutUser = () => {
    this.props.dispatch(logoutUser());
  };

  render() {
    const {
      getUser: {userDetails},
    } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#91acaf" />
        <Logo />
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.lacak()}>
            <Text style={styles.buttonText}>LACAK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.profile()}>
            <Text style={styles.buttonText}>PROFIL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonKeluar}
            onPress={this.logoutUser}>
            <Text style={styles.buttonTextKeluar}>KELUAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00B3EC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 3,
    width: '75%',
    justifyContent: 'center',
    justifyContent: 'flex-start',
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#00A1D5',
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  buttonText: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    padding: 5,
  },
  buttonKeluar: {
    backgroundColor: 'rgba(250, 255, 0, 0.72)',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    shadowColor: 'rgba(0, 0, 0, 0.22)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  buttonTextKeluar: {
    fontFamily: 'Oxygen-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0082AB',
    textAlign: 'center',
    padding: 5,
  },
});

// Redux Side
mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
});

mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainScreen);

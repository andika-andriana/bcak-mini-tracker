// Import Module
import React, {Component} from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';
import {
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  ToastAndroid,
} from 'react-native';

// Import Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import MainScreen from './pages/MainScreen';
import LacakScreen from './pages/LacakScreen';
import ProfileScreen from './pages/ProfileScreen';

// Routes Class
export default class Routes extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      doubleBackToExitPressedOnce: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    // navigate('NewScreen');
  };

  handleBackButton = () => {
    if (this.state.doubleBackToExitPressedOnce) {
      BackHandler.exitApp();
    }
    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
    this.setState({doubleBackToExitPressedOnce: true});
    return true;
  };
  render() {
    const renderBackButton = () => (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./images/icon-back.png')}
            style={{width: 50, height: 10}}
          />
        </View>
      </TouchableOpacity>
    );

    const renderRightButton = () => (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./images/edit.png')}
            style={{width: 35, height: 15}}
          />
        </View>
      </TouchableOpacity>
    );
    return (
      <Router>
        <Scene>
          <Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn}>
            <Scene key="login" component={Login} initial={true} />
            <Scene
              key="signup"
              hideNavBar={false}
              component={Signup}
              title="balen sign up"
              navigationBarStyle={{
                backgroundColor: '#bededc',
                height: 30,
              }}
              titleStyle={{
                marginLeft: '33%',
                fontSize: 15,
                fontFamily: 'Oxygen-Regular',
              }}
              renderBackButton={() => renderBackButton()}
              renderRightButton={() => renderRightButton()}
            />
          </Scene>
          <Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn}>
            <Scene
              key="main"
              title="balen"
              hideNavBar={false}
              component={MainScreen}
              navigationBarStyle={{
                backgroundColor: '#bededc',
                height: 30,
              }}
              titleStyle={{
                marginLeft: '45%',
                fontSize: 15,
                fontFamily: 'Oxygen-Regular',
              }}
            />
          </Scene>
          <Scene
            key="lacak"
            component={LacakScreen}
            title="lacak"
            navigationBarStyle={{
              backgroundColor: '#e3e7e7',
              height: 30,
            }}
            titleStyle={{marginLeft: '33%', fontSize: 15}}
            renderBackButton={() => renderBackButton()}
          />
          <Scene
            key="profile"
            component={ProfileScreen}
            title="profile"
            navigationBarStyle={{
              backgroundColor: '#e3e7e7',
              height: 30,
            }}
            titleStyle={{marginLeft: '40%', fontSize: 15}}
            renderBackButton={() => renderBackButton()}
            renderRightButton={() => renderRightButton()}
          />
        </Scene>
      </Router>
    );
  }
}

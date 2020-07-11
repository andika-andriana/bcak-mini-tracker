// Import Module
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {compose} from 'redux';

// Import Actions
import {loginUser} from '../actions/auth.actions';
import {Actions} from 'react-native-router-flux';
import {Field, reduxForm} from 'redux-form';

// Import Component
import InputText from '../components/InputText';
import Logo from '../components/Logo';
import Loader from '../components/Loader';

// Login Class
class Login extends Component {
  signup() {
    Actions.signup();
  }

  loginUser = async values => {
    const response = await this.props.dispatch(loginUser(values));
    console.log(response);
    if (!response.success) {
      Alert.alert(
        'Gagal',
        'Silahkan cek data yang anda input dan coba beberapa saat lagi. Terima kasih.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  onSubmit = values => {
    this.loginUser(values);
  };

  renderTextInput = field => {
    const {
      meta: {touched, error},
      label,
      secureTextEntry,
      maxLength,
      keyboardType,
      placeholder,
      input: {onChange, ...restInput},
    } = field;
    return (
      <View>
        <InputText
          onChangeText={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          label={label}
          {...restInput}
        />
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  render() {
    const {handleSubmit, loginUser} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#00A1D5" />
        {loginUser && loginUser.isLoading && <Loader />}
        <Logo />
        <View style={styles.containerForm}>
          <Field
            name="username"
            placeholder="USERNAME"
            component={this.renderTextInput}
          />
          <Field
            name="password"
            placeholder="PASSWORD"
            secureTextEntry={true}
            component={this.renderTextInput}
          />
          <TouchableOpacity
            style={styles.buttonMasuk}
            onPress={handleSubmit(this.onSubmit)}>
            <Text style={styles.buttonTextMasuk}>MASUK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDaftar} onPress={this.signup}>
            <Text style={styles.buttonTextDaftar}>DAFTAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00B3EC',
  },
  containerForm: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '75%',
  },
  buttonMasuk: {
    backgroundColor: '#FAFF00',
    borderRadius: 10,
    marginVertical: 20,
    paddingVertical: 10,
  },
  buttonTextMasuk: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0082AB',
    textAlign: 'center',
  },
  buttonDaftar: {
    backgroundColor: '#03A9DD',
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonTextDaftar: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

// Validation Redux-Form
const validate = values => {
  const errors = {};
  if (!values.username) {
    if (!values.password) {
      errors.password = 'Mohon isi Data Anda!';
    }
    return errors;
  }
};

// Redux Side

mapStateToProps = state => ({
  loginUser: state.authReducer.loginUser,
});

mapDispatchToProps = dispatch => ({
  dispatch,
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form: 'login',
    validate,
  }),
)(Login);

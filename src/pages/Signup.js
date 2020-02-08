// Import Module
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';

// Import Pages
import Logo from '../components/Logo';
import InputText from '../components/InputText';
import InputTextCapitalize from '../components/InputTextCapitalize';
import Loader from '../components/Loader';

// Import Actions
import {createNewUser} from '../actions/auth.actions';
import {ErrorUtils} from '../utils/auth.utils';
import {Actions} from 'react-native-router-flux';

class Signup extends Component<{}> {
  goBack() {
    Actions.pop();
  }

  createNewUser = async values => {
    const response = await this.props.dispatch(createNewUser(values));
    if (response.responseBody === '') {
      Alert.alert(
        'Pengumuman',
        'Sebuah email telah terkirim untuk memverifikasi email anda. Silahkan klik link yang ada di dalam email tersebut',
        [{text: 'Setuju', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Gagal',
        'Silahkan cek data yang anda input dan coba beberapa saat lagi. Terima kasih.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  onSubmit = values => {
    if (values.password !== values.password1) {
      Alert.alert(
        'Peringatan',
        'PIN Tidak Sesuai',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      this.createNewUser(values);
    }
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

  renderTextInputCapitalize = field => {
    const {
      meta: {touched, error},
      label,
      secureTextEntry,
      maxLength,
      keyboardType,
      placeholder,
      autoCapitalize,
      input: {onChange, ...restInput},
    } = field;
    return (
      <View>
        <InputTextCapitalize
          autoCapitalize={autoCapitalize}
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
    const {handleSubmit, createUser} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#91acaf" />
        {createUser.isLoading && <Loader />}
        <View style={styles.containerForm}>
          <Field
            name="login"
            placeholder="USERNAME"
            component={this.renderTextInput}
          />
          <Field
            name="firstName"
            placeholder="NAMA DEPAN"
            component={this.renderTextInputCapitalize}
          />
          <Field
            name="lastName"
            placeholder="NAMA BELAKANG"
            component={this.renderTextInputCapitalize}
          />
          <Field
            name="email"
            placeholder="EMAIL"
            component={this.renderTextInputCapitalize}
          />
          <View style={styles.containerFake}>
            <TextInput
              style={styles.padFakeInput}
              value="+62"
              editable={false}
            />
            <TextInput
              placeholder="NOMOR PONSEL"
              placeholderTextColor="#ffffff"
              style={styles.fakeInput}
              keyboardType="phone-pad"
              maxLength={11}
            />
          </View>
          <View style={styles.containerFake}>
            <TextInput
              style={styles.padFakeInput}
              value="BCAK"
              editable={false}
            />
            <TextInput
              placeholder="NOMOR ALAT"
              placeholderTextColor="#ffffff"
              style={styles.fakeInput}
              keyboardType="numeric"
            />
          </View>
          <Field
            name="password"
            placeholder="PIN 6 ANGKA"
            secureTextEntry={true}
            component={this.renderTextInput}
            maxLength={6}
          />
          <Field
            name="password1"
            placeholder="ULANGI PIN 6 ANGKA"
            secureTextEntry={true}
            component={this.renderTextInput}
            maxLength={6}
          />
          <TouchableOpacity
            style={styles.buttonDaftar}
            onPress={handleSubmit(this.onSubmit)}>
            <Text style={styles.buttonDaftarText}>DAFTAR</Text>
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
  containerForm: {
    flex: 2,
    width: '75%',
    paddingBottom: 10,
  },
  buttonDaftar: {
    backgroundColor: '#FAFF00',
    borderRadius: 10,
    marginVertical: 20,
    paddingVertical: 10,
  },
  buttonDaftarText: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0082AB',
    textAlign: 'center',
  },
  containerFake: {
    display: 'flex',
    flexDirection: 'row',
  },
  fakeInput: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    width: '75%',
    borderBottomWidth: 5,
    borderColor: '#ffffff',
    color: '#ffffff',
  },
  fakeInputPin: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    borderBottomWidth: 5,
    borderColor: '#ffffff',
    color: '#ffffff',
  },
  padFakeInput: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    width: '25%',
    borderBottomWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.69)',
    color: 'rgba(255, 255, 255, 0.69)',
  },
});

// Validate Redux-Form
const validate = values => {
  const errors = {};
  if (!values.login || !values.email || !values.password) {
    errors.password1 = 'Mohon lengkapi data anda!';
  }
  if (values.password !== values.password1) {
    errors.password1 = 'PIN Tidak Sesuai';
  }
  return errors;
};

// Redux Side
mapStateToProps = state => ({
  createUser: state.authReducer.createUser,
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
    form: 'register',
    validate,
  }),
)(Signup);

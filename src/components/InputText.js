import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';

const propTypes = {
  mapElement: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string,
  autoCapitalize: PropTypes.string,
};

const defaultProps = {
  mapElement: n => {},
  onSubmitEditing: () => {},
  onChangeText: () => {},
  value: '',
  placeholder: '',
  maxLength: 200,
  secureTextEntry: false,
  label: '',
  autoCapitalize: 'none',
};

const styles = StyleSheet.create({
  inputBox: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 5,
    borderColor: '#ffffff',
    color: '#ffffff',
  },
});

class InputText extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    this.setState({
      value: this.props.value,
    });
  }

  onChangeText = value => {
    this.setState(
      {
        value,
      },
      () => {
        this.props.onChangeText(value);
      },
    );
  };

  render() {
    const {
      placeholder,
      secureTextEntry,
      maxLength,
      value,
      onChangeText,
      onSubmitEditing,
      autoCapitalize,
    } = this.props;
    return (
      <View>
        <TextInput
          autoCapitalize={autoCapitalize}
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={placeholder}
          placeholderTextColor="#ffffff"
          selectionColor="#999999"
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          returnKeyType="next"
          value={this.state.value}
          onSubmitEditing={onSubmitEditing}
          onChangeText={this.onChangeText}
        />
      </View>
    );
  }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;

export default InputText;

//  Import Module
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, StatusBar} from 'react-native';

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#aaaaaa" />
        <TextInput style={styles.text} value="JOKO" editable={false} />
        <TextInput style={styles.text} value="WIDODO" editable={false} />
        <TextInput
          style={styles.text}
          value="JOKO.WIDODO@GMAIL.COM"
          editable={false}
        />
        <TextInput
          style={styles.text}
          value="+62 815 1234 5678"
          editable={false}
        />
        <TextInput style={styles.text} value="BCAK20190001" editable={false} />
        <TextInput style={styles.text} value="******" editable={false} />
        <TextInput style={styles.text} value="******" editable={false} />
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
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    width: '75%',
    borderBottomWidth: 5,
    borderColor: '#ffffff',
    color: '#ffffff',
  },
});

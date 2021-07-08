import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';

export default class LazyLoad extends Component {
    
    componentDidMount() {
      setTimeout(() => {
        this.props.navigation.replace('Dashboard');
        // alert('OKE');
      }, 2000)
    }

  render() {
      return (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={{uri: 'http://web.bkppd-balangankab.info/assets/images/logo.png'}}
          />
          <ActivityIndicator size="large" color="#000"/>
          {/* <Text style={{justifyContent: 'center', alignItems: 'center'}}>Hallo!</Text> */}
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 15
    },
    logo: {
      width: 130,
      height: 130,
      marginBottom: 10
    },
    intro_txt: {
      marginBottom: 5,
      marginTop: 15,
      fontSize: 18,
      fontWeight: 'bold'
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    intro_txt_sub: {
      marginBottom: 15,
      fontSize: 18,
      fontWeight: 'bold'
    }
  });
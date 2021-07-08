import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Pages
import LazyLoad from './screens/Lazyload';
import Dashboard from './screens/Dashboard';
import Survei from './screens/Survei';
import SurveiCard from './screens/SurveiCard';

import AppIntroSlider from 'react-native-app-intro-slider';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const slides = [
  {
    key: 'one',
    title: 'Selamat Datang',
    text: 'SKM (Survei Kepuasan Masyarakat)\nBKPPD Kabupaten Balangan',
    image: require('./assets/images/hero-1.png'),
    // backgroundColor: '#59b2ab',
    backgroundColor: '#fff',
  },
  {
    key: 'two',
    title: 'Pedoman',
    text: 'Penilaian IKM (Indeks Kepuasan Masyarakat) Sesuai Dengan \n PERMENPAN RB No. 14 Tahun 2017',
    image: require('./assets/images/skm_menpan.png'),
    // backgroundColor: '#febe29',
    backgroundColor: '#fff',
  },
  {
    key: 'three',
    title: 'Uptodate',
    text: 'Hasil Penilaian Ditampilkan Secara Uptodate pada Aplikasi WEB & Android',
    image: require('./assets/images/hero-3.png'),
    // backgroundColor: '#22bcb5',
    backgroundColor: '#fff',
  }
];

// Stack berguna untuk routing aplikasi
const Stack = createStackNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showRealApp: false
    }
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={{backgroundColor: item.backgroundColor}}>
          <Image source={item.image} style={styles.image} resizeMode='contain'/>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }

  render () {
    if (this.state.showRealApp) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LazyLoad">
            <Stack.Screen name="Lazy" component={LazyLoad} options={{headerShown: false}} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}/>
            <Stack.Screen name="SurveiCard" component={SurveiCard}  options={{title: 'Pilih Formulir Survei'}}/>
            <Stack.Screen name="Survei" component={Survei}  options={{title: 'Formulir Survei'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (<AppIntroSlider renderItem={this._renderItem} data={slides} dotStyle={{ backgroundColor: '#DDD' }}
      activeDotStyle={{ backgroundColor: 'green' }} renderNextButton={() => { return (<Text style={{ fontSize: responsiveFontSize(2.3), marginTop: 12, fontWeight: 'bold', color: 'green' }}>Next</Text>) }}
          renderPrevButton={() => { return (<Text style={{ fontSize: responsiveFontSize(2.3), marginTop: 12, fontWeight: 'bold', color: 'green' }}>Back</Text>) }}
          renderDoneButton={() => { return (<Text style={{ fontSize: responsiveFontSize(2.3), marginTop: 12, fontWeight: 'bold', color: 'black' }}>Done</Text>) }} onDone={this._onDone}/>);
    }
    // return (<SurveiCard/>)
  }
}


const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: responsiveWidth(80),
    height: responsiveHeight(60),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  text: {
    color: '#999',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    fontSize: responsiveFontSize(2.3),
  },
  title: {
    fontSize: responsiveFontSize(3),
    color: '#000',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

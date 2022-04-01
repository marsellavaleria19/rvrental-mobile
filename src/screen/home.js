import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import Input from '../components/Input';
import CButton from '../components/Button';
import stylePrimary from '../assets/styles/stylePrimary';
import {input, button} from '../assets/styles/styleComponent';
import IconSearch from 'react-native-vector-icons/FontAwesome';
import MainBarTitle from '../components/MainBarTitle';
import ListBar from '../components/ListBar';
// import {image} from '../assets/images/backgroud-image.png'

const image = {uri: 'https://reactjs.org/logo-og.png'};

const Home = ({navigation}) => {
   return (
      <View>
         <View>
            <ImageBackground
               source={require('../assets/images/background-search.png')}
               resizeMode="cover"
               style={addStyles.imageBackgroundSearch}>
               <Container>
                  <View style={addStyles.layoutSearch}>
                     <Input
                        classInput={addStyles.input}
                        placeholder="Search vehicle"
                     />
                     <IconSearch name="search" style={addStyles.icon} />
                  </View>
               </Container>
            </ImageBackground>
         </View>
         <ListBar
            title="Car"
            navigate={() => navigation.navigate('DetailCategory')}>
            <Image
               source={require('../assets/images/list-car1.png')}
               style={addStyles.imageList}
            />
            <Image
               source={require('../assets/images/list-car1.png')}
               style={addStyles.imageList}
            />
         </ListBar>
         <ListBar title="Car">
            <Image
               source={require('../assets/images/list-car1.png')}
               style={addStyles.imageList}
            />
            <Image
               source={require('../assets/images/list-car1.png')}
               style={addStyles.imageList}
            />
         </ListBar>
         <ListBar title="Car">
            <Image
               source={require('../assets/images/list-car1.png')}
               style={addStyles.imageList}
            />
            <Image
               source={require('../assets/images/list-car1.png')}
               style={addStyles.imageList}
            />
         </ListBar>
         <View />
      </View>
   );
};

const addStyles = StyleSheet.create({
   input: {
      marginTop: 18,
      fontSize: 14,
      fontWeight: '700',
      backgroundColor: 'rgba(60,60,60, 0.5)',
      ...input,
   },
   imageBackgroundSearch: {
      height: 280,
   },
   icon: {
      position: 'absolute',
      color: 'white',
      fontWeight: '700',
      fontSize: 20,
      right: 20,
      marginTop: 20,
   },
   layoutSearch: {
      position: 'relative',
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
   },

   imageList: {
      marginHorizontal: 10,
      height: 168,
      width: 265,
      borderRadius: 10,
   },
});

export {addStyles};

export default Home;

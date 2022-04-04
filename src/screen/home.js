import * as React from 'react';
import {
   Text,
   View,
   StyleSheet,
   ImageBackground,
   Image,
   TouchableOpacity,
   SafeAreaView,
} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import Input from '../components/Input';
import CButton from '../components/Button';
import stylePrimary from '../assets/styles/stylePrimary';
import {input, button} from '../assets/styles/styleComponent';
import IconSearch from 'react-native-vector-icons/FontAwesome';
import MainBarTitle from '../components/MainBarTitle';
import ListBar from '../components/ListBar';
import {useSelector, useDispatch} from 'react-redux';
import {getListCategory} from '../redux/actions/category';
import {getListVehicle} from '../redux/actions/vehicle';
import {useEffect} from 'react';
import {FlatList, ScrollView} from 'native-base';
// import {image} from '../assets/images/backgroud-image.png'

const image = {uri: 'https://reactjs.org/logo-og.png'};

const Home = ({navigation}) => {
   const {category, vehicle} = useSelector(state => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getListCategory());
      dispatch(getListVehicle());
   }, [dispatch]);

   const itemPerCategory = category => {
      return vehicle.listVehicle
         .filter(item => item.category_id === category.id)
         .filter((item, index) => index < 5);
   };

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
                     <TouchableOpacity
                        onPress={() => navigation.navigate('Filter')}>
                        <IconSearch name="search" style={addStyles.icon} />
                     </TouchableOpacity>
                  </View>
               </Container>
            </ImageBackground>
         </View>
         <View>
            {/* <FlatList
               data={category.listCategory}
               renderItem={({itemCategory}) => {
                  return (
                     <ListBar
                        title={itemCategory.name}
                        navigate={() =>
                           navigation.navigate('DetailCategory', {
                              categoryId: itemCategory.id,
                           })
                        }>
                        <FlatList
                           data={itemPerCategory(itemCategory)}
                           renderItem={({item}) => {
                              return (
                                 <Image
                                    key={item.id}
                                    source={{
                                       uri: `${item.photo}`,
                                    }}
                                    style={addStyles.imageList}
                                 />
                              );
                           }}
                        />
                     </ListBar>
                  );
               }}
            /> */}
            <ScrollView h="65%">
               {category.listCategory.length > 0 &&
                  category.listCategory.map(itemCategory => {
                     return (
                        <ListBar
                           title={itemCategory.name}
                           navigate={() =>
                              navigation.navigate('DetailCategory', {
                                 categoryId: itemCategory.id,
                              })
                           }>
                           <ScrollView horizontal={true}>
                              {vehicle.listVehicle.length > 0 &&
                                 vehicle.listVehicle
                                    .filter(
                                       item =>
                                          item.category_id === itemCategory.id,
                                    )
                                    .filter((item, index) => index < 5)
                                    .map(item => {
                                       return (
                                          <Image
                                             key={item.id}
                                             source={{
                                                uri: `${item.photo}`,
                                             }}
                                             style={addStyles.imageList}
                                          />
                                       );
                                    })}
                           </ScrollView>
                        </ListBar>
                     );
                  })}
            </ScrollView>
         </View>
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

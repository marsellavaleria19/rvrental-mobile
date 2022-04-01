import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import Container from '../components/Container';
import {input, button} from '../assets/styles/styleComponent';
import ListFilter from '../components/ListDetail';
import IconFilter from 'react-native-vector-icons/FontAwesome';

const Filter = ({navigation}) => {
   return (
      <View>
         <Container>
            <View style={addStyles.layoutFilter}>
               <IconFilter name="filter" style={addStyles.icon} />
               <Text>Filter search</Text>
            </View>
            <ListFilter
               path={require('../assets/images/list-car1.png')}
               title="Vespa Matic"
               description="Max for 2 person"
               detail="2.1 km for your location"
               status="Avaliable"
               price="Rp. 140.000"
               rate="4.5"
               // navigate={() => navigation.navigate('Reservation')}
            />
            <ListFilter
               path={require('../assets/images/list-car1.png')}
               title="Vespa Matic"
               description="Max for 2 person"
               detail="2.1 km for your location"
               status="Avaliable"
               price="Rp. 140.000"
               rate="4.5"
            />
            <ListFilter
               path={require('../assets/images/list-car1.png')}
               title="Vespa Matic"
               description="Max for 2 person"
               detail="2.1 km for your location"
               status="Avaliable"
               price="Rp. 140.000"
               rate="4.5"
            />
         </Container>
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
      color: '#DFDEDE',
      fontWeight: '700',
      fontSize: 20,
      marginRight: 4,
   },
   layoutFilter: {
      flexDirection: 'row',
      marginTop: 20,
      height: 50,
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

export default Filter;

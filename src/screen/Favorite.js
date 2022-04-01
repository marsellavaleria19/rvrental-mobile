import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import IconChevron from 'react-native-vector-icons/FontAwesome';
import stylePrimary from '../assets/styles/stylePrimary';
import ListFavorite from '../components/ListHistoryFavorite';
import image from '../assets/images/background-reservation.png';
import {ScrollView} from 'native-base';

const Favorite = () => {
   return (
      <SafeAreaView>
         <Container>
            <ScrollView>
               <View style={addStyles.layoutFavorite}>
                  <ListFavorite
                     path={image}
                     title="Vespa Matic"
                     reservationDate="Jan 18 to 21 2021"
                     payment={245000}
                     location="Senayan, Jakarta"
                     isHistory={false}
                  />
                  <ListFavorite
                     path={image}
                     title="Vespa Matic"
                     reservationDate="Jan 18 to 21 2021"
                     payment={245000}
                     location="Senayan, Jakarta"
                     isHistory={false}
                  />
                  <ListFavorite
                     path={image}
                     title="Vespa Matic"
                     reservationDate="Jan 18 to 21 2021"
                     payment={245000}
                     location="Senayan, Jakarta"
                     isHistory={false}
                  />
                  <ListFavorite
                     path={image}
                     title="Vespa Matic"
                     reservationDate="Jan 18 to 21 2021"
                     payment={245000}
                     location="Senayan, Jakarta"
                     isHistory={false}
                  />
                  <ListFavorite
                     path={image}
                     title="Vespa Matic"
                     reservationDate="Jan 18 to 21 2021"
                     payment={245000}
                     location="Senayan, Jakarta"
                     isHistory={false}
                  />
                  <ListFavorite
                     path={image}
                     title="Vespa Matic"
                     reservationDate="Jan 18 to 21 2021"
                     payment={245000}
                     location="Senayan, Jakarta"
                     isHistory={false}
                  />
               </View>
            </ScrollView>
         </Container>
      </SafeAreaView>
   );
};

const addStyles = StyleSheet.create({
   layoutToday: {
      marginTop: 30,
   },
   flexRow: {
      flexDirection: 'row',
   },
   listToday: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#DADADA',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   fontTitle: {
      fontSize: 14,
      color: '#C4C4C4',
      fontWeight: '600',
      marginBottom: 13,
   },
   iconChevron: {
      fontSize: 14,
      color: '#999999',
   },
   layoutFavorite: {
      marginTop: 30,
      marginBottom: 18,
   },
});

export {addStyles};

export default Favorite;

import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import IconChevron from 'react-native-vector-icons/FontAwesome';
import stylePrimary from '../assets/styles/stylePrimary';
import ListHistory from '../components/ListHistory';
import image from '../assets/images/background-reservation.png';
import {ScrollView} from 'native-base';

const History = () => {
   return (
      <SafeAreaView>
         <Container>
            <ScrollView>
               <View style={addStyles.layoutToday}>
                  <Text style={addStyles.fontTitle}>Today</Text>
                  <View style={addStyles.listToday}>
                     <Text style={addStyles.textToday}>
                        Please finish your payment for vespa for Vespa Rental
                        Jogja
                     </Text>
                     <IconChevron
                        name="chevron-right"
                        style={addStyles.iconChevron}
                     />
                  </View>
                  <View style={addStyles.listToday}>
                     <Text style={addStyles.textToday}>
                        Your payment for a vintage bike at Jogja just confirmed!
                     </Text>
                  </View>
               </View>
               <View style={addStyles.layoutWeek}>
                  <Text style={addStyles.title}>A Week Ago</Text>
               </View>
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
               />
               <ListHistory
                  path={image}
                  title="Vespa Matic"
                  reservationDate="Jan 18 to 21 2021"
                  payment={245000}
                  status="Has been returned"
               />
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
   textToday: {
      fontSize: 14,
      color: stylePrimary.mainColor,
      fontWeight: '400',
   },
   layoutWeek: {
      marginTop: 30,
      marginBottom: 18,
   },
});

export {addStyles};

export default History;

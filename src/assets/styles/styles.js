import {StyleSheet} from 'react-native';
import stylePrimary from './stylePrimary';

const styles = StyleSheet.create({
   container: {
      marginHorizontal: 30,
   },
   background: {
      flex: 1,
      backgroundColor: stylePrimary.backgrorund,
   },
   image: {
      flex: 1,
      justifyContent: 'center',
   },
   input: {
      borderRadius: 10,
      width: stylePrimary.baseButtonWidth,
      color: stylePrimary.baseFontColor,
      fontWeight: '700',
      fontSize: 24,
      paddingHorizontal: 10,
   },
   layoutList: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
   },
   imageCategory: {
      width: 101,
      height: 88,
      borderRadius: 10,
      margin: 10,
   },
   layoutDetail: {
      marginHorizontal: 24,
   },
   titleDetail: {
      fontSize: 14,
      fontWeight: '700',
   },
   descriptionDetail: {
      fontSize: 14,
   },
   statusAvailable: {
      fontSize: 14,
      color: 'green',
   },
   statusNotAvailable: {
      fontSize: 14,
      color: 'red',
   },
   priceDetail: {
      fontSize: 16,
      fontWeight: '700',
   },
   layoutImageRating: {
      position: 'relative',
      flexWrap: 'nowrap',
   },
   rateLayout: {
      // position:'absolute',
      // background: 'linear-gradient(91.97deg, #F8A170 14.73%, #FFCD61 97.52%)',
      height: 24,
      width: 50,
      right: 0,
      boxShadow: '0px 10px 40px rgba(248, 161, 112, 0.2)',
      borderRadius: 40,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
   },
   rateText: {
      fontSize: 12,
      color: stylePrimary.baseFontColor,
      fontWeight: '800',
      marginRight: 4,
   },
   rateIcon: {
      fontSize: 12,
      color: stylePrimary.baseFontColor,
      marginLeft: 3,
   },
   buttonPayment: {
      backgroundColor: stylePrimary.secondaryColor,
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      borderRadius: 10,
   },
   fontButtonPayment: {
      fontSize: 24,
      fontWeight: '700',
      color: stylePrimary.mainColor,
   },
});

export {styles};

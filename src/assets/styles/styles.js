import {StyleSheet} from 'react-native';
import stylePrimary from './stylePrimary';

const styles = StyleSheet.create({
   container: {
      marginHorizontal: 30,
   },
   background: {
      flex: 1,
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
      fontWeight: 700,
   },
   descriptionDetail: {
      fontSize: 14,
   },
   statusAvailable: {
      fontSize: 14,
      color: 'green',
   },
   priceDetail: {
      fontSize: 16,
      fontWeight: 700,
   },
   layoutImageRating: {
      position: 'relative',
      flexWrap: 'nowrap',
   },
   rateLayout: {
      // position:'absolute',
      background: 'linear-gradient(91.97deg, #F8A170 14.73%, #FFCD61 97.52%)',
      height: 24,
      width: 50,
      right: 0,
      boxShadow: '0px 10px 40px rgba(248, 161, 112, 0.2)',
      borderRadius: 40,
      alignItems: 'center',
   },
   rateText: {
      fontSize: 12,
      color: stylePrimary.baseFontColor,
      marginTop: 3,
      fontWeight: 800,
   },
   rateIcon: {
      fontSize: 12,
      color: stylePrimary.baseFontColor,
      marginLeft: 3,
   },
});

export {styles};

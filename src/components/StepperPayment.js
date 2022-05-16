import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View, Text} from 'react-native';
import stylePrimary from '../assets/styles/stylePrimary';
import {styles} from '../assets/styles/styles';

const DEFAULT_WEIGHT = 30;

const StepperPayment = ({active, count, weight = DEFAULT_WEIGHT}) => {
   const STEPPER_WIDTH = (weight + 10) * count;
   const arrayItem = [...Array(count - 1)];

   const addStyles = StyleSheet.create({
      layoutStepper: {
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      layoutLine: {
         flexDirection: 'row',
         position: 'absolute',
         width: '100%',
         justifyContent: 'space-around',
      },
      line: {
         height: 4,
         width: weight + 5,
      },
      stepper: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         height: weight,
      },
      item: {
         width: weight,
         height: weight,
         borderRadius: weight / 2,
         justifyContent: 'center',
         alignItems: 'center',
         color: 'white',
      },
      text: {
         fontSize: weight / 2,
         color: 'white',
         fontWeight: stylePrimary.bold,
      },
   });

   return (
      <View style={addStyles.layoutStepper}>
         <View style={[addStyles.stepper, {width: STEPPER_WIDTH}]}>
            <View style={addStyles.layoutLine}>
               {arrayItem.map((o, i) => {
                  return (
                     <LinearGradient
                        colors={
                           active - 1 >= i + 1
                              ? [stylePrimary.secondaryColor, '#7796b6']
                              : ['#DFDEDE', '#DFDEDE']
                        }
                        style={addStyles.line}
                     />
                  );
               })}
            </View>
            {[...Array(count)].map((o, i) => {
               return (
                  <LinearGradient
                     colors={
                        active >= i + 1
                           ? [stylePrimary.secondaryColor, '#7796b6']
                           : ['#DFDEDE', '#DFDEDE']
                     }
                     style={addStyles.item}>
                     <Text style={addStyles.text}>{i + 1}</Text>
                  </LinearGradient>
               );
            })}
         </View>
      </View>
   );
};

export default StepperPayment;

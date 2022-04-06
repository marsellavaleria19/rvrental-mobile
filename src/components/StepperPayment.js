import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import stylePrimary from '../assets/styles/stylePrimary';

const DEFAULT_WEIGHT = 30;

const StepperPayment = ({active, count, weight = DEFAULT_WEIGHT}) => {
   const STEPPER_WIDTH = weight * count;
   const arrayItem = [...Array(count - 1)];

   const addStyles = StyleSheet.create({
      layoutStepper: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
      },
      layoutLine: {
         flexDirection: 'row',
         position: 'absolute',
         width: '100%',
         justifyContent: 'space-around',
      },
      line: {
         height: 4,
         width: weight,
      },
      stepper: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         height: weight,
         width: STEPPER_WIDTH,
      },
      itemStepper: {
         width: weight,
         height: weight,
         borderRadius: weight / 2,
         alignItems: 'center',
         justifyContent: 'center',
      },
      textWrapper: {
         fontSize: weight / 2,
         color: stylePrimary.baseFontColor,
         fontWeight: 'bold',
      },
   });

   return (
      <View style={addStyles.layoutStepper}>
         <View style={addStyles.stepper}>
            <View style={addStyles.layoutLine}>
               {arrayItem.map((item, index) => {
                  return (
                     <LinearGradient
                        colors={
                           active - 1 >= index + 1
                              ? ['#F8A170', '#FFCD61']
                              : ['#DFDEDE', '#DFDEDE']
                        }
                        style={addStyles.line}
                     />
                  );
               })}
            </View>
            <View>
               <LinearGradient/>
            </View>
         </View>
      </View>
   );
};

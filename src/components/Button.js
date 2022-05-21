import * as React from 'react';
import {
   Text,
   View,
   Button,
   StyleSheet,
   TextInput,
   TouchableOpacity,
} from 'react-native';
import {styles} from '../assets/styles/styles';
import {stylePrimary} from '../assets/styles/stylePrimary';

const CButton = ({classButton, press, textButton, children}) => {
   return (
      <View style={classButton}>
         <Text style={textButton}>{children}</Text>
      </View>
      // <TouchableOpacity onPress={press}>
      //    <View style={classButton}>
      //       <Text style={textButton}>{children}</Text>
      //    </View>
      // </TouchableOpacity>
   );
};

export default CButton;

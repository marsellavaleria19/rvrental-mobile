import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {styles} from '../assets/styles/styles';
import IconStar from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import stylePrimary from '../assets/styles/stylePrimary';
import NumberFormat from 'react-number-format';
// import { FontAwesome } from '@expo/vector-icons';
// import {image} from '../assets/images/backgroud-image.png'

const ChatRoomComponent = ({chat, isSender, isRead, time}) => {
   return (
      <>
         {isSender == true ? (
            <View style={addStyles.layoutMarginChatSender}>
               <View style={addStyles.layoutChatSender}>
                  <Text style={addStyles.textSender}>{chat}</Text>
               </View>
            </View>
         ) : (
            <View style={addStyles.layoutMarginChatReceiver}>
               <View style={addStyles.layoutChatReceiver}>
                  <Text style={addStyles.textReceiver}>{chat}</Text>
               </View>
            </View>
         )}
         <Text
            style={
               isSender == true
                  ? addStyles.textReadSender
                  : addStyles.textReadReceiver
            }>
            {isRead ? `Read [${time}]` : time}
         </Text>
      </>
   );
};
const addStyles = StyleSheet.create({
   layoutMarginChatSender: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   layoutMarginChatReceiver: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
   },
   layoutChatSender: {
      backgroundColor: stylePrimary.secondaryColor,
      borderRadius: 10,
      width: '70%',
      padding: 5,
   },
   textSender: {
      color: stylePrimary.mainColor,
      fontSize: 12,
   },
   layoutChatReceiver: {
      backgroundColor: stylePrimary.mainColor,
      borderRadius: 10,
      width: '70%',
      padding: 5,
   },
   textReceiver: {
      color: stylePrimary.secondaryColor,
      fontSize: 12,
   },
   textReadSender: {
      fontSize: 10,
      color: stylePrimary.secondaryColor,
      textAlign: 'right',
      paddingEnd: '40%',
   },
   textReadReceiver: {
      fontSize: 10,
      color: stylePrimary.secondaryColor,
      textAlign: 'left',
      paddingLeft: '45%',
   },
});
export {addStyles};
export default ChatRoomComponent;

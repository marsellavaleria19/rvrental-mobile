import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import stylePrimary from '../assets/styles/stylePrimary';

const ChatlistComponent = ({title, date, description, isRead, children}) => {
   return (
      <View style={addStyles.layoutChat}>
         <View style={addStyles.layoutChatHeader}>
            <Text style={addStyles.textTitle}>{title}</Text>
            <Text style={addStyles.date}>{date}</Text>
         </View>
         <View>
            {isRead == false ? (
               <View style={addStyles.layoutDescriptionNotRead}>
                  <Text style={addStyles.descriptionNotRead}>
                     {description}
                  </Text>
                  <View style={addStyles.layoutNotifChat}>
                     <Text style={addStyles.textNotifChat}>1</Text>
                  </View>
               </View>
            ) : (
               <Text style={addStyles.descriptionRead}>{description}</Text>
            )}
         </View>
      </View>
      // <TouchableOpacity onPress={press}>
      //    <View style={classButton}>
      //       <Text style={textButton}>{children}</Text>
      //    </View>
      // </TouchableOpacity>
   );
};
const addStyles = StyleSheet.create({
   layoutChat: {
      borderBottomWidth: 1,
      borderBottomColor: stylePrimary.secondaryColor,
      paddingBottom: 30,
      marginBottom: 10,
   },
   layoutChatHeader: {
      flexDirection: 'row',
      marginBottom: 4,
      justifyContent: 'space-between',
   },
   textTitle: {
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
      fontSize: 12,
   },
   date: {
      color: stylePrimary.secondaryColor,
      fontSize: 10,
   },
   layoutDescriptionNotRead: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 10,
   },
   descriptionNotRead: {
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
      fontSize: 10,
   },
   descriptionRead: {
      color: stylePrimary.mainColor,
      fontSize: 10,
   },
   layoutNotifChat: {
      color: stylePrimary.mainColor,
      backgroundColor: stylePrimary.secondaryColor,
      width: 15,
      height: 15,
      borderRadius: 8,
   },
   textNotifChat: {
      color: stylePrimary.mainColor,
      fontSize: 10,
      textAlign: 'center',
      fontWeight: stylePrimary.bold,
   },
});
export {addStyles};
export default ChatlistComponent;

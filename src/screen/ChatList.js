import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ChatlistComponent from '../components/ChatlistComponent';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import {ScrollView} from 'native-base';
import stylePrimary from '../assets/styles/stylePrimary';
import NBInput from '../components/NBInput';
import CInput from '../components/Input';
import IconSearch from 'react-native-vector-icons/FontAwesome';

const ChatList = ({navigation}) => {
   return (
      <View style={styles.background}>
         <Container>
            <ScrollView style={addStyles.layoutListChat}>
               <View>
                  <CInput
                     classInput={addStyles.inputSearch}
                     placeholder="Search"
                  />
                  <TouchableOpacity>
                     <IconSearch name="search" style={addStyles.iconSearch} />
                  </TouchableOpacity>
               </View>
               <View style={addStyles.layoutList}>
                  <TouchableOpacity
                     onPress={() => navigation.navigate('ChatRoom')}>
                     <ChatlistComponent
                        title="RV Reantao"
                        date="Yesterday"
                        description="Hey, there are 3 vespa left"
                        isRead={false}
                     />
                  </TouchableOpacity>
                  <ChatlistComponent
                     title="RV Reantao"
                     date="Yesterday"
                     description="Hey, there are 3 vespa left"
                  />
               </View>
            </ScrollView>
         </Container>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutChat: {
      borderBottomWidth: 1,
      borderBottomColor: stylePrimary.secondaryColor,
   },
   layoutListChat: {
      marginTop: 30,
   },
   textTitle: {
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
      fontSize: 12,
   },
   layoutList: {
      marginTop: 43,
      position: 'relative',
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
   iconSearch: {
      color: stylePrimary.mainColor,
      fontSize: 20,
      position: 'absolute',
      bottom: 20,
      left: 15,
   },
   inputSearch: {
      backgroundColor: stylePrimary.backgrorund,
      borderColor: stylePrimary.mainColor,
      borderWidth: 1,
      // opacity: 0.1,
      borderRadius: 10,
      height: 60,
      paddingLeft: 50,
      marginRight: 10,
      width: '100%',
      color: stylePrimary.secondaryColor,
   },
});
export {addStyles};

export default ChatList;

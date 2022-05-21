import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ChatlistComponent from '../components/ChatlistComponent';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import {FlatList, ScrollView} from 'native-base';
import stylePrimary from '../assets/styles/stylePrimary';
import NBInput from '../components/NBInput';
import CInput from '../components/Input';
import IconSearch from 'react-native-vector-icons/FontAwesome';
import ChatRoomComponent from '../components/ChatRoomComponent.';
import ChatRoomHeaderComponent from '../components/ChatRoomHeaderComponent';
import imageItem from '../assets/images/background-reservation.png';
import IconFeather from 'react-native-vector-icons/Feather';
import IconCamera from 'react-native-vector-icons/FontAwesome5';

const ChatRoom = ({navigation}) => {
   const listChat = [
      {
         id: 1,
         isSender: true,
         isRead: true,
         chat: ' Hey, can I book 2 vespa for January 18 to 21?',
         time: '12.04 PM',
      },
      {
         id: 2,
         isSender: false,
         isRead: false,
         chat: 'Hey thanks for asking, it’s available now you can do reservation and pay for the vespa so they’re ready for you',
         time: '12.10 PM',
      },
   ];
   return (
      <View style={styles.background}>
         <View style={addStyles.layoutNavigate}>
            <TouchableOpacity onPress={() => navigation.navigate('ChatNav')}>
               <IconFeather
                  name="chevron-left"
                  style={addStyles.iconNavigate}
               />
            </TouchableOpacity>

            <Text style={addStyles.textNavigate}>Vespa Bali</Text>
         </View>
         <View style={addStyles.layoutContainer}>
            <Container>
               <ScrollView>
                  <ChatRoomHeaderComponent
                     path={imageItem}
                     title={'Vespa Matic'}
                     status={'Available'}
                     price="120000"
                     rate={4.5}
                  />
                  <View style={addStyles.layoutChat}>
                     {listChat.map(item => {
                        return (
                           <View
                              key={item.id}
                              style={addStyles.layoutChatComponent}>
                              <ChatRoomComponent
                                 chat={item.chat}
                                 isSender={item.isSender}
                                 isRead={item.isRead}
                                 time={item.time}
                              />
                           </View>
                        );
                     })}
                  </View>
               </ScrollView>
            </Container>

            {/* <ChatRoomHeaderComponent
                  path={imageItem}
                  title={'Vespa Matic'}
                  status={'Available'}
                  price="120000"
                  rate={4.5}
               />
               <View style={addStyles.layoutChat}>
                  {listChat.map(item => {
                     return (
                        <View style={addStyles.layoutChatComponent}>
                           <ChatRoomComponent
                              chat={item.chat}
                              isSender={item.isSender}
                              isRead={item.isRead}
                              time={item.time}
                           />
                        </View>
                     );
                  })}
               </View> */}
         </View>
         <View style={addStyles.layoutInputChat}>
            <Container>
               <View style={{position: 'relative'}}>
                  <CInput
                     classInput={addStyles.inputChat}
                     placeholder="Type Message"
                  />
                  <TouchableOpacity>
                     <IconCamera name="camera" style={addStyles.iconCamera} />
                  </TouchableOpacity>
               </View>
            </Container>
         </View>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutNavigate: {
      backgroundColor: stylePrimary.mainColor,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
   },
   layoutContainer: {
      flex: 1,
      left: 0,
      bottom: 0,
      right: 0,
   },
   textNavigate: {
      color: stylePrimary.secondaryColor,
      fontSize: 18,
   },
   iconNavigate: {
      color: stylePrimary.secondaryColor,
      marginRight: 10,
      fontSize: 24,
   },
   layoutChat: {
      marginTop: 20,
   },
   layoutChatComponent: {
      marginBottom: 10,
   },
   layoutInputChat: {
      marginBottom: 20,
   },
   iconCamera: {
      color: stylePrimary.mainColor,
      fontSize: 20,
      position: 'absolute',
      right: 19,
      bottom: 15,
   },
   inputChat: {
      backgroundColor: stylePrimary.backgrorund,
      borderColor: stylePrimary.mainColor,
      borderWidth: 1,
      // opacity: 0.1,
      borderRadius: 10,
      height: 50,
      marginRight: 10,
      paddingLeft: 10,
      width: '100%',
      color: stylePrimary.secondaryColor,
   },
});
export {addStyles};

export default ChatRoom;

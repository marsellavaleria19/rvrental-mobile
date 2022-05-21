import React from 'react';
import {Center, Modal, Spinner} from 'native-base';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import CButton from './Button';
import {useState} from 'react';
import stylePrimary from '../assets/styles/stylePrimary';
import IconError from 'react-native-vector-icons/Entypo';

function NBModalError({show, message, close}) {
   return (
      <Modal isOpen={show} onClose={close}>
         <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header style={addStyles.layoutModalHeader} />
            <Modal.Body style={addStyles.layoutModalBody}>
               <View>
                  <IconError
                     name="circle-with-cross"
                     style={addStyles.IconError}
                  />
                  <Text style={addStyles.textTitle}>Error</Text>
                  <Text style={addStyles.textMessage}>{message}</Text>
               </View>
            </Modal.Body>
         </Modal.Content>
      </Modal>
   );
}

const addStyles = StyleSheet.create({
   buttonCancel: {
      backgroundColor: 'gray',
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 100,
      borderRadius: 10,
   },
   layoutModalHeader: {
      backgroundColor: stylePrimary.mainColor,
      height: 45,
   },
   textHeader: {
      backgroundColor: 'white',
      color: 'red',
      fontSize: 10,
   },
   layoutModalBody: {
      backgroundColor: stylePrimary.background,
   },
   textTitle: {
      fontSize: 20,
      marginBottom: 5,
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
      textAlign: 'center',
   },
   textMessage: {
      fontSize: 16,
      marginLeft: 15,
      color: stylePrimary.mainColor,
      textAlign: 'center',
   },
   IconError: {
      color: stylePrimary.mainColor,
      fontSize: 40,
      textAlign: 'center',
      marginBottom: 10,
   },
});

export default NBModalError;

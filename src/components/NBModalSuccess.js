import React from 'react';
import {Center, Modal, Spinner} from 'native-base';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import CButton from './Button';
import {useState} from 'react';
import stylePrimary from '../assets/styles/stylePrimary';
import IconSuccess from 'react-native-vector-icons/FontAwesome';

function NBModalSuccess({show, message, button = null, functionHandle, close}) {
   return (
      <Modal isOpen={show} onClose={close}>
         <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header style={addStyles.layoutModalHeader} />
            <Modal.Body style={addStyles.layoutModalBody}>
               <View>
                  <IconSuccess
                     name="check-circle"
                     style={addStyles.iconSuccess}
                  />
                  <Text style={addStyles.textTitle}>Success</Text>
                  <Text style={addStyles.textMessage}>{message}</Text>
               </View>
            </Modal.Body>
            {button !== null && (
               <Modal.Footer style={addStyles.layoutModalFooter}>
                  <TouchableOpacity onPress={functionHandle}>
                     <CButton
                        classButton={addStyles.button}
                        textButton={addStyles.fontButton}>
                        {button}
                     </CButton>
                  </TouchableOpacity>
               </Modal.Footer>
            )}
         </Modal.Content>
      </Modal>
   );
}

const addStyles = StyleSheet.create({
   button: {
      backgroundColor: stylePrimary.mainColor,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 35,
      paddingHorizontal: 10,
      borderRadius: 10,
   },
   fontButton: {
      fontSize: 12,
      color: stylePrimary.secondaryColor,
      fontWeight: '700',
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
   layoutModalFooter: {
      backgroundColor: stylePrimary.background,
      borderTopColor: stylePrimary.mainColor,
      borderTopWidth: 1,
      height: 55,
   },
   textTitle: {
      fontSize: 20,
      marginBottom: 5,
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
      textAlign: 'center',
   },
   textMessage: {
      fontSize: 14,
      marginLeft: 5,
      color: stylePrimary.mainColor,
      textAlign: 'center',
   },
   iconSuccess: {
      color: stylePrimary.mainColor,
      fontSize: 40,
      textAlign: 'center',
      marginBottom: 5,
   },
});

export default NBModalSuccess;

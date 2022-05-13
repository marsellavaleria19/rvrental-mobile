import React from 'react';
import {Center, Modal, Button} from 'native-base';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import CButton from './Button';
import {useState} from 'react';
import stylePrimary from '../assets/styles/stylePrimary';
import IconWarning from 'react-native-vector-icons/FontAwesome';

function NBModalConfirmation({
   show,
   message,
   button = null,
   functionHandle,
   functionClose,
   isButtonCancel = false,
   close,
}) {
   return (
      <Modal isOpen={show} onClose={close}>
         <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header style={addStyles.layoutModalHeader} />
            <Modal.Body style={addStyles.layoutModalBody}>
               <View>
                  <IconWarning
                     name="exclamation-circle"
                     style={addStyles.iconWarn}
                  />
                  <Text style={addStyles.textTitle}>Are you sure?</Text>
                  <Text style={addStyles.textMessage}>{message}</Text>
               </View>
            </Modal.Body>
            {button !== null && (
               <Modal.Footer style={addStyles.layoutModalFooter}>
                  <Button.Group space={2}>
                     {isButtonCancel == true && (
                        <TouchableOpacity onPress={functionClose}>
                           <CButton
                              classButton={addStyles.buttonCancel}
                              textButton={addStyles.fontButtonCancel}>
                              Cancel
                           </CButton>
                        </TouchableOpacity>
                     )}
                     <TouchableOpacity onPress={functionHandle}>
                        <CButton
                           classButton={addStyles.button}
                           textButton={addStyles.fontButton}>
                           {button}
                        </CButton>
                     </TouchableOpacity>
                  </Button.Group>
               </Modal.Footer>
            )}
         </Modal.Content>
      </Modal>
   );
}

const addStyles = StyleSheet.create({
   button: {
      backgroundColor: stylePrimary.secondaryColor,
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 100,
      borderRadius: 10,
   },
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
   fontButton: {
      fontSize: 14,
      color: stylePrimary.mainColor,
      fontWeight: '700',
   },
   fontButtonCancel: {
      fontSize: 14,
      color: stylePrimary.mainColor,
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
      height: 70,
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
   iconWarn: {
      color: stylePrimary.mainColor,
      fontSize: 40,
      textAlign: 'center',
      marginBottom: 5,
   },
});

export default NBModalConfirmation;

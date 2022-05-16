import React from 'react';
import {Center, Modal, Spinner, Button} from 'native-base';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import CButton from './Button';
import {useState} from 'react';
import stylePrimary from '../assets/styles/stylePrimary';
import IconSuccess from 'react-native-vector-icons/FontAwesome';

function NBModal({
   show,
   button = null,
   title,
   functionHandle,
   close,
   children,
   isButtonCancel = false,
   functionClose,
}) {
   return (
      <Modal isOpen={show} onClose={close}>
         <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header style={addStyles.layoutModalHeader}>
               <Text style={addStyles.textHeader}>{title}</Text>
            </Modal.Header>
            <Modal.Body style={addStyles.layoutModalBody}>
               {children}
            </Modal.Body>
            {button !== null && (
               <Modal.Footer style={addStyles.layoutModalFooter}>
                  {/* <TouchableOpacity onPress={functionHandle}>
                    <CButton
                       classButton={addStyles.button}
                       textButton={addStyles.fontButton}>
                       {buttonTitile}
                    </CButton>
                 </TouchableOpacity> */}
                  {isButtonCancel == true ? (
                     <Button.Group space={2}>
                        <TouchableOpacity />
                        <TouchableOpacity onPress={functionClose}>
                           <CButton
                              classButton={addStyles.buttonCancel}
                              textButton={addStyles.fontButton}>
                              Cancel
                           </CButton>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={functionHandle}>
                           <CButton
                              classButton={addStyles.button}
                              textButton={addStyles.fontButton}>
                              {button}
                           </CButton>
                        </TouchableOpacity>
                     </Button.Group>
                  ) : (
                     <TouchableOpacity onPress={functionHandle}>
                        <CButton
                           classButton={addStyles.button}
                           textButton={addStyles.fontButton}>
                           {button}
                        </CButton>
                     </TouchableOpacity>
                  )}
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
      width: '100%',
      borderRadius: 10,
      paddingHorizontal: 10,
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
   },
   textHeader: {
      color: stylePrimary.background,
      fontWeight: stylePrimary.bold,
      fontSize: 16,
   },
   layoutModalBody: {
      backgroundColor: stylePrimary.background,
      paddingBottom: 20,
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
   iconSuccess: {
      color: stylePrimary.mainColor,
      fontSize: 40,
      textAlign: 'center',
      marginBottom: 5,
   },
});

export default NBModal;

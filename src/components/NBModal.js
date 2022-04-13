import React from 'react';
import {Modal, FormControl, Button, Input} from 'native-base';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import CButton from './Button';
import {useState} from 'react';
import stylePrimary from '../assets/styles/stylePrimary';

const NBModal = ({
   show,
   functionClose,
   children,
   title,
   functionHandle,
   isButton = false,
   isButtonCancel = false,
   buttonTitile,
}) => {
   console.log('masuk di komponen modal');
   console.log(show);
   return (
      <Modal isOpen={show} onClose={functionClose}>
         <Modal.Content maxWidth="400px">
            <Modal.CloseButton style={addStyles.textHeader} />
            <Modal.Header style={addStyles.layoutModalHeader}>
               <Text style={addStyles.textHeader}>{title}</Text>
            </Modal.Header>
            <Modal.Body style={addStyles.layoutModalBody}>
               {children}
            </Modal.Body>
            {isButton == true && (
               <Modal.Footer style={addStyles.layoutModalBody}>
                  {/* <TouchableOpacity onPress={functionHandle}>
                     <CButton
                        classButton={addStyles.button}
                        textButton={addStyles.fontButton}>
                        {buttonTitile}
                     </CButton>
                  </TouchableOpacity> */}
                  <Button.Group space={2}>
                     <TouchableOpacity />
                     {isButtonCancel == true && (
                        <TouchableOpacity onPress={functionClose}>
                           <CButton
                              classButton={addStyles.buttonCancel}
                              textButton={addStyles.fontButton}>
                              Cancel
                           </CButton>
                        </TouchableOpacity>
                     )}
                     <TouchableOpacity>
                        <CButton
                           classButton={addStyles.button}
                           textButton={addStyles.fontButton}>
                           {buttonTitile}
                        </CButton>
                     </TouchableOpacity>
                  </Button.Group>
               </Modal.Footer>
            )}
         </Modal.Content>
      </Modal>
   );
};

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
   },
   textHeader: {
      color: stylePrimary.secondaryColor,
      fontWeight: stylePrimary.bold,
      fontSize: 16,
   },
   layoutModalBody: {
      backgroundColor: stylePrimary.background,
   },
});

export default NBModal;

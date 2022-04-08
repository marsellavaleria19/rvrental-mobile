import React from 'react';
import {Modal, FormControl, Button, Input} from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CButton from './Button';
import {useState} from 'react';
import stylePrimary from '../assets/styles/stylePrimary';

const NBModal = ({
   show,
   functionClose,
   children,
   title,
   functionHandle,
   buttonTitile,
}) => {
   return (
      <Modal isOpen={show} onClose={functionClose}>
         <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
               <TouchableOpacity onPress={functionHandle}>
                  <CButton
                     classButton={addStyles.button}
                     textButton={addStyles.fontButton}>
                     {buttonTitile}
                  </CButton>
               </TouchableOpacity>
               {/* <Button.Group space={2}>
                  <Button
                     variant="ghost"
                     colorScheme="blueGray"
                     onPress={() => {
                        setShowModal(false);
                     }}>
                     Cancel
                  </Button>
                  <Button
                     onPress={() => {
                        setShowModal(false);
                     }}>
                     Save
                  </Button>
               </Button.Group> */}
            </Modal.Footer>
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
   fontButton: {
      fontSize: 14,
      color: stylePrimary.mainColor,
      fontWeight: '700',
   },
});

export default NBModal;

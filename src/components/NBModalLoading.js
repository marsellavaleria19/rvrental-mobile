import React from 'react';
import {Modal, Spinner} from 'native-base';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import CButton from './Button';
import {useState} from 'react';
import stylePrimary from '../assets/styles/stylePrimary';

function NBModalLoading({children}) {
   const [showModal, setShowModal] = useState(true);
   return (
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
         <Modal.Content maxWidth="400px">
            <Modal.CloseButton style={addStyles.textHeader} />
            <Modal.Header style={addStyles.layoutModalHeader}>
               <Text style={addStyles.textHeader}>Loading</Text>
            </Modal.Header>
            <Modal.Body style={addStyles.layoutModalBody}>
               <View style={addStyles.wrapSpinnerText}>
                  <Spinner
                     accessibilityLabel="Loading posts"
                     size="lg"
                     color="cyan.900"
                  />
                  <Text style={addStyles.textLoading}>Loading...</Text>
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
   },
   textHeader: {
      color: stylePrimary.secondaryColor,
      fontWeight: stylePrimary.bold,
      fontSize: 16,
   },
   layoutModalBody: {
      backgroundColor: stylePrimary.background,
   },
   wrapSpinnerText: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   textLoading: {
      fontSize: 20,
      marginLeft: 15,
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
   },
});

export default NBModalLoading;

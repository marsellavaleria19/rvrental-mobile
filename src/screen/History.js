import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import stylePrimary from '../assets/styles/stylePrimary';
import ListHistory from '../components/ListHistory';
import image from '../assets/images/background-reservation.png';
import {FlatList, ScrollView} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
   deleteHistory,
   getListHistory,
   getListHistoryByUserId,
} from '../redux/actions/history';
import {useEffect, useState} from 'react';
import moment from 'moment';
import CButton from '../components/Button';
import NBModalLoading from '../components/NBModalLoading';
import NBModalError from '../components/NBModalError';
import NBModalSuccess from '../components/NBModalSuccess';
import NBModalConfirmation from '../components/NBModalConfirmation';
import {keyExtractor} from 'react-native/Libraries/Lists/VirtualizeUtils';

const History = ({navigation}) => {
   const {history, auth} = useSelector(state => state);
   const [listHistory, setListHistory] = useState([]);
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const handleCloseModalDelete = () => setShowModalDelete(false);
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   const [messageSuccess, setMessageSuccess] = useState('');
   const [dataHistory, setDataHistory] = useState(null);
   const [idHistoryChosen, setIdHistoryChosen] = useState(null);
   const [marginLeftCustom, setMarginLeftCustom] = useState(0);

   // useEffect(() => {
   //    if (auth.token !== 'admin') {
   //       dispatch(getListHistoryByUserId(auth.token, auth.user.id));
   //    } else {
   //       dispatch(getListHistory(auth.token));
   //    }
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, []);

   useEffect(() => {
      setShowModalLoading(history.isLoading);
      if (history.isLoading == false && control == true) {
         if (history.isError) {
            setMessageError(history.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccess(history.message);
            setShowModalSuccess(true);
            if (auth.token !== 'admin') {
               dispatch(getListHistoryByUserId(auth.token, auth.user.id));
            } else {
               dispatch(getListHistory(auth.token));
            }
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [history.isLoading]);

   const showButtonDelete = item => {
      if (idHistoryChosen == item.id) {
         return (
            <TouchableOpacity onPress={() => buttonDeleteHandle(item)}>
               <CButton classButton={addStyles.buttonDelete}>
                  <IconFontAwesome name="trash-o" style={addStyles.iconTrash} />
               </CButton>
            </TouchableOpacity>
         );
      }
   };

   const buttonDeleteHandle = item => {
      setShowModalDelete(true);
      setDataHistory(item);
   };

   const deleteItemHandle = id => {
      dispatch(deleteHistory(auth.token, id));
      setControl(true);
      setShowModalDelete(false);
   };

   return (
      <View style={styles.background}>
         <Container>
            <NBModalLoading show={showModalLoading} />
            {messageError !== '' && (
               <NBModalError
                  show={showModalError}
                  message={messageError}
                  close={handleCloseModalError}
               />
            )}
            {messageSuccess !== '' && (
               <NBModalSuccess
                  show={showModalSuccess}
                  message={messageSuccess}
                  close={handleCloseModalSuccess}
               />
            )}
            <ScrollView>
               <NBModalConfirmation
                  show={showModalDelete}
                  functionClose={handleCloseModalDelete}
                  close={handleCloseModalDelete}
                  button={'Delete'}
                  isButtonCancel={true}
                  functionHandle={() => deleteItemHandle(dataHistory.id)}
                  message={
                     'Do you really want to delete this data? This data cannot restore.'
                  }
               />
               <View style={addStyles.layoutToday}>
                  <Text style={addStyles.fontTitle}>Today</Text>
                  <View style={addStyles.listToday}>
                     <Text style={addStyles.textToday}>
                        Please finish your payment for vespa for Vespa Rental
                        Jogja
                     </Text>
                     <IconFontAwesome
                        name="chevron-right"
                        style={addStyles.iconChevron}
                     />
                  </View>
                  <View style={addStyles.listToday}>
                     <Text style={addStyles.textToday}>
                        Your payment for a vintage bike at Jogja just confirmed!
                     </Text>
                  </View>
               </View>
               <View style={addStyles.layoutWeek}>
                  <Text style={addStyles.title}>A Week Ago</Text>
               </View>
               <FlatList
                  data={history.listHistory}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                     return (
                        <TouchableOpacity
                           onPress={() => {
                              if (idHistoryChosen !== item.id) {
                                 setIdHistoryChosen(item.id);
                              } else {
                                 setIdHistoryChosen();
                              }
                           }}>
                           <View style={addStyles.layoutListHistory}>
                              <ListHistory
                                 path={
                                    item.photo !== null
                                       ? {uri: `${item.photo}`}
                                       : image
                                 }
                                 marginLeft={
                                    item.id == idHistoryChosen ? -50 : 0
                                 }
                                 title={item.brand}
                                 reservationDate={`${moment(
                                    item.rentStartDate,
                                 ).format('MMM DD')} to ${moment(
                                    item.rentEndDate,
                                 ).format('MMM DD YYYY')}`}
                                 payment={item.prepayment}
                                 status={item.status}
                                 isHistory={true}
                              />
                              {showButtonDelete(item)}
                           </View>
                        </TouchableOpacity>
                     );
                  }}
               />
            </ScrollView>
         </Container>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutToday: {
      marginTop: 30,
   },
   layoutListHistory: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   listToday: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#DADADA',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   fontTitle: {
      fontSize: 14,
      color: stylePrimary.secondaryColor,
      fontWeight: '600',
      marginBottom: 13,
   },
   iconChevron: {
      fontSize: 14,
      color: '#999999',
   },
   textToday: {
      fontSize: 12,
      color: stylePrimary.mainColor,
      fontWeight: '400',
   },
   layoutWeek: {
      marginTop: 30,
      marginBottom: 18,
   },
   layoutHistory: {
      flexDirection: 'row',
   },
   buttonDelete: {
      backgroundColor: stylePrimary.secondaryColor,
      width: 51,
      height: 38,
      paddingVertical: 5,
      borderRadius: 10,
      alignItems: 'center',
   },
   iconTrash: {
      fontSize: 24,
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
   },
});

export {addStyles};

export default History;

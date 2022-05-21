import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container';
import stylePrimary from '../assets/styles/stylePrimary';
import ListHistory from '../components/ListHistory';
import image from '../assets/images/background-reservation.png';
import {FlatList, Checkbox} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {deleteHistory, deleteListHistory} from '../redux/actions/history';
import {useEffect, useState} from 'react';
import moment from 'moment';
import NBModalLoading from '../components/NBModalLoading';
import NBModalError from '../components/NBModalError';
import NBModalSuccess from '../components/NBModalSuccess';
import NBModalConfirmation from '../components/NBModalConfirmation';
import {
   getListHistoryByUserId,
   getListHistory,
   getNextListHistory,
} from '../redux/actions/history';

const History = ({navigation}) => {
   const {history, auth} = useSelector(state => state);
   var [listDeleteHistory, setListDeleteHistory] = useState([]);
   const dispatch = useDispatch();
   const [control, setControl] = useState(false);
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleCloseModalSuccess = () => setShowModalSuccess(false);
   const [showModalError, setShowModalError] = useState(false);
   const handleCloseModalError = () => setShowModalError(false);
   const [showModalLoading, setShowModalLoading] = useState(false);
   const [messageError, setMessageError] = useState('');
   const [messageSuccess, setMessageSuccess] = useState('');
   const [selectDelete, setSelectDelete] = useState('Select');
   const [dataHistory, setDataHistory] = useState(null);
   const [check, setCheck] = useState(false);

   useEffect(() => {
      setListDeleteHistory([]);
      dispatch({
         type: 'CLEAR_HISTORY',
      });
      if (auth.user.role !== 'admin') {
         dispatch(getListHistoryByUserId(auth.token, auth.user.id));
      } else {
         dispatch(getListHistory(auth.token));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      setShowModalLoading(history.isLoading);
      if (history.isLoading == false && control == true) {
         if (history.isError) {
            setMessageError(history.errMessage);
            setShowModalError(true);
         } else {
            setMessageSuccess(history.message);
            setSelectDelete('Select');
            setShowModalSuccess(true);
            if (auth.user.role !== 'admin') {
               dispatch(getListHistoryByUserId(auth.token, auth.user.id));
            } else {
               dispatch(getListHistory(auth.token));
            }
            setControl(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [history.isLoading]);

   const handleCloseModalDelete = () => {
      // setIsChecked(false);
      setShowModalDelete(false);
   };

   const nextPageHandle = page => {
      if (page.next !== null) {
         dispatch(getNextListHistory(auth.token, page.next));
      }
   };

   const handleCheck = (item, isChecked) => {
      let itemIndex = listDeleteHistory.findIndex(value => value.id == item.id);
      if (isChecked) {
         listDeleteHistory.push(item);
      } else {
         if (itemIndex !== -1) {
            listDeleteHistory.splice(itemIndex, 1);
         }
      }
      setListDeleteHistory(listDeleteHistory);
      if (listDeleteHistory.length > 0) {
         setSelectDelete('Delete');
      } else {
         setSelectDelete('Select');
      }
   };

   const deleteItemHandle = () => {
      // var indx = 0;
      // listDeleteHistory.forEach((item, index) => {
      //    dispatch(deleteHistory(auth.token, item.id));
      //    indx = index;
      // });
      // if (indx == listDeleteHistory.length - 1) {
      //    setControl(true);
      //    setShowModalDelete(false);
      // }

      dispatch(deleteListHistory(auth.token, listDeleteHistory));
      listDeleteHistory.splice(0, listDeleteHistory.length);
      setListDeleteHistory(listDeleteHistory);
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
            <NBModalConfirmation
               show={showModalDelete}
               functionClose={handleCloseModalDelete}
               close={handleCloseModalDelete}
               button={'Delete'}
               isButtonCancel={true}
               functionHandle={deleteItemHandle}
               message={'Are you sure to delete the selected history?'}
            />
            <View style={addStyles.layoutHistory}>
               <Text style={addStyles.title}>History Order</Text>
               <View style={addStyles.layoutWeek}>
                  <View style={addStyles.layoutTitleWeek}>
                     <Text style={addStyles.textWeek}>A Week Ago</Text>
                     {selectDelete == 'Delete' ? (
                        <TouchableOpacity
                           onPress={() => setShowModalDelete(true)}>
                           <Text style={addStyles.textSelect}>
                              {selectDelete}
                           </Text>
                        </TouchableOpacity>
                     ) : (
                        <Text style={addStyles.textSelect}>
                           {' '}
                           {selectDelete}
                        </Text>
                     )}
                  </View>
               </View>
               <FlatList
                  data={history.listHistory}
                  renderItem={({item, index}) => {
                     return (
                        <View style={addStyles.layoutListHistory}>
                           <ListHistory
                              path={
                                 item.photo !== null
                                    ? {uri: `${item.photo}`}
                                    : image
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
                           <View>
                              <Checkbox
                                 name={item.name}
                                 onChange={isChecked =>
                                    handleCheck(item, isChecked)
                                 }
                              />
                           </View>
                        </View>
                     );
                  }}
                  onEndReached={() => nextPageHandle(history.pageInfo)}
                  onEndReachedThreshold={0.5}
               />
            </View>

            {/* <ScrollView>
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
                        <View>
                           <ListHistory
                              path={
                                 item.photo !== null
                                    ? {uri: `${item.photo}`}
                                    : image
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
                           <TouchableOpacity
                              onPress={() => buttonDeleteHandle(item)}>
                              <CButton classButton={addStyles.buttonDelete}>
                                 <IconFontAwesome
                                    name="trash-o"
                                    style={addStyles.iconTrash}
                                 />
                              </CButton>
                           </TouchableOpacity>
                        </View>
                     );
                  }}
               />
            </ScrollView> */}
         </Container>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutWeek: {
      marginTop: 30,
      marginBottom: 18,
   },
   layoutTitleWeek: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   layoutHistory: {
      marginVertical: 20,
   },
   title: {
      color: stylePrimary.mainColor,
      fontSize: 38,
      textAlign: 'center',
      fontWeight: stylePrimary.bold,
   },
   textWeek: {
      fontSize: 14,
      color: stylePrimary.secondaryColor,
      fontWeight: '400',
      alignSelf: 'center',
   },
   textSelect: {
      fontSize: 14,
      color: stylePrimary.secondaryColor,
      fontWeight: '400',
      textAlign: 'right',
   },
   layoutListHistory: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
});

export {addStyles};

export default History;

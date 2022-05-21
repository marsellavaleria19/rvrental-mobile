import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ListMenu from '../../components/ListMenu';
import Container from '../../components/Container';
import stylePrimary from '../../assets/styles/stylePrimary';
import CButton from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import imageProfile from '../../assets/images/profile.png';
import {FlatList, Image} from 'native-base';
import {styles} from '../../assets/styles/styles';
import {getListMenu} from '../../redux/actions/menu';
import {ScrollView} from 'native-base';
import PushNotificationHandler from '../../helpers/PushNotificationHelper';

const ProfileMenuList = ({navigation}) => {
   const {auth, menu} = useSelector(state => state);
   const [listMenu, setListMenu] = useState([
      {id: 1, title: 'Your Favorite', navigate: 'Favorite'},
      {id: 2, title: 'FAQ', navigate: ''},
      {id: 3, title: 'Help', navigate: ''},
      {id: 4, title: 'Update Profile', navigate: 'UpdateProfile'},
      {id: 5, title: 'Change Password', navigate: 'ChangePassword'},
   ]);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getListMenu(auth.user.isVerified, listMenu));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch]);

   const logoutHandle = () => {
      dispatch({
         type: 'LOGOUT',
      });

      if (auth.token == null) {
         navigation.navigate('Login');
      }
   };

   return (
      <View style={styles.background}>
         <View style={addStyles.layoutProfileMenu}>
            <FlatList
               ListHeaderComponent={
                  <View style={addStyles.layoutProfile}>
                     <Image
                        size={60}
                        resizeMode={'contain'}
                        borderRadius={100}
                        source={
                           auth.user !== null && auth.user?.photo !== null
                              ? {
                                   uri: `${auth.user?.photo}`,
                                }
                              : `${imageProfile}`
                        }
                        alt="Profile"
                     />
                     <Text style={addStyles.textProfile}>
                        {auth.user?.fullName}
                     </Text>
                  </View>
               }
               data={menu.listMenu}
               renderItem={({item}) => {
                  return (
                     <Container key={item.title}>
                        <ListMenu
                           title={item.title}
                           press={() => navigation.navigate(item.navigate)}
                        />
                     </Container>
                  );
               }}
            />
            {/* <View style={addStyles.layoutProfile}>
               <Image
                  size={60}
                  resizeMode={'contain'}
                  borderRadius={100}
                  source={
                     auth.user !== null && auth.user?.photo !== null
                        ? {
                             uri: `${auth.user?.photo}`,
                          }
                        : `${imageProfile}`
                  }
                  alt="Profile"
               />
               <Text style={addStyles.textProfile}>{auth.user?.fullName}</Text>
            </View>
            <ScrollView h="70%" style={addStyles.scrollMenu}>
               <Container>
                  <ListMenu
                     title="Your Favorite"
                     press={() => navigation.navigate('Favorite')}
                  />
                  <ListMenu title="FAQ" />
                  <ListMenu title="Help" />
                  <ListMenu
                     title="Update Profile"
                     press={() => navigation.navigate('UpdateProfile')}
                  />
                  <ListMenu
                     title="Verify User"
                     press={() => navigation.navigate('VerifyUserEmail')}
                  />
                  <ListMenu
                     title="Test notif"
                     press={() =>
                        PushNotificationHandler(
                           'test-notif',
                           'test-notif',
                           'Test Notification',
                        )
                     }
                  />
                  <View style={addStyles.layoutButton}>
                     <TouchableOpacity onPress={logoutHandle}>
                        <CButton
                           classButton={addStyles.buttonProfile}
                           textButton={addStyles.fontButtonProfile}>
                           Logout
                        </CButton>
                     </TouchableOpacity>
                  </View>
               </Container>
            </ScrollView> */}
         </View>
         <View style={addStyles.layoutButton}>
            <Container>
               <TouchableOpacity onPress={logoutHandle}>
                  <CButton
                     classButton={addStyles.buttonProfile}
                     textButton={addStyles.fontButtonProfile}>
                     Logout
                  </CButton>
               </TouchableOpacity>
            </Container>
         </View>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutProfileMenu: {
      marginTop: 0,
      flex: 1,
   },
   layoutProfile: {
      flexDirection: 'row',
      height: 90,
      backgroundColor: stylePrimary.secondaryColor,
      width: '100%',
      paddingTop: 21,
      paddingBottom: 11,
      alignItems: 'center',
      paddingHorizontal: 18,
      marginBottom: 36,
   },
   textProfile: {
      marginLeft: 27,
      color: stylePrimary.mainColor,
      fontWeight: stylePrimary.bold,
      fontSize: 22,
   },
   flexRow: {
      flexDirection: 'row',
   },
   layoutButton: {
      margin: 20,
   },
   buttonProfile: {
      backgroundColor: stylePrimary.secondaryColor,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 57,
      borderRadius: 10,
   },
   fontButtonProfile: {
      fontSize: 24,
      color: stylePrimary.mainColor,
      fontWeight: '800',
   },
});

export {addStyles};
export default ProfileMenuList;

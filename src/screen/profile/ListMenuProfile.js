import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
} from 'react-native';
import ListMenu from '../../components/ListMenu';
import Container from '../../components/Container';
import stylePrimary from '../../assets/styles/stylePrimary';
import CButton from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';

const ProfileMenuList = ({navigation}) => {
   const {auth} = useSelector(state => state);
   const dispatch = useDispatch();

   const logoutHandle = () => {
      dispatch({
         type: 'LOGOUT',
      });

      if (auth.token == null) {
         navigation.navigate('Login');
      }
   };

   return (
      <View style={addStyles.layoutProfileMenu}>
         <ScrollView>
            <Container>
               <ListMenu title="Your Favorite" />
               <ListMenu title="FAQ" />
               <ListMenu title="Help" />
               <ListMenu
                  title="Update Profile"
                  press={() => navigation.navigate('UpdateProfile')}
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
         </ScrollView>
      </View>
   );
};

const addStyles = StyleSheet.create({
   layoutProfileMenu: {
      marginTop: 100,
   },
   flexRow: {
      flexDirection: 'row',
   },
   layoutButton: {
      marginTop: 299,
      marginBottom: 20,
   },
   buttonProfile: {
      backgroundColor: stylePrimary.secondaryColor,
      marginTop: 10,
      marginBottom: 10,
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

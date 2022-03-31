import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground,Image } from 'react-native';
import {styles} from '../assets/styles/styles';
import Container from '../components/Container'
import Input from '../components/Input'
import CButton from '../components/Button'
import stylePrimary from '../assets/styles/stylePrimary'
import {input,button} from '../assets/styles/styleComponent'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainBarTitle from '../components/mainBarTitle'
import ListBar from '../components/ListBar'
import imageBackground from '../assets/images/background-reservation.png'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Rate from '../components/Rate'

const Reservation = ()=>{
  return (
    <View>
      <View>
          <ImageBackground source={imageBackground} resizeMode="cover" style={addStyles.imageBackground}>
            <Container>
                <Ionicons name="chatbubble-sharp" style={addStyles.icon} />
            </Container>
          </ImageBackground>
      </View>
      <Container>
        <View style={addStyles.marginLayout}>
            <View style={addStyles.flexRow}>
            <View>
              <Text style={addStyles.title}>Vespa Matic</Text>
              <Text style={addStyles.price}>Rp. 120.000/day</Text>
            </View>
            <View>
              <View style={[addStyles.flexRow,addStyles.layoutIconRate]}>
                <FontAwesome5 name="heart" style={addStyles.iconHeart}/>
                <Rate rate={4.5}/>
              </View>
            </View>
          </View>
          <View>
            <Text style={addStyles.description}>Max for 2 person</Text>
            <Text style={addStyles.description}>No prepayment</Text>
            <Text style={styles.statusAvailable}>Available</Text>
            <View style={addStyles.layoutLocation}>
              <View style={[addStyles.layoutIconLocation]}>
                 <Ionicons name="md-location" style={addStyles.iconLocation}/>
              </View>
              <Text style={addStyles.fontLocation}>Jalan Maliboboro, No. 21, Yogyakarta</Text>
            </View>
             <View style={addStyles.layoutDistance}>
              <View style={[addStyles.layoutIconLocation]}>
                 <MaterialCommunityIcons name="run" style={addStyles.iconLocation} />
              </View>
              <Text style={addStyles.fontLocation}>3.2 miles from your location</Text>
            </View>
            <View style={addStyles.layoutQtyBikes}>
              <Text style={addStyles.fontLabel}>Select bikes</Text>
              <View style={addStyles.layoutQty}>
                <CButton classButton={addStyles.button} textButton={addStyles.text}>-</CButton>
                <Input classInput={addStyles.inputQty} value={0}/>
                <CButton classButton={addStyles.button} textButton={addStyles.text}>+</CButton>
              </View>
            </View>
          </View>
          <View style={addStyles.layoutForm}>
            <Input classInput={addStyles.inputDate} placeholder="Date"/>
            <Input classInput={addStyles.inputDay} placeholder="Day"/>
          </View>
        </View>
        <View style={addStyles.layoutButton}>
           <CButton classButton={addStyles.buttonChat} textButton={addStyles.fontButtonChat}>Chat Admin</CButton>
          <CButton classButton={addStyles.buttonReservation} textButton={addStyles.fontButtonReservation}>Reservation</CButton>
        </View>
      </Container>
    </View>
 
  )
}

const addStyles = StyleSheet.create({
  imageBackground:{
    height:300
  },
  iconHeart:{
    color:'black',
    fontWeight:700,
    fontSize:30,
    marginRight:10
  },
  layoutIconRate:{
    alignSelf: "flex-end",
    marginRight:30
  },
  iconLocation:{
  color: 'orange',
  fontSize:20
  },
  flexRow:{
    flexDirection:'row'
  },
  title:{
    fontSize:24,
    fontWeight:700
  },
  price:{
    fontSize:24,
    fontWeight:700
  },
  marginLayout:{
    marginTop:12
  },
  description:{
    fontSize:16
  },
  layoutIconLocation:{
    width:38,
    height:38,
    background: 'linear-gradient(91.97deg, rgba(255, 199, 167, 0.2) 14.73%, rgba(255, 213, 121, 0.2) 97.52%)',
    borderRadius: 5,
    padding:7
  },
  layoutLocation:{
    marginTop:30,
    flexDirection:'row',
    alignItems:'center'
  },
  layoutDistance:{
    marginTop:20,
    flexDirection:'row',
    alignItems:'center'
  },
  fontLocation:{
    fontSize:16,
    color: 'gray',
    marginStart:10
  },
  layoutQtyBikes:{
    marginTop:32,
    flexDirection:'row',
    alignItems:'center'
  },
  layoutQty:{
    flexDirection:'row',
    alignItems:'center'
  },
  fontLabel:{
    fontWeight:700,
    fontSize:16,
    marginRight:80
  },
  button:{
    backgroundColor:stylePrimary.secondaryColor,
    width:21,
    height:21,
    borderRadius:20
  },
  text:{
   color:stylePrimary.mainColor,
   fontSize:15,
   fontWeight:900,
   textAlign:'center'
  },
  inputQty:{
    width:50,
    color:stylePrimary.mainColor,
    textAlign:'center',
    fontSize:15,
    fontWeight:700
  },
  layoutForm:{
    marginTop:28,
    flexDirection:'row'
  },
  inputDate:{
    background: 'rgba(57, 57, 57, 0.3)',
    // opacity: 0.1,
    borderRadius: 10,
    width:160,
    height:50,
    paddingLeft:10,
    marginRight:10
  },
  inputDay:{
    background: 'rgba(57, 57, 57, 0.3)',
    // opacity: 0.1,
    borderRadius: 10,
    width:100,
    height:50,
    paddingLeft:10
  },
  layoutButton:{
    marginTop:28
  },
 buttonChat:{
    backgroundColor : stylePrimary.mainColor,
    justifyContent:"center",
    alignItems:"center",
    height:66,
    borderRadius:10
  },
  fontButtonChat:{
    fontSize:24,
    color:stylePrimary.secondaryColor,
    fontWeight:700
  },
  buttonReservation:{
    backgroundColor : stylePrimary.secondaryColor,
    marginTop:10,
    justifyContent:"center",
    alignItems:"center",
    height:66,
    borderRadius:10
  },
  fontButtonReservation:{
    fontSize:24,
    color:stylePrimary.mainColor,
    fontWeight:700
  }
});

export { addStyles };



export default Reservation


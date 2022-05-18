import {extendTheme} from 'native-base';
import stylePrimary from './stylePrimary';
import {input} from './styleComponent';

export const theme = extendTheme({
   components: {
      Input: {
         baseStyle: {
            backgroundColor: stylePrimary.background,
            _text: {
               color: stylePrimary.mainColor,
               fontSize: 16,
            },
            // height: 51,
            // px: 5,
         },
         variants: {
            profile: {
               backgroundColor: stylePrimary.background,
               borderBottomWidth: 1,
               borderBottomColor: '#9F9F9F',
               _text: {
                  color: stylePrimary.mainColor,
               },
            },
            verifyUser: {
               backgroundColor: stylePrimary.background,
               borderBottomWidth: 1,
               borderBottomColor: '#9F9F9F',
               marginBottom: 5,
               _text: {
                  color: stylePrimary.mainColor,
               },
            },
            loginSignup: {
               marginTop: 18,
               backgroundColor: 'rgba(180, 180, 180, 0.5)',
               fontSize: stylePrimary.baseFontSize,
               placeholderTextColor: 'white',
               ...input,
            },
            payment: {
               backgroundColor: stylePrimary.background,
               fontSize: 12,
               placeholderTextColor: stylePrimary.secondaryColor,
               borderColor: stylePrimary.mainColor,
               borderWidth: 1,
            },
            item: {
               backgroundColor: stylePrimary.background,
               border: 'none',
               borderBottomWidth: 1,
               borderBottomColor: '#9F9F9F',
               color: stylePrimary.mainColor,
               _text: {
                  textAlign: 'center',
               },
               placeholderTextColor: stylePrimary.secondaryColor,
            },
            updateItemTitle: {
               backgroundColor: stylePrimary.background,
               borderWidth: 0,
               color: stylePrimary.mainColor,
               fontWeight: 700,
               placeholderTextColor: stylePrimary.secondaryColor,
            },
            reservation: {
               _text: {
                  color: stylePrimary.mainColor,
               },
            },
            quantity: {
               width: 10,
               border: 0,
               _text: {
                  color: stylePrimary.mainColor,
               },
            },
         },
      },
      FormControlLabel: {
         baseStyle: {
            _text: {
               fontSize: 12,
               color: stylePrimary.mainColor,
               fontWeight: 700,
            },
         },
         variants: {
            profile: {
               px: 2,
            },
         },
      },
      TextArea: {
         variants: {
            profile: {
               backgroundColor: stylePrimary.background,
               borderWidth: 0,
               borderBottomWidth: 1,
               borderBottomColor: '#9F9F9F',
               _text: {
                  color: 'black',
               },
            },
            item: {
               backgroundColor: stylePrimary.background,
               borderWidth: 0,
               borderBottomWidth: 1,
               borderBottomColor: '#9F9F9F',
               height: 51,
               _text: {
                  color: stylePrimary.mainColor,
               },
               placeholderTextColor: stylePrimary.secondaryColor,
            },
         },
      },
      Radio: {
         baseStyle: {
            _text: {
               color: stylePrimary.mainColor,
               fontSize: 10,
            },
         },
      },
      Select: {
         variants: {
            filter: {
               backgroundColor: stylePrimary.backgrorund,
               borderWidth: 0,
               fontSize: 18,
               fontWeight: '600',
               placeholderTextColor: stylePrimary.mainColor,
               customDropdownIconProps: {color: 'dark.50', mr: '3'},
               padding: 0,
            },
            reservation: {
               backgroundColor: stylePrimary.background,
               borderColor: stylePrimary.mainColor,
               borderWidth: 1,
               // opacity: 0.1,
               borderRadius: 10,
            },
            item: {
               backgroundColor: stylePrimary.background,
               borderColor: stylePrimary.mainColor,
               borderWidth: 1,
               _text: {
                  color: stylePrimary.secondaryColor,
               },
               placeholderTextColor: stylePrimary.secondaryColor,
               // opacity: 0.1,
               borderRadius: 10,
            },
            updateItem: {
               backgroundColor: stylePrimary.background,
               borderColor: stylePrimary.mainColor,
               borderWidth: 0,
               fontSize: 16,
               _text: {
                  color: stylePrimary.secondaryColor,
               },
               placeholderTextColor: stylePrimary.secondaryColor,
               // opacity: 0.1,
               borderRadius: 10,
               // backgroundColor: stylePrimary.background,
               // borderWidth: 0,
               // fontSize: 16,
               // color: 'gray',
               // placeholderTextColor: stylePrimary.secondaryColor,
               // height: 51,
               // _text: {
               //    color: stylePrimary.mainColor,
               // },
               customDropdownIconProps: {
                  display: 'none',
               },
            },
         },
      },
   },
});

import {extendTheme} from 'native-base';
import stylePrimary from './stylePrimary';
import {input} from './styleComponent';

export const theme = extendTheme({
   components: {
      Input: {
         baseStyle: {
            backgroundColor: 'rgba(128, 128, 128, 0.2)',
            height: 51,
            px: 5,
            _text: {
               color: stylePrimary.mainColor,
               fontSize: 16,
            },
         },
         variants: {
            profile: {
               backgroundColor: 'rgba(52, 52, 52, 0.0)',
               borderBottomWidth: 1,
               borderBottomColor: '#9F9F9F',
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
               marginTop: 18,
               backgroundColor: stylePrimary.backgrorund,
               fontSize: stylePrimary.mainColor,
               placeholderTextColor: stylePrimary.mainColor,
               borderColor: stylePrimary.mainColor,
               borderWidth: 1,
            },
            item: {
               backgroundColor: 'rgba(52, 52, 52, 0.0)',
               borderBottomWidth: 1,
               borderBottomColor: '#9F9F9F',
               _text: {
                  color: stylePrimary.mainColor,
                  textAlign: 'center',
               },
            },
            reservation: {
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
               color: '#B8B8B8',
               fontWeight: 700,
            },
         },
         variants: {
            profile: {
               px: 5,
            },
         },
      },
      TextArea: {
         variants: {
            profile: {
               backgroundColor: 'rgba(52, 52, 52, 0.0)',
               border: 'none',
               borderBottomWidth: 1,
               borderBottomColor: '#9F9F9F',
               _text: {
                  color: 'black',
               },
            },
            item: {
               backgroundColor: 'rgba(52, 52, 52, 0.0)',
               borderWidth: 0,
               borderBottomWidth: 1,
               borderBottomColor: '#9F9F9F',
               height: 51,
               _text: {
                  color: stylePrimary.mainColor,
               },
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
               backgroundColor: 'white',
               borderWidth: 0,
               fontSize: 18,
               fontWeight: '600',
               placeholderTextColor: stylePrimary.mainColor,
               customDropdownIconProps: {color: 'dark.50', mr: '3'},
               padding: 0,
            },
            reservation: {
               backgroundColor: stylePrimary.backgrorund,
               borderColor: stylePrimary.mainColor,
               borderWidth: 1,
               // opacity: 0.1,
               borderRadius: 10,
            },
         },
      },
   },
});

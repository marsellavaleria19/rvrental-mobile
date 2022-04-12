import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import History from '../screen/History';
import ChatList from '../screen/ChatList';

const Tab = createMaterialTopTabNavigator();

const HistoryTabNav = () => {
   return (
      <Tab.Navigator>
         <Tab.Screen name="Chat List" component={ChatList} />
         <Tab.Screen
            options={{title: 'History Order'}}
            name="History"
            component={History}
         />
      </Tab.Navigator>
   );
};

export default HistoryTabNav;

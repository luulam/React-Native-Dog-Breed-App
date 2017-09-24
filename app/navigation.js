import React, { Component } from 'react';
import home from './screens/home'
import detail from './screens/detail'
import splash from './screens/splash'
import { StackNavigator } from 'react-navigation';
import { appStyle, color } from './theme'
import constant from './constant'
export default StackNavigator({
    home: {
        screen: home,
        navigationOptions: {
            title: 'Home',
            header: null
        }
    },
    detail: {
        screen: detail,
    },
    splash: {
        screen: splash
    }
}, {
        initialRouteName: 'splash',
        headerMode: 'none',
        cardStyle: {
            backgroundColor: color.bg_app,
        }
    }
);
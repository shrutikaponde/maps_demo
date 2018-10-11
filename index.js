/** @format */
import React from 'react';
import { AppRegistry, Animated, Easing } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { createStackNavigator, CardStackStyleInterpolator } from "react-navigation";
import MapExpanded from "./MapExpanded";

const Navigator = createStackNavigator({
    Home: {
        screen: App
    },
    MapExpanded: {
        screen: MapExpanded
    }
},
    {
        initialRouteName: 'Home',
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
        },
        headerMode: 'float' ,
        transitionConfig: () => ({
            transitionSpec: {
                duration: 550,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [-height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.3, index],
                    outputRange: [0, 0, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    })
AppRegistry.registerComponent(appName, () => Navigator);

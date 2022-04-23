import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from "../pages/CameraScreen";
import Home from "../pages/Home";
import Main from "../pages/Main";

const stackRoutes = createNativeStackNavigator();

const MainPages = () => (
    <stackRoutes.Navigator  >
        <stackRoutes.Screen name="Home" component={Home} />
        <stackRoutes.Screen options={{headerShown: false}} name="CameraScreen" component={CameraScreen} />
        <stackRoutes.Screen options={{headerShown: false}} name="Main" component={Main} />
    </stackRoutes.Navigator>
)
const FirstTimePages = () => (
    <stackRoutes.Navigator  >
        <stackRoutes.Screen options={{headerShown: false}} name="Main" component={Main} />
        <stackRoutes.Screen name="Home" component={Home} />
        <stackRoutes.Screen options={{headerShown: false}} name="CameraScreen" component={CameraScreen} />
    </stackRoutes.Navigator>
)

export { MainPages, FirstTimePages };

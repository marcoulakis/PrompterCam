import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from "../pages/CameraScreen";

const stackRoutes = createNativeStackNavigator();

const BeforeLogin = () => (
    <stackRoutes.Navigator  screenOptions={{ headerShown: false }} headerMode="none">
        <stackRoutes.Screen name="CameraScreen" component={CameraScreen}/>    
    </stackRoutes.Navigator>
)

export default BeforeLogin;

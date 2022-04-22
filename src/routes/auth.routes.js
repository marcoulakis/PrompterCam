import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from "../pages/CameraScreen";
import Home from "../pages/Home";

const stackRoutes = createNativeStackNavigator();

const BeforeLogin = () => (
    <stackRoutes.Navigator  >
        <stackRoutes.Screen name="Home" component={Home} />
        <stackRoutes.Screen options={{headerShown: false}} name="CameraScreen" component={CameraScreen} />  
    </stackRoutes.Navigator>
)

export default BeforeLogin;

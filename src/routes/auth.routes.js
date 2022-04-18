import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from "../pages/CameraScreen";
import PrompterContainer from "../pages/PrompterContainer";

const stackRoutes = createNativeStackNavigator();

const BeforeLogin = () => (
    <stackRoutes.Navigator  screenOptions={{ headerShown: false }} headerMode="none">
        <stackRoutes.Screen name="CameraScreen" component={CameraScreen}/>  
        <stackRoutes.Screen name="PrompterContainer" component={PrompterContainer} />
    </stackRoutes.Navigator>
)

export default BeforeLogin;

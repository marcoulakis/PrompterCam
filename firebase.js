// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";

const app = firebase.initializeApp(firebaseConfig);

import { getAnalytics } from "firebase/analytics";

const analytics = getAnalytics(app);
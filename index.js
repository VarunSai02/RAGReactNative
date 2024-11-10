import { AppRegistry } from "react-native";
import 'intl-pluralrules';
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n/config";



import App from "./App.tsx"; // Ensure this component is compatible with React Native
import { LogBox } from 'react-native';

const Main = () => (
    <I18nextProvider i18n={i18next}>
        <App />
    </I18nextProvider>
);

// Register the main component to run as the app entry point
AppRegistry.registerComponent('NovartisAssistant', () => Main);

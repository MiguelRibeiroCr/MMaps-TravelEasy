import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/Home/home';
import CameraPage from './src/components/TelaCamera';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
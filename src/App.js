import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaImovel from "./views/ListarImovel";
import DetalharImovel from "./views/DetalharImovel";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CompreAP.com">
        <Stack.Screen name="CompreAP.com" component={ListaImovel} />
        <Stack.Screen name="LOGIN" component={DetalharImovel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

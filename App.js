import * as React from "react";
import {
  Button,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
//
// Screens del Primer Stack
//
function ScreenA1() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>HOME</Text>
      <Text style={styles.description}>
        Primer Stack - Primer Screen
        {"\n\n"}
        Boton para navegar a ScreenA2
        {"\n"}
        navigation.navigate('ScreenA2').
        {"\n"}
      </Text>
      <Button
        title="Ir A ScreenA2"
        onPress={() => navigation.navigate("ScreenA2")}
      />
    </View>
  );
}

function ScreenA2() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>HOME - ALGO</Text>
      <Text style={styles.description}>
        Primer Stack - Segunda Screen
        {"\n\n"}
        *Boton para navegar a ScreenA1
        {"\n"}
        navigation.navigate('ScreenA1')
        {"\n"}
      </Text>

      <TouchableOpacity
        title="Ir A ScreenA1"
        onPress={() => navigation.navigate("ScreenA1")}
      >
        <Text>Ir a page 1</Text>
      </TouchableOpacity>
    </View>
  );
}

//
// Screens del Segundo Stack
//
function ScreenB1() {
  const navigation = useNavigation();
  return (
    <View style={styles.searchScreen}>
      <Text style={styles.text}>BUSCADOR</Text>
      <Text style={styles.description}>
        Segundo Stack - Primer Screen
        {"\n\n"}* Botones para navegar a ScreenB2 y ScreenB2 enviando
        Parametros:
        {"\n"}
        navigation.navigate('ScreenB2', {"{itemId: 1k}"}){"\n\n"}* Ejemplo de un
        boton con un Icono de 'Ionicons'
        {"\n"}
      </Text>
      <Button
        title="ScreenB2 itemId: 1"
        onPress={() => navigation.navigate("ScreenB2", { itemId: 1 })}
      />
      <Button
        title="ScreenB2 itemId: 2"
        onPress={() => navigation.navigate("ScreenB2", { itemId: 2 })}
      />
      <TouchableOpacity onPress={() => alert("Presionaste en el Icono!")}>
        <Ionicons name="search" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function ScreenB2({ route }) {
  const { itemId } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.searchScreen}>
      <Text style={styles.text}>BUSCADOR - ITEM</Text>
      <Text style={styles.text}>Parametro recibido {itemId}</Text>
      <Text style={styles.description}>
        Segundo Stack - Segunda Screen
        {"\n\n"}* No hay boton para navegar (ver la barra):
        {"\n"}
      </Text>
    </View>
  );
}

//
// Screens del Tercer Stack
//
function ScreenC1() {
  const navigation = useNavigation();
  return (
    <View style={styles.perfilScreen}>
      <Text style={styles.text}>PERFIL</Text>
      <Text style={styles.description}>
        Tercer Stack - Primer Screen
        {"\n\n"}* Se modifico la Barra, se centro, se puso un boton! (ver la
        barra):
        {"\n"}
      </Text>
      <Button
        title="IR A ScreenC2"
        onPress={() => navigation.navigate("ScreenC2")}
      />
    </View>
  );
}

function ScreenC2() {
  const navigation = useNavigation();
  return (
    <View style={styles.perfilScreen}>
      <Text style={styles.text}>PERFIL - EDICION</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter your name" />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button
        title="IR A ScreenC1"
        onPress={() => navigation.navigate("ScreenC1")}
      />
    </View>
  );
}
// Screens del Cuarto Stack
function ScreenD1() {
  const navigation = useNavigation();
  return <View style={styles.perfilScreen}>
     <TouchableOpacity  
        onPress={() => navigation.navigate("ScreenD2")}>
          <Text style={styles.btn}>
            Hola 
          </Text>

        </TouchableOpacity>
     
       
      
  </View>;
}

function ScreenD2() {
  const navigation = useNavigation();
  return <View style={styles.perfilScreen}>


  </View>;
}

//
// Creación de los stacks
//
const StackA = createNativeStackNavigator();
const StackB = createNativeStackNavigator();
const StackC = createNativeStackNavigator();

function StackANavigator() {
  return (
    <StackA.Navigator>
      <StackA.Screen name="ScreenA1" component={ScreenA1} />
      <StackA.Screen name="ScreenA2" component={ScreenA2} />
    </StackA.Navigator>
  );
}

function StackBNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="ScreenB1" component={ScreenB1} />
      <StackB.Screen name="ScreenB2" component={ScreenB2} />
    </StackB.Navigator>
  );
}

function StackCNavigator() {
  return (
    <StackC.Navigator>
      <StackC.Screen
        name="ScreenC1"
        component={ScreenC1}
        options={{
          title: "Otro Titulo",
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",

          headerRight: () => (
            <Button
              onPress={() => alert("Hice Click!!")}
              title="Info"
              color="#00cc00"
            />
          ),
          headerTransparent: true,
        }}
      />

      <StackC.Screen
        name="ScreenC2"
        component={ScreenC2}
        options={{
          headerShown: false,
        }}
      />
    </StackC.Navigator>
  );
}
function StackDNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="ScreenD1" component={ScreenD1} />
      <StackB.Screen name="ScreenD2" component={ScreenD2} />
    </StackB.Navigator>
  );
}
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StackANavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Buscador"
        component={StackBNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={StackCNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Llamadas"
        component={StackDNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="call" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//
// Envolviendo la aplicación en el NavigationContainer
//
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

// css

const styles = StyleSheet.create({
  btn:{
    color: "black",
    backgroundColor: "#24f5f8",
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", // Fondo negro para contrastar el texto blanco
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  description: {
    color: "white",
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },

  homeScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff0000",
  },

  searchScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#044a16",
  },
  perfilScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "90%",
    color: "white",
  },
});

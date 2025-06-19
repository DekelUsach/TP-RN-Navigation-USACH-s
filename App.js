import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

//screens de home
const PantallaInicio = () => {
  const nav = useNavigation();
  return (
    <View style={estilosHome.vista}>
      <Text style={estilosComunes.titulo}>Explorá el Universo</Text>
      <TouchableOpacity style={estilosComunes.boton} onPress={() => nav.navigate('InicioDos')}>
        <Text style={estilosComunes.botonTexto}>Ir a Galaxias</Text>
      </TouchableOpacity>
      <Image source={require('./assets/galaxia.png')} style={estilosComunes.imagenGrande} />
    </View>
  );
};

const PantallaInicioDos = () => {
  const nav = useNavigation();
  return (
    <View style={estilosHome.vista}>
      <Text style={estilosComunes.titulo}>Galaxias Distantes</Text>
      <TouchableOpacity style={estilosComunes.botonSecundario} onPress={() => nav.goBack()}>
        <Text style={estilosComunes.botonTexto}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

// screens de busqueda
const BusquedaInicial = ({ navigation }) => {
  const [nombre, definirNombre] = useState('');
  const [telefono, definirTelefono] = useState('');

  return (
    <View style={estilosBusqueda.vista}>
      <Text style={estilosComunes.titulo}>Registro de Astronautas</Text>
      <TextInput
        style={estilosComunes.campoTexto}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={definirNombre}
      />
      <TextInput
        style={estilosComunes.campoTexto}
        placeholder="Número de contacto"
        value={telefono}
        onChangeText={definirTelefono}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={estilosComunes.boton} onPress={() => navigation.navigate('Resultados', { nombre, telefono })}>
        <Text style={estilosComunes.botonTexto}>Enviar Información</Text>
      </TouchableOpacity>
    </View>
  );
};

const ResultadosBusqueda = () => {
  const { params } = useRoute();
  const { nombre, telefono } = params || {};

  return (
    <View style={estilosBusqueda.vista}>
      <Text style={estilosComunes.titulo}>Ficha Registrada</Text>
      <Text style={estilosComunes.etiqueta}>👤 {nombre}</Text>
      <Text style={estilosComunes.etiqueta}>📞 {telefono}</Text>
    </View>
  );
};

//screens de perfil
const PerfilInicio = ({ navigation }) => (
  <View style={estilosPerfil.vista}>
    <Text style={estilosComunes.titulo}>Mi Nave</Text>
    <TouchableOpacity style={estilosComunes.boton} onPress={() => navigation.navigate('DetallePerfil')}>
      <Text style={estilosComunes.botonTexto}>Ver Detalles</Text>
    </TouchableOpacity>
  </View>
);

const PerfilDetalle = () => (
  <View style={estilosPerfil.vista}>
    <Text style={estilosComunes.titulo}>Interior de la Nave</Text>
    <Image
      source={require('./assets/nave.jpg')}
       style={estilosComunes.imagenGrande}
    />
  </View>
);

//todos los stacks
const StackInicio = createNativeStackNavigator();
const StackBusqueda = createNativeStackNavigator();
const StackPerfil = createNativeStackNavigator();

const NavegadorInicio = () => (
  <StackInicio.Navigator screenOptions={{ headerShown: false }}>
    <StackInicio.Screen name="Inicio" component={PantallaInicio} />
    <StackInicio.Screen name="InicioDos" component={PantallaInicioDos} />
  </StackInicio.Navigator>
);

const NavegadorBusqueda = () => (
  <StackBusqueda.Navigator screenOptions={{ headerShown: false }}>
    <StackBusqueda.Screen name="Busqueda" component={BusquedaInicial} />
    <StackBusqueda.Screen name="Resultados" component={ResultadosBusqueda} />
  </StackBusqueda.Navigator>
);

const NavegadorPerfil = () => (
  <StackPerfil.Navigator screenOptions={{ headerShown: false }}>
    <StackPerfil.Screen name="VistaPerfil" component={PerfilInicio} />
    <StackPerfil.Screen name="DetallePerfil" component={PerfilDetalle} />
  </StackPerfil.Navigator>
);

// todas las tabs
const Tabs = createBottomTabNavigator();

const MisTabs = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let nombreIcono = 'ellipse';
        if (route.name === 'Inicio') nombreIcono = 'planet';
        else if (route.name === 'Busqueda') nombreIcono = 'search';
        else if (route.name === 'Perfil') nombreIcono = 'rocket';

        return <Ionicons name={nombreIcono} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#00f0ff',
      tabBarStyle: { backgroundColor: '#1a1a2e' },
      headerShown: false,
    })}
  >
    <Tabs.Screen name="Inicio" component={NavegadorInicio} />
    <Tabs.Screen name="Busqueda" component={NavegadorBusqueda} />
    <Tabs.Screen name="Perfil" component={NavegadorPerfil} />
  </Tabs.Navigator>
);

//app
export default function App() {
  return (
    <NavigationContainer>
      <MisTabs />
    </NavigationContainer>
  );
}

//estilos
const estilosComunes = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  campoTexto: {
    backgroundColor: '#e0e0e0',
    width: 250,
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
  },
  imagenGrande: {
    width: 200,
    height: 200,
    marginTop: 25,
    borderRadius: 12,
  },
  etiqueta: {
    fontSize: 18,
    color: '#d1d1d1',
    marginTop: 10,
  },
  boton: {
    backgroundColor: '#00f0ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  botonSecundario: {
    backgroundColor: '#ff5e78',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#000',
    fontWeight: '600',
  },
});

const estilosHome = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: '#0f0f3d',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const estilosBusqueda = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: '#112240',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const estilosPerfil = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: '#0d1b2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

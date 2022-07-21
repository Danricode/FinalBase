import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
export default function HomeScreen() {
  const {user, logout, deleteUser} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <Text style={styles.text}>{user.email}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
      <FormButton buttonTitle="Delete User" onPress={() => deleteUser()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

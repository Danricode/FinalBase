import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import TouchID from 'react-native-touch-id';

export default function LoginScreen({navigation}) {
  const optionalConfigObject = {
    title: 'Authentication Required',
    color: 'ffffff',
    fallbackLabel: 'Show Passcode',
  };

  class Touchy extends React.Component {
    touchIdAuth = () => {
      TouchID.isSupported()
        .then(biometryType => {
          if (biometryType === 'FaceID') {
            console.log('FaceID is supported.');
          } else {
            console.log('TouchID is supported.');
            TouchID.authenticate('Authenticate', optionalConfigObject)
              .then(success => {
                login(email, password);
              })
              .catch(error => {
                Alert.alert('Authentication Failed', error.toString());
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    render() {
      return (
        <View>
          <TouchableOpacity style={{flexWrap: 'wrap'}}>
            <FormButton
              buttonTitle="Authenticate"
              onPress={this.touchIdAuth.bind(this)}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>L O G I N</Text>
      <FormInput
        value={email}
        placeholderText="Email"
        onChangeText={userEmail => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <FormInput
        value={password}
        placeholderText="Password"
        onChangeText={userPassword => setPassword(userPassword)}
        secureTextEntry={true}
      />
      <Touchy />
      <FormButton buttonTitle="Login" onPress={() => login(email, password)} />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          New user? <Text style={styles.join}>Join here</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  navButton: {
    marginTop: 15,
    color: 'black',
  },
  navButtonText: {
    fontSize: 20,
    color: 'grey',
  },
  join: {
    color: 'black',
  },
});

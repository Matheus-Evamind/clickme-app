import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { LoginUser } from '../api/axios/login';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';
const Login: React.FC = () => {
  const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onLogin = async() => {
      const log = LoginUser(email, password);

      if(log !== null) {
        navigation.navigate("calendar")
      }
    
    }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        input: {
          width: 300,
          height: 44,
          padding: 10,
          borderWidth: 2,
          borderColor: '#fff',
          marginBottom: 10,
          borderRadius: 10,
          
        },
      });

    const handleEmail = (email: string) => {
        setEmail(email);
    }
    const handlePassword = (password: string) => {
        setPassword(password);
    }
  return (
   
          <View style={styles.container}>
            <TextInput
              value={email}
              onChangeText={(email) => handleEmail(email)}
              placeholder={'Username'}
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={(password) => handlePassword(password)}
              placeholder={'Password'}
              secureTextEntry={true}
              style={styles.input}
            />
            
            <Button
              title={'Login'}
              onPress={() => onLogin()}
            />
          </View>
        );
}

export default Login;
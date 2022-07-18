import React from 'react';

import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';


const App = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        { Array.from({ length: 100 }).map((_, i) => (
          <View key={i} style={styles.welcome}>
            <Text style={styles.welcome} >Item {i}</Text>
          </View>
          )) 
        }
      </ScrollView>

    <View style={styles.flatButton}>
      <Button title='test app1'/>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'cyan',
    margin: 10,
  },
  flatButton: {
    color:'black',
    backgroundColor: 'cyan',
    marginTop: 10,
  }
});

export default App;

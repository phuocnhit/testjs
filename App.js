import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView
} from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


class HomeScreen extends React.Component {
   static navigationOptions = {
     header: null
   }

   constructor(props) {
     super(props);
     this.state = {
       articles: [],
       refreshing: true
     };
   }

   componentDidMount() {
     
       var a = fetch("https://restcountries.eu/rest/v2/all")
         .then(response => response.json())
         .then((responseJson) => {
            this.setState({
              articles: responseJson,
              refreshing: false
            });
         })
     
   }
  render() {
    return (
       <ScrollView>
      <View style={{ alignItems:'flex-start', justifyContent: 'center', paddingTop:15 }}>
        <Text>Home Screen</Text>        
        <Button
          title="Go to Details 2"
         onPress={() => this.props.navigation.navigate('Details')}          
        />
         {
           this.state.articles.map((answer, i) => {
               console.log("Entered");
               // Return the element. Also pass key     
               return ( < Button key={i} title = {i+' ' + answer.name} style={styles.button}
                   onPress = {
                     () => this.props.navigation.navigate('Details')
                   }
                   />) 
               })
           }

      </View>
      </ScrollView>
    );
  }  
}

class DetailsScreen extends React.Component {
   static navigationOptions = {
     header: null
   }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
         <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />

      </View>
    );
  }  
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    header:null
  },
  Details: {
    screen: DetailsScreen
  },
}, {
    initialRouteName: 'Home',
});

const styles = {
  container: {
    flex: 1
  },
  button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15
  }
}

export default createAppContainer(AppNavigator);

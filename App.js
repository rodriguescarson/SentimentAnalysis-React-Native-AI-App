import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: null,
      loading: true,
      output: null,
      probability: null
    }
  }

  goForAxios = () => {
    const { input } = this.state
    axios.request({
      method: 'POST',
      url: 'https://sentiment-analysis4.p.rapidapi.com/reviews',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'sentiment-analysis4.p.rapidapi.com',
        'x-rapidapi-key': 'AnaAO5F8DtV86KC8d7D3vANFwCjLlyHA'
      },
      data: {
        text: input
      }
    }).then((response) => {
      console.log(response)
      this.setState({ loading: false, output: response.data.label, probability: response.data.scope })
    }).catch(function (error) {
      console.error(error);
    });
  }

  render() {
    const { loading, probability, output } = this.state
    return (
      <LinearGradient
        colors={['#ffe063', '#a061fe']}
        style={styles.linerarGradient}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Find Sentiment</Text>
          <Text style={styles.subtitle}>Sentiment Analysis Detector</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input placegolder="Enter text to perform Analysis"
            onChangeText={(value) => this.setState({ input: value })}
          ></Input>
          <View style={styles.buttonContainer}>
            <Button
              title="Find Sentiment"
              buttonStyle={styles.button}
              titleStyle={{ fontSize: 20 }}
              onPress={this.goForAxios}
            >
            </Button>
          </View>
          {loading ?
            <Text></Text>
            :
            <View style={styles.output}>
              <Text style={{ fontSize: 18 }}>
                {output + '-' + probability}
              </Text>
            </View>
          }
          <View style={styles.imageContainer}>
            <Image
              source={require('./assets/drama.png')}
              style={styles.dramaImage}>
            </Image>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
const styles = StyleSheet.create({
  linerarGradient: {
    flex: 1,
  },
  button: {
    width: 200,
    height: 57,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  titleContainer: {
    marginTop: 70,
    marginLeft: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 50
  },
  inputContainer: {
    marginHorizontal: 10,
    marginTop: 90
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120
  },
  dramaImage: {
    width: 170,
    height: 170,
  },
  output: {
    fontSize: 29,
    alignItems: 'center'
  }
})
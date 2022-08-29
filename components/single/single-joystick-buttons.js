import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
const js = options => {
  console.log("OPTIONS", options);
  let string = `
    setTimeout(() => {


    var joystick = nipplejs.create({
      zone: document.getElementById('zone_joystick'),
      color: "${options.color}",
      lockX: ${options.lockX},
      lockY: ${options.lockY},
      mode: '${options.mode}',
      size: ${options.size},
      position: {
        left: "${options.position.left}",
        bottom: "${options.position.bottom}"
      }
    });

    joystick.on('start', function(evt, data) {
      let dataToReturn = { type: "onStart", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })

    joystick.on('end', function(evt, data) {
      let dataToReturn = { type: "onEnd", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })


    joystick.on('move', function(evt, data) {
      let dataToReturn = { type: "onMove", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })


    joystick.on('dir', function(evt, data) {
      let dataToReturn = { type: "onDir", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })


    joystick.on('dir:up', function(evt, data) {
      let dataToReturn = { type: "onDirUp", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })

    joystick.on('dir:down', function(evt, data) {
      let dataToReturn = { type: "onDirDown", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })

    joystick.on('dir:left', function(evt, data) {
      let dataToReturn = { type: "onDirLeft", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })

    joystick.on('dir:right', function(evt, data) {
      let dataToReturn = { type: "onDirRight", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })

    joystick.on('plain', function(evt, data) {
      let dataToReturn = { type: "onPlane", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })

    joystick.on('plain:up', function(evt, data) {
      let dataToReturn = { type: "onPlaneUp", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })

    joystick.on('plain:down', function(evt, data) {
      let dataToReturn = { type: "onPlaneDown", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })

    joystick.on('plain:left', function(evt, data) {
      let dataToReturn = { type: "onPlaneLeft", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })

    joystick.on('plain:right', function(evt, data) {
      let dataToReturn = { type: "onPlaneRight", event: evt.type, data }
      window.ReactNativeWebView.postMessage(JSON.stringify(dataToReturn));
    })
    }, 500)
  `;

  return string;
};

export class RNGamePadSingle extends React.Component {
  constructor() {
    super();
  }

  invokeCallback(json) {
    let { type, event, data } = JSON.parse(json);
    if (this.props[type]) {
      this.props[type](event, data);
    }
  }

  render() {
    let {
      color,
      size,
      lockX = false,
      lockY = false
    } = this.props.options;
    let {
      onButtonBPress,
      buttonAColor,
      onButtonAPress,
      buttonBColor,
      containerStyle
    } = this.props;
    console.log("PROPS", this.props);

    var options = {
      color,
      mode: "static",
      size,
      position: {
        left: size / 2,
        bottom: size / 2
      },
      lockX,
      lockY
    };
    return (
      <View style={[{ flexDirection: "row", width: size / 2, height: size / 2 }, containerStyle]}>
        <WebView 
          style={{backgroundColor:'rgba(52, 52, 52, 0.0)'}}
        originWhitelist={['*']}         
        source={Platform.OS=='ios'?{uri:'Static.bundle/index.html' }:{uri:'file:///android_asset/test.html'}}  
        onMessage={evt => this.invokeCallback(evt.nativeEvent.data)}             
        injectedJavaScript={js(options)}      
             />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 22,
    color: "white",
    fontWeight: "700"
  }
});

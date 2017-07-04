import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View } from 'react-native';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('http://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={{padding: 10}}><Text style={styles.title}>{rowData.title}</Text><Text style={styles.body}>{rowData.body}</Text></View>}
          renderSeparator={(sectionID, rowID) =>
              <View key={`${sectionID}-${rowID}`} style={styles.separator} />
      }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  body: {
    fontSize: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
  }
});

AppRegistry.registerComponent('AwesomeProject', () => Movies);

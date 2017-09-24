import React, { Component } from 'react';
import { Animated, Text, View, Dimensions, StyleSheet, Image, ScrollView, Alert, AsyncStorage } from 'react-native';
import constant from '../constant'
import images from '../images'
import { color } from '../theme'

const PAGES = [
  {
    title: 'All breed dogs',
    description: "over 200 dog breeds around the world",
    backgroundColor: '#559E83',
    image: 'splash1'
  },
  {
    title: 'Search',
    description: "search name breeddogs faster",
    backgroundColor: '#FF6F69',
    image: 'splash2'
  },
  {
    title: 'Show Image',
    description: "over 20,000 images of dogs programmaticaly accessible by over 120 breeds",
    backgroundColor: '#6497B1',
    image: 'splash3'
  }
]

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: new Animated.Value(0),
      loadingFirst: true
    };
    this.curScroll = 0
    this.state.scroll.addListener(({ value }) => this.curScroll = value);
  }

  renderContext = () => {
    return (
      <View style={{ alignItems: 'center', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <ScrollView
          ref={(scroll) => this.scroll = scroll}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.state.scroll } } }],
            )}>
          {PAGES.map((page, i) => {
            return (
              <View key={i} style={styles.page}>
                <View >
                  <Image
                    resizeMode='contain'
                    style={styles.photo}
                    source={images[page['image']]}
                  />
                </View>
                <Text style={styles.title}>{page.title}</Text>
                <Text style={styles.desc}>{page.description}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  renderDot = (position) => {
    return (
      <View
        style={styles.dotsView}>
        {PAGES.map((page, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, { opacity: Animated.add(position, -i + 1) }]} />
        )
        )}
      </View>
    )
  }

  renderButton = () => {
    return (
      <View style={styles.fonter}>
        <Text
          style={styles.buttonText}
          onPress={() => this.handleFinish()}>Skip</Text>
        <Text
          style={styles.buttonText}
          onPress={() => {
            if (this.curScroll + constant.APP_WIDTH >= constant.APP_WIDTH * 3) this.handleFinish()
            else this.scroll.scrollTo({ x: this.curScroll + constant.APP_WIDTH, y: 0, animated: true })
          }}>Next</Text>
      </View>
    )
  }

  componentWillMount() {
    this.handleFirstUser()
  }

  render() {
    const position = Animated.divide(this.state.scroll, constant.APP_WIDTH);
    const backgroundColor = position.interpolate({
      inputRange: PAGES.map((_, i) => i),
      outputRange: PAGES.map(p => p.backgroundColor),
    });
    if (this.state.loadingFirst) return <View />
    return (
      <Animated.View style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: 10 }}>
        {this.renderContext()}
        {this.renderDot(position)}
        {this.renderButton()}
      </Animated.View>
    );
  }

  handleFinish = () => {
    Alert.alert(
      'Finish',
      'You agree to ignore',
      [
        { text: 'OK', onPress: () => this.resetToHome() },
        { text: 'Cancel', onPress: () => console.log('Cancel handleFinish'), style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  resetToHome = () => {
    this.handleSaveFirstUse();
    this.props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [
        { type: "Navigation/NAVIGATE", routeName: "home" }]
    })
  }

  handleFirstUser = async () => {
    AsyncStorage.getItem('FIRST_USER')
      .then((value) => {
        this.setState({ loadingFirst: false })
        if (value !== null) {
          this.resetToHome();
        }
      });
  }

  handleSaveFirstUse = async () => {
    AsyncStorage.setItem('FIRST_USER', 'FIRST_USER')
      .catch((error) => {
        console.log('error', error)
      });
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    fontSize: constant.font.LOGO,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  desc: {
    color: '#eaeaea',
    fontSize: constant.font.BIG,
    backgroundColor: 'transparent',
    marginTop: 12,
    lineHeight: 25,
    textAlign: 'center'
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: constant.APP_WIDTH,
  },
  photo: {
    width: constant.APP_WIDTH - 24,
    height: constant.APP_WIDTH - 24
  },
  dotsView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  dot: {
    backgroundColor: color.primary,
    height: 10,
    width: constant.APP_WIDTH / 3 - (8 * 3),
    marginHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 5
  },
  fonter: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

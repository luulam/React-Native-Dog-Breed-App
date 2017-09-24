import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions, ScrollView,
  Animated,
  Button,
  Easing,
  ActivityIndicator
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getColor, getRandomColor } from '../utils';
import { appStyle, color } from '../theme'
import constant from '../constant';
import Animation from '../components/animation'
import Image from 'react-native-image-progress';
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrImgDogs: [],
      loading: false,
      error: false
    };
  }

  renderHeader = () => {
    const name = this.props.navigation.state.params.name;
    return (
      <View style={[styles.itemNameBreedDogs, { backgroundColor: getRandomColor(), flex: undefined }]}>
        <Text style={styles.headerText}>{`#${name}`}</Text>
      </View>
    )
  }

  renderContext = () => {
    const { arrImgDogs, loading, error } = this.state;

    if (loading) {
      return <View style={styles.appCenter}>
        <Animation />
      </View>
    }
    if (error) {
      return <View style={styles.appCenter}>
        <Text style={styles.appText}>Please try connecting again</Text>
        <Button title='reload' onPress={() => this.handerGetArrBreedDogs()} />
      </View>
    }

    const arrItem = arrImgDogs.map((item, index) => {
      return (
        <View key={item} style={[styles.appShadow]}>
          <Image
            resizeMode='contain'
            source={{ uri: item }}
            style={styles.itemImage} />
        </View>
      );
    })

    return (
      <View>
        <Carousel
          animationOptions={{ duration: 0, easing: Easing.elastic(1) }}
          inactiveSlideOpacity={0.6}
          ref={(carousel) => { this.carousel = carousel; }}
          sliderWidth={constant.APP_WIDTH}
          itemWidth={constant.APP_WIDTH - 54}
          sliderHeight={constant.APP_WIDTH}
          itemHeight={constant.APP_WIDTH}>
          {arrItem}
        </Carousel>
      </View >

    )
  }

  renderFonter = () => {
    return (
      <View style={styles.fonter}>
        <TouchableOpacity style={[styles.fab, { backgroundColor: getRandomColor() }]} onPress={() => this.carousel && this.carousel.snapToPrev({ animated: true })}>
          <Ionicons name='ios-arrow-round-back' size={constant.icon.NOMAL} color={color.access} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.fab, { backgroundColor: getRandomColor() }]} onPress={() => this.props.navigation.goBack()}>
          <Ionicons name='ios-paw-outline' size={constant.icon.NOMAL} color={color.access} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.fab, { backgroundColor: getRandomColor() }]} onPress={() => this.carousel && this.carousel.snapToNext({ animated: true })}>
          <Ionicons name='ios-arrow-round-forward' size={constant.icon.NOMAL} color={color.access} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.const}>
        {this.renderHeader()}
        {this.renderContext()}
        {this.renderFonter()}
      </View >
    );
  }

  componentDidMount() {
    this.handleGETarrImg();
  }

  handleGETarrImg = () => {
    this.setState({ loading: true, error: false })
    let URL = `https://dog.ceo/api/breed/${this.props.navigation.state.params.name}/images`
    fetch(URL)
      .then(response => response.json())
      .then(response => {
        this.setState({ loading: false, arrImgDogs: response.message })
      })
      .catch(error => {
        console.log('handleGETarrImg', error)
        this.setState({ loading: false, error: true })
      });
  }
}
const styles = StyleSheet.create({
  ...appStyle,
  const: {
    ...appStyle.appScreen,
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 20
  },
  itemImage: {
    width: constant.APP_WIDTH - 60,
    height: constant.APP_WIDTH,
  },
  headerText: {
    fontSize: constant.font.BIG,
    fontWeight: 'bold'
  },
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 56,
    borderRadius: 28
  },
  fonter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  }
});
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    Easing,
    Button
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getColor } from '../utils';
import { appStyle, color } from '../theme'
import constant from '../constant';
import Animation from '../components/animation'

// source at https://dog.ceo/dog-api/
const URL_GET_BREEDDOG = 'https://dog.ceo/api/breeds/list'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrBreedDogs: [],
            loading: false,
            error: true,
            textSearch: '',
        }
    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Animation />
                <Text style={styles.headerTitle}>List all breed names</Text>
            </View>
        )
    }

    renderSearch = () => {
        const { textSearch } = this.state;
        return (
            <View style={{
                marginHorizontal: constant.MARGIN_HOR * 2,
                marginVertical: constant.MARGIN_VER
            }}>
                <View style={styles.appHor}>
                    <Ionicons
                        name='ios-search-outline'
                        size={constant.icon.NOMAL} />
                    <TextInput
                        style={styles.inputSearch}
                        underlineColorAndroid='transparent'
                        onChangeText={text => this.setState({
                            textSearch: text.toLowerCase()
                        })}
                        value={textSearch}
                        placeholderTextColor='gray'
                        placeholder='Search Name'
                    />
                </View>
                <View style={styles.appHor}>
                    {Array.from({ length: 360 }, (v, i) => i).map(v =>
                        <View
                            key={v}
                            style={[styles.aPixelColor, { backgroundColor: getColor(360, v) }]} />)
                    }
                </View>
            </View>
        )
    }

    renderContext = () => {
        const { arrBreedDogs, textSearch, loading, error } = this.state;
        //finter after search value
        let dataSource = arrBreedDogs.filter(item => item.indexOf(textSearch) != -1);
        if (loading) {
            return <View style={styles.appCenter}>
                <Animation />
            </View>
        }
        if (error) {
            return <View style={styles.appCenter}>
                <Text style={styles.appText}>Lỗi Kết nối thử lại</Text>
                <Button title='reload' onPress={() => this.handerGetArrBreedDogs()} />
            </View>
        }
        return (
            <ScrollView>
                <View style={styles.arrNameBreedDogs}>
                    {dataSource.map((item, index) =>
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.itemNameBreedDogs,
                                { backgroundColor: getColor(dataSource.length, index), }
                            ]}
                            onPress={() => this.props.navigation.navigate('detail',
                                { name: item })}>
                            <Text style={styles.appText}>{`#${item}`}</Text>
                        </TouchableOpacity>)}
                </View >
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={appStyle.appScreen}>
                {this.renderHeader()}
                {this.renderSearch()}
                {this.renderContext()}
            </View >
        );
    }

    componentDidMount() {
        this.handerGetArrBreedDogs();
    }

    handerGetArrBreedDogs = () => {
        this.setState({ loading: true, error: false })
        fetch(URL_GET_BREEDDOG)
            .then(response => response.json())
            .then(response => {
                this.setState({ loading: false, arrBreedDogs: response.message });
            })
            .catch(error => {
                console.log('handerGetArrBreedDogs', error)
                this.setState({ loading: false, error: true })
            });
    }
}

const styles = StyleSheet.create({
    ...appStyle,
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLogo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: constant.font.LOGO,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    inputSearch: {
        flex: 1,
        height: 40,
        textAlign: 'center',
        color: color.text,
        fontSize: constant.font.NOMAL
    },
    aPixelColor: {
        width: (constant.APP_WIDTH - 40) / 360,
        height: 3
    },
    arrNameBreedDogs: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },

})
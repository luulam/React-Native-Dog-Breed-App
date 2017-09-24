import constant from './constant'
import { Platform } from 'react-native'
const color = {
    primary: '#edbbd0',
    secondary: '#B3D9CE',
    bg_app: '#F7F7F7',
    access: 'white',
    text: '#2b2b2b',
    green: '#00551e',
    brown: '#693504',
    red: '#db2828'
}

//other
const active = {
    opacity: 0.6
}

const appStyle = {
    appScreen: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1
    },
    appCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appHor: {
        flexDirection: 'row'
    },
    appVer: {
        flexDirection: 'column'
    },
    appText: {
        color: color.text,
        fontSize: constant.font.NOMAL
    },
    appPadding: {
        paddingHorizontal: constant.PADDING_HOR,
        paddingVertical: constant.PaDDING_VER
    },
    appShadow: {
        margin: 3,
        borderRadius: 4,
        shadowRadius: 1,
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2,
    },
    itemNameBreedDogs: {
        flexDirection: 'row',
        marginHorizontal: constant.MARGIN_HOR,
        marginVertical: constant.MARGIN_VER,
        paddingHorizontal: constant.PADDING_HOR,
        paddingVertical: constant.PADDING_VER,
        borderRadius: constant.BORD_RADIUS
    }
}
export { color, active, appStyle }
export default { color, active, appStyle }
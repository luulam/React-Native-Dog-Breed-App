import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export default {
    APP_WIDTH: width,
    APP_HEIGHT: height,
    MARGIN_HOR: 6,
    MARGIN_VER: 4,
    PADDING_HOR: 12,
    PADDING_VER: 6,
    BORD_RADIUS: 22,
    icon: {
        NOMAL: 32,
        BIG: 52,
        SMALL: 24,
    },
    font: {
        NOMAL: 16,
        LOGO: 26,
        BIG: 20,
    }
}
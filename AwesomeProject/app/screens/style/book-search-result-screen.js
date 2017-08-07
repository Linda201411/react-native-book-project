import { StyleSheet } from 'react-native';
import Themes from './../../src/themes/themes'

const Styles = StyleSheet.create({
    headView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: -10,
        marginLeft:10,
        marginRight:10
    },
    scanIcon: {
        marginLeft: 10,
        marginBottom: 10
    },
    searchView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: Themes.color,
        marginBottom: 10,
        paddingTop: 5,
        paddingBottom: 5
    }
});

export default Styles;
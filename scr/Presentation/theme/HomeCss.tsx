import { StyleSheet } from "react-native";
import { COLORS } from "./Apptheme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imgBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    frm: {
        width: '100%',
        height: '45%',
        backgroundColor: COLORS.bgColor,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
    },

    frmTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.bgBlack,
    },
    frmRegistre: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },

    txtRegistre: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        borderBottomColor: COLORS.secundary,
        borderBottomWidth: 1,
        marginLeft: 5,
        color: COLORS.secundary,

    },
});

export default styles;
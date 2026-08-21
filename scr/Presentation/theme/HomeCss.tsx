import { StyleSheet } from "react-native";
import { COLORS } from "./Apptheme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
    },

    imgBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    frmWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    frm: {
        width: '100%',
        maxHeight: '55%',
        backgroundColor: COLORS.bgColor,
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
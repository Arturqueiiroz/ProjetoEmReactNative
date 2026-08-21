import { StyleSheet } from "react-native";
import { COLORS } from "./Apptheme";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
    },

    imgBg: {
        width: '100%',
        height: '70%',
        position: 'absolute',
    },

    backButton: {
        fontSize: 28,
        color: COLORS.bgBlack,
    },

    photoContainer: {
        marginTop: 40,
        alignItems: 'center',
    },

    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#000000ff',
    },

    photoText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },

    frm: {
        width: '100%',
        height: '72%',
        backgroundColor: COLORS.bgColor,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
    },

    frmTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.bgBlack,
    },

    frmInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },

    frmIco: {
        width: 22,
        height: 22,
    },

    txtInput: {
        flex: 1,
        marginLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 15,
        paddingBottom: 8,
    }

});

export default styles;
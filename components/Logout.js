import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as firebase from 'firebase'

const Logout = ({ navigation }) => {
    useEffect(() => {
        firebase.auth().signOut()
            .then(navigation.navigate('Login'))
            .catch((err) => alert(err.toString()))

    }, [])
    return (
        <View style={styles.container}>
            <Text>LOGGING OUT, please wait.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
})

export default Logout

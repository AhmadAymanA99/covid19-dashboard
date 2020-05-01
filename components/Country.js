import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { countriesAPI } from '../utils/helpers'

const numeral = require("numeral")

const Country = ({ navigation, route }) => {
    const country = route.params ? route.params.country["Country"] : 'Egypt'

    const [lat, setlat] = useState(0)
    const [lng, setlng] = useState(0)

    useEffect(() => {
        countriesAPI(country)
            .then(({ geometry }) => {
                setlat(geometry.lat)
                setlng(geometry.lng)
            })
            .catch(err => alert("Error Occured, Rsestart the app."))
    }, [country])


    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 25,
                        longitudeDelta: 25,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: lat,
                            longitude: lng,
                            latitudeDelta: 25,
                            longitudeDelta: 25,
                        }}
                    />
                </MapView>
                {
                    route.params
                        ? <View style={styles.textcontainer}>
                            <Text style={styles.country}> {country}</Text>
                            <Text style={styles.content}>New Cases: <Text style={{ color: "#ffa31a" }}>+{numeral(route.params.country["NewConfirmed"]).format('0,0').toString()}</Text></Text>
                            <Text style={styles.content}>New Deaths: <Text style={{ color: "#ff3333" }}>+{numeral(route.params.country["NewDeaths"]).format('0,0').toString()}</Text></Text>
                            <Text style={styles.content}>New Confirmed: <Text style={{ color: "#00cc66" }}>+{numeral(route.params.country["NewRecovered"]).format('0,0').toString()}</Text></Text>

                            <Text style={styles.content}>Total Confirmed: <Text style={{}}>{numeral(route.params.country["TotalConfirmed"]).format('0,0').toString()}</Text></Text>
                            <Text style={styles.content}>Total Deaths: <Text style={{}}>{numeral(route.params.country["TotalDeaths"]).format('0,0').toString()}</Text></Text>
                            <Text style={styles.content}>Total Recovered: <Text style={{}}>{numeral(route.params.country["TotalRecovered"]).format('0,0').toString()}</Text></Text>
                        </View>
                        : <Text style={styles.country}>Please Choose a country from Dashboard.</Text>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        padding: 10
    },
    textcontainer: {
        flex: 1,

    },
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: 400,
        height: 390,
    },
    country: {
        fontSize: 20,
        fontWeight: "700",
        margin: 5,
        alignSelf: "center"
    },
    content: {
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 22
    }
})

export default Country

import React, { useState, useEffect } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Container, Content, List, ListItem } from 'native-base'
const fetch = require("node-fetch")
const numeral = require("numeral")

const api = () => {
    return fetch("https://api.covid19api.com/summary")
        .then((response) => response.json())
        .then((data) => {
            //console.log("Countries: ", data.Countries)
            data.Countries.sort((a, b) => {
                return a["TotalConfirmed"] < b["TotalConfirmed"]
            })
            return {
                Countries: data.Countries
            }
        })

}

const Dashboard = ({ navigation, route }) => {
    const [countries, setCountries] = useState("")
    const [sorting, setSorting] = useState("")

    useEffect(() => {
        api()
            .then(({ Countries }) => setCountries(Countries))
            .catch(err => alert("Error Occured, Rsestart the app."))

        //console.log(summary)
    }, [])

    return (
        <Container>
            <Content>
                <List>
                    <ListItem selected key={-1}>

                        <Text style={[styles.header, { textAlign: 'left' }]} >Country</Text>

                        <Text style={[styles.header, {}]}>Cases</Text>

                        <Text style={[styles.header, { color: "#ff3333" }]}>Deaths</Text>

                        <Text style={[styles.header, { color: "#00cc66" }]}>Recovered</Text>

                    </ListItem>
                    {
                        countries !== ''
                            ? countries.map(country =>
                                <ListItem key={country["CountryCode"]} onPress={() => navigation.navigate('Country', { country })}>

                                    <Text style={[styles.body, { textAlign: 'left' }]}>{country["Country"]}</Text>

                                    <Text style={[styles.body, {}]}>{numeral(country["TotalConfirmed"]).format('0,0').toString()}<Text style={{ color: "#ffa31a" }}>{'\n'}(+{numeral(country["NewConfirmed"]).format('0,0').toString()})</Text></Text>

                                    <Text style={[styles.body, {}]}>{numeral(country["TotalDeaths"]).format('0,0').toString()}<Text style={{ color: "#ff3333" }}>{'\n'}(+{numeral(country["NewDeaths"]).format('0,0').toString()})</Text></Text>

                                    <Text style={[styles.body, {}]}>{numeral(country["TotalRecovered"]).format('0,0').toString()}<Text style={{ color: "#00cc66" }}>{'\n'}(+{numeral(country["NewRecovered"]).format('0,0').toString()})</Text></Text>

                                </ListItem>
                            )
                            : <Text>Loading...</Text>
                    }

                </List>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    header: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        width: 98

    },
    body: {
        fontSize: 16,
        textAlign: 'center',
        width: 98

    }
})

export default Dashboard

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Container, Content, Card, CardItem, Body } from "native-base"
import { api } from '../utils/helpers'
const numeral = require("numeral")


const Home = ({ navigation, route }) => {
    // const { user } = route.params
    // console.log(user)
    const [summary, setSummary] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
        api()
            .then(({ sum, date }) => {
                setSummary(sum)
                setDate(date)
            })
            .catch(err => alert("Error Occured, Rsestart the app."))

        console.log(date)
    }, [])


    return (
        <ScrollView>
            <Container>
                <Content padder>
                    <Text style={styles.ssheaderText} >Last Updated: {date}</Text>
                    <Card>
                        <CardItem header>
                            <Text style={styles.headerText}>Coronavirus Cases:</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text style={styles.bodyText}>
                                    {
                                        summary !== ""
                                            ? numeral(summary["TotalConfirmed"]).format('0,0').toString()
                                            : <Text>Loading...</Text>
                                    }
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer button onPress={() => navigation.navigate('Dashboard')} >
                            <Text style={styles.footText}>view by country</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text style={styles.headerText}>Deaths:</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text style={styles.bodyTextdark}>
                                    {
                                        summary !== ""
                                            ? numeral(summary["TotalDeaths"]).format('0,0').toString()
                                            : <Text>Loading...</Text>
                                    }
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer />
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text style={styles.headerText}>Recovered:</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text style={styles.bodyTextgreen}>
                                    {
                                        summary !== ""
                                            ? numeral(summary["TotalRecovered"]).format('0,0').toString()
                                            : <Text>Loading...</Text>
                                    }
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer />
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text style={styles.sheaderText}>New Confirmed:</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                {
                                    summary !== ""
                                        ? <View style={styles.sbodyText}>
                                            <Text style={styles.sbodyText}>Cases: <Text style={{ color: "#a6a6a6" }}>+{numeral(summary["NewConfirmed"]).format('0,0').toString()}</Text></Text>
                                            <Text style={styles.sbodyText}>Deaths: <Text style={{ color: "#595959" }}>+{numeral(summary["NewDeaths"]).format('0,0').toString()}</Text></Text>
                                            <Text style={styles.sbodyText}>Recovered: <Text style={{ color: "#00cc66" }}>+{numeral(summary["NewRecovered"]).format('0,0').toString()}</Text></Text>
                                        </View>
                                        : <Text>Loading...</Text>
                                }
                            </Body>
                        </CardItem>
                        <CardItem footer />
                    </Card>
                </Content>
            </Container>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 26
    },
    sheaderText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700'
    },
    ssheaderText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '700'
    },
    bodyText: {
        flex: 1,
        color: "#a6a6a6",
        fontSize: 42,
        fontWeight: "700",
        alignSelf: 'center'
    },
    sbodyText: {
        flex: 1,
        fontSize: 22,
        textAlign: 'center',
        alignSelf: 'center'
    },
    bodyTextdark: {
        flex: 1,
        color: "#595959",
        fontSize: 42,
        fontWeight: "700",
        alignSelf: 'center'
    },
    bodyTextgreen: {
        flex: 1,
        color: "#00cc66",
        fontSize: 42,
        fontWeight: "700",
        alignSelf: 'center'
    },
    footText: {
        flex: 1,
        color: "green",
        fontSize: 16,
        textAlign: 'center'
    }
})

export default Home

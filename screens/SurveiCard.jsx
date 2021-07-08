import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'

export default function SurveiCard() {
 return (
     <View style={styles.container}>
         <Card style={{width: '100%'}}>
            <Card.Title style={{fontSize: 120}}>
                <Icon
                    name='archive-outline'
                    type='ionicon'
                    color='#517fa4'
                    size='80'
                    />
            </Card.Title>
            <Card.Divider/>
            {/* <Card.Image source={require('../images/pic2.jpg')}> */}
                <Text style={{marginBottom: 10, fontSize: 20, fontWeight: 'bold', align: 'center'}}>
                ASN BALANGAN
                </Text>
                <Text>
                    Saya Adalah Aparatur Sipil Negara Yang Berkerja Di Daerah Kabupaten Balangan
                </Text>
                <Button
                icon={<Icon name='check-circle' style={{marginRight: 15}} type="font-awesome" color='#ffffff' />}
                buttonStyle={{borderRadius: 10, marginTop: 10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Lanjutkan' />
            {/* </Card.Image> */}
        </Card>

        <Card style={{width: '100%'}}>
            <Card.Title style={{fontSize: 120}}>
                <Icon
                    name='archive-outline'
                    type='ionicon'
                    color='#FFC996'
                    size='80'
                    />
            </Card.Title>
            <Card.Divider/>
            {/* <Card.Image source={require('../images/pic2.jpg')}> */}
                <Text style={{marginBottom: 10, fontSize: 20, fontWeight: 'bold', align: 'center'}}>
                NON ASN BALANGAN
                </Text>
                <Text>
                    Saya Tidak Termasuk Aparatur Sipil Negara Daerah Kabupaten Balangan
                </Text>
                <Button
                icon={<Icon name='check-circle' style={{marginRight: 15}} type="font-awesome" color='#ffffff' />}
                buttonStyle={{borderRadius: 10, marginTop: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#FFC996'}}
                title='Lanjutkan' />
            {/* </Card.Image> */}
        </Card>
     </View>
 )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        marginHorizontal: 15
    },
});
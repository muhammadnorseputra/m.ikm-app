import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { ThemeProvider, Divider, Button, Avatar} from 'react-native-elements'


function CardBox (props) {
    return (
   <View style={[styles.box, {backgroundColor: props.bgColor}]}>
    <Text style={[styles.title, {color: props.textColor}]}>{props.title}</Text>
    <Divider orientation="horizontal" width={1} color="#ededed"/>
    <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        <View>
            <Text>
                {props.load ? <Loading/> : <Text style={[styles.subTitle, {color: props.textColor}]}>{props.iconBox}</Text>}
            </Text>
        </View>
       
        <View>
            <Text>
                {props.load ? <Loading/> : <Text style={[styles.subTitle, {color: props.textColor}]}>{props.value}</Text>}
            </Text>
        </View>
    </View>
   </View>
   )
}

function Loading() {
    return <ActivityIndicator size="large" color="teal"/>
}

export default function Dashboard ({navigation}) {
    const [arr, setArr] = useState([]);
    const [data, setData] = useState([]);
    const [konversi, setKonversi] = useState([]);
    const [periode, setPeriode] = useState([]);
    const [jk, setJk] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        const result = await axios.get(
            'https://web.bkppd-balangankab.info/api-skm/ikm',
        );
    
        setArr(result.data);
        setData(result.data['data']);
        setKonversi(result.data['data']['nilai_konversi']);
        setPeriode(result.data['periode']);
        setJk(result.data['jenis_kelamin']);
        setIsLoading(false);
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setIsLoading(true);
        fetchData().then(() => {
            setRefreshing(false);
            setIsLoading(false);
         });
    }, []);
    
    const normaliseValue = function(value, decimals = 2) {
        if (!value) {
          return <Loading/>
        }
        if (value === '.') {
          return value = '0.'
        }
        const parsed = parseFloat(value).toFixed(2)
        if (isNaN(parsed)) {
          return '0'
        }
        return parsed
      }

return (
    <ThemeProvider>
     <View style={styles.headerContainer}>
        <View style={styles.headerInner}>
            <View>
            <Avatar
                size="large"
                source={{
                uri:
                    'http://web.bkppd-balangankab.info/assets/images/logo.png',
                }}
            />
            </View>
            <View>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>IKM (Indeks Kepuasan Masyarakat)</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#444'}}>BKPPD BALANGAN</Text>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#2541B2', marginTop: 5}}>Dashboard</Text>
            </View>
        </View>
     </View>
     <SafeAreaView style={styles.container}>
     <ScrollView  style={{marginTop: -50, width: '100%'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View>
            <CardBox 
            load={isLoading}
            title={arr.tahun != undefined ? `IKM ${arr.tahun}` : 'Mohon tunggu ...'} 
            bgColor="#2541B2" 
            textColor="#fff"
            iconBox={normaliseValue(data.nilai_ikm)} 
            value={konversi.x}/>
        </View>
        
        <View>
        <CardBox 
         load={isLoading}
         title="Responden" 
         bgColor="#fff" 
         iconBox="R" 
         value={arr.jml_responden} />
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10}}>
            <View style={{backgroundColor: '#fff', borderStyle: 'solid', borderWidth: 1, borderColor: '#ededed', borderRadius: 10, flex:1, height: 180, marginRight: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[styles.title, {marginTop: 10}]}>Lakian</Text>
                <Text style={{fontSize: 60}}>{isLoading ? <Loading/> : jk.L}</Text>
            </View>
            <View style={{backgroundColor: '#fff', borderStyle: 'solid', borderWidth: 1, borderColor: '#ededed', borderRadius: 10, flex:1, height: 180, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[styles.title, {marginTop: 10}]}>Binian</Text>
                <Text style={{fontSize: 60}}>{isLoading ? <Loading/> : jk.P}</Text>
            </View>
        </View>
        
        <View>
         <CardBox
         load={isLoading} 
         title="Jumlah Layanan" 
         bgColor="#fff" 
         iconBox="L" 
         value={arr.jml_layanan} />
         <CardBox
         load={isLoading} 
         title="Jumlah Indikator" 
         bgColor="#fff" 
        //  iconBox={}  
         value={arr.jml_indikator} />
        </View>
        
        </ScrollView>
        <Button
            onPress={() => navigation.navigate('SurveiCard')}
            icon={{
                name: "check-circle",
                size: 18,
                color: "white"
            }}
            title="Isi Survei"
            buttonStyle={{backgroundColor: '#2541B2'}}
            containerStyle={{width: '100%', borderRadius: 10, marginTop: 10}}
        />
     </SafeAreaView>
     </ThemeProvider>
 )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal: 15
    },
    headerContainer: {
        backgroundColor: '#DEEDF0', 
        height:180
    },
    headerInner: {
        flex:2, 
        marginHorizontal: 15, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    box: {
        borderStyle: 'solid', borderWidth: 1, borderColor: '#ededed', 
        marginBottom: 10, 
        borderRadius: 10, 
        padding: 10, 
        width: '100%',
        height: 160
    }, 
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 5,
    },
    subTitle: {
        fontSize: 50,
        fontWeight: 'bold'
    }
});
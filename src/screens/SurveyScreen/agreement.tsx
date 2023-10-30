import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const Agreement = ({ onAgree }: { onAgree: any }) => {
    const [agree1, setAgree1] = React.useState(false);
    const [agree2, setAgree2] = React.useState(false);
    
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between' }}>
            <ScrollView style={{ padding: 20 }}>

                <Text style={styles.title}>1. Notice of Collection and Use of Personal Information (Required)</Text>

                <Text style={styles.medium}>Items of Personal Information Collected</Text>
                <Text style={styles.red}>{"(Required) Name, Affiliation, Residence Area,\nAddress, Contact Number (Mobile Phone Number, etc.),\nFinancial Institution Name, Account Number, and Account Holder"}</Text>
                <View style={{ height: 10 }}/>

                <Text style={styles.medium}>Purposes of Collection and Use of Personal Information</Text>
                <Text style={styles.normal}>- Management of research projects</Text>
                <Text style={styles.normal}>- Management of expert personnel for research projects</Text>
                <Text style={styles.normal}>- Various allowances payment and tax reporting</Text>
                <Text style={styles.normal}>- Proof of research performance such as issuance of certificates</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>Retention and Use Period of Personal Information</Text>
                <Text style={styles.red}>{"Collected personal information is retained for a quasi-permanent period for the management of research projects."}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>Right to Refuse Consent and Disadvantages of Refusing Consent</Text>
                <Text style={styles.normal}>{"You have the right to refuse consent to the collection and use of the above personal information. However, refusing consent for the required items may result in disadvantages such as hindrance in participation in research projects and various allowances payment."}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>Do you agree to the processing of unique identification information as described above?</Text>
                <TouchableOpacity onPress={() => setAgree1(!agree1)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    {agree1 ? <AntDesign name="checkcircle" size={24} color="rgba(25, 132, 213, 0.8)" /> : <AntDesign name="checkcircleo" size={24} color="gray" />}
                    <Text style={{ marginLeft: 10 }}>Agree</Text>
                </TouchableOpacity>
                <View style={{ height: 30 }} />


                <Text style={styles.title}>2. Notice of Collection and Use of Individual Voice Information (Required)</Text>

                <Text style={styles.medium}>Items of Individual Voice Information Collected</Text>
                <Text style={styles.red}>{"(Required) Collection of individual voice for unique identification"}</Text>
                <View style={{ height: 10 }}/>

                <Text style={styles.medium}>Purposes of Collection and Use of Individual Voice Information</Text>
                <Text style={styles.normal}>- Collection of data necessary for research projects</Text>
                <Text style={styles.normal}>- Collection of individual voice for algorithm enhancement work</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>Retention and Use Period of Individual Voice Information</Text>
                <Text style={styles.red}>{"Collected unique identification information is retained for a quasi-permanent period for the management of expert personnel for research projects."}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>Right to Refuse Consent and Disadvantages of Refusing Consent</Text>
                <Text style={styles.normal}>{"You have the right to refuse consent to the processing of the above unique identification information. However, refusing consent may result in disadvantages such as hindrance in participation in research projects and various allowances payment."}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>Do you agree to the processing of unique identification information as described above?</Text>
                <TouchableOpacity onPress={() => setAgree2(!agree2)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    {agree2 ? <AntDesign name="checkcircle" size={24} color="rgba(25, 132, 213, 0.8)" /> : <AntDesign name="checkcircleo" size={24} color="gray" />}
                    <Text style={{ marginLeft: 10 }}>Agree</Text>
                </TouchableOpacity>
                <View style={{ height: 50 }} />

            </ScrollView>
            <TouchableOpacity 
                style={{ height: 70, backgroundColor: agree1 && agree2 ? 'rgba(25, 132, 213, 0.8)' : 'gray', justifyContent: 'center', alignItems: 'center' }}
                onPress={agree1 && agree2 ? onAgree : () => {}}
                activeOpacity={0.8}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Agreement;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    medium: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    red: {
        fontSize: 14,
        lineHeight: 18,
        color: 'red',
        textDecorationLine: 'underline',
    },
    normal: {
        fontSize: 14,
        lineHeight: 18,
    }

});
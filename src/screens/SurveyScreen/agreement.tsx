import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const Agreement = ({ onAgree }: { onAgree: any }) => {
    const [agree1, setAgree1] = React.useState(false);
    const [agree2, setAgree2] = React.useState(false);
    
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between' }}>
            <ScrollView style={{ padding: 20 }}>

                <Text style={styles.title}>1. 개인정보 수집·이용 안내 (필수사항)</Text>

                <Text style={styles.medium}>수집하는 개인정보 항목</Text>
                <Text style={styles.red}>{"(필수) 성명, 소속기관명, 거주지역,\n주소지, 연락처(휴대전화번호 등),\n금융기관명, 계좌번호 및 예금주"}</Text>
                <View style={{ height: 10 }}/>

                <Text style={styles.medium}>개인정보 수집 및 이용 목적</Text>
                <Text style={styles.normal}>- 연구 과제 관리</Text>
                <Text style={styles.normal}>- 연구과제 전문가 인력관리</Text>
                <Text style={styles.normal}>- 각종 수당 지급 및 납세 신고</Text>
                <Text style={styles.normal}>- 증명 발급 등 연구 수행 증빙</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>개인정보의 보유 및 이용기간</Text>
                <Text style={styles.red}>{"수집된 개인정보는 연구과제관리를 위하여 준영구 보관합니다."}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>동의를 거부할 권리 및 동의 거부에 따른 불이익</Text>
                <Text style={styles.normal}>{"위의 개인정보 수집‧이용에 대한 동의를 거부할 권리가 있습니다. 그러나 필수항목에 대한 동의를 거부할 경우 해당 연구과제 참여 및 각종 수당 지급에 불이익이 발생할 수 있음을 알려드립니다."}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>위와 같이 고유식별정보를 처리하는데 동의하십니까?</Text>
                <TouchableOpacity onPress={() => setAgree1(!agree1)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    {agree1 ? <AntDesign name="checkcircle" size={24} color="rgba(25, 132, 213, 0.8)" /> : <AntDesign name="checkcircleo" size={24} color="gray" />}
                    <Text style={{ marginLeft: 10 }}>동의</Text>
                </TouchableOpacity>
                <View style={{ height: 30 }} />


                <Text style={styles.title}>2. 개인소리 수집·이용 안내 (필수사항)</Text>

                <Text style={styles.medium}>개인소리정보 항목</Text>
                <Text style={styles.red}>{"(필수) 고유 식별을 위한 개인 소리 수집"}</Text>
                <View style={{ height: 10 }}/>

                <Text style={styles.medium}>개인소리정보 수집 및 이용 목적</Text>
                <Text style={styles.normal}>- 연구과제 시 필요한 데이터 수집</Text>
                <Text style={styles.normal}>- 알고리즘 고도화 작업을 위한 개인 소리 수집</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>개인소리정보의 보유 및 이용기간</Text>
                <Text style={styles.red}>{"수집된 고유식별정보는 연구과제 전문가 인력관리를 위하여 준영구 보관합니다."}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>동의를 거부할 권리 및 동의 거부에 따른 불이익</Text>
                <Text style={styles.normal}>{"위의 고유식별정보 처리에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 해당 연구 과제 참여 및 각종 수당 지급에 불이익이 발생할 수 있음을 알려드립니다."}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.medium}>위와 같이 고유식별정보를 처리하는데 동의하십니까?</Text>
                <TouchableOpacity onPress={() => setAgree2(!agree2)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    {agree2 ? <AntDesign name="checkcircle" size={24} color="rgba(25, 132, 213, 0.8)" /> : <AntDesign name="checkcircleo" size={24} color="gray" />}
                    <Text style={{ marginLeft: 10 }}>동의</Text>
                </TouchableOpacity>
                <View style={{ height: 50 }} />

            </ScrollView>
            <TouchableOpacity 
                style={{ height: 70, backgroundColor: agree1 && agree2 ? 'rgba(25, 132, 213, 0.8)' : 'gray', justifyContent: 'center', alignItems: 'center' }}
                onPress={agree1 && agree2 ? onAgree : () => {}}
                activeOpacity={0.8}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>다음</Text>
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
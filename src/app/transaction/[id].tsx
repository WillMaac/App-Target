import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Transaction() {
    const params = useLocalSearchParams<{id:string}>()
    return(
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text>ID: {params.id}</Text>
            <Button title="Voltar" onPress={()=> router.back()}/>
        </View>
    )
}
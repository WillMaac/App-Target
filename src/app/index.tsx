import { router } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Index() {
    return(
        <View style= {{flex:1, justifyContent:"center", alignItems: "center"}}>
            <Text>Olá Mundo</Text>
            
            <Button title="Nova Meta" 
                        onPress={()=> router.navigate("/target")}/>
        </View>
    )
}
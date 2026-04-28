import { router } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Index() {
    return(
        <View style= {{flex:1, justifyContent:"center", alignItems: "center"}}>
            <Text>Olá Mundo</Text>
            
            <Button title="Nova Meta" 
                        onPress={()=> router.navigate("/target")}/>

                         <Button title="Transação" 
                        onPress={()=> router.navigate("/transaction/765")}/>

 <Button title="Progresso" 
                        onPress={()=> router.navigate("/in-progress/2")}/>
        </View>
    )
}
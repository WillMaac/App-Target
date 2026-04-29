import { HomeHeader } from "@/components/Home";
import {  View } from "react-native";


export default function Index() {
    return(
        <View style= {{flex:1}}>
<HomeHeader data={{total: "R$ 2.680,00"}}/>
          
        </View>
    )
}
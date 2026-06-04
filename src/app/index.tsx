import { HomeHeader } from "@/components/Home";
import {  View } from "react-native";
import {Target} from "@/components/Target"
import { List } from "@/components/List";
import { ImportMetaRegistry } from "expo/build/winter/ImportMetaRegistry";


const summary={
    total: "R$ 2.680,00",
    input: {label: "Entradas", value: "R$ 6,184.90"},
    output:{label: "Saidas", value: "R$ 6,184.90"}
}

const targets = [
    {
        id: "2",
    name: "Comprar uma cadeira ergonômica",
    percentage: "75%",
    current: "R$ 900,00",
    target: "R$ 1.200,00"
},

{
        id: "1",
    name: "App Watch",
    percentage: "50%",
    current: "R$ 580,00",
    target: "R$ 1.700,00"
},

{
        id: "3",
    name: "Fazer uma viagem para o Rio de Janeiro",
    percentage: "75%",
    current: "R$ 1200,00",
    target: " R$ 3.000,00"
}
]

export default function Index() {
    return(
        <View style= {{flex:1}}>
<HomeHeader data={summary}/>

<List
title="Metas"
data={[]}
keyExtractor={(item) => item.id}
renderItem={({item}) => <Target data={item}/>}
emptyMessage="Nenhuma meta. Toque em uma nova meta para criar."
contentContainerStyle={{paddingHorizontal: 24}}

/>   
        </View>
    )
}
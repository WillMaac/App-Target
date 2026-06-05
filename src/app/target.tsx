
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { router } from "expo-router";
import { View } from "react-native";
import {Button} from "@/components/Button"


export default function Target() {
    return(
        <View style={{flex:1, padding: 24, }}>
            <PageHeader 
            title="Meta"
            subtitle="Economize para alcançar sua meta financeira."
            />
            
            <View style={{marginTop: 32, gap: 24,}}>
                <Input
                label="Nome da meta"
                placeholder="Ex: Viagem para praia, Apple Watch"
                />
            <Button
            title="Salvar"
            />
            </View>
        </View>
    )
}
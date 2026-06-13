import {styles} from "./styles"
import {colors} from '@/theme'
import {Opition} from './option'
import {TransactionTypes} from "@/utils/TransactionsTypes"
import { View } from "react-native";

type Props={
  selected: TransactionTypes
  onChange:(type: TransactionTypes) => void
}

export function TransactionType({selected, onChange}:Props){
  return(
    <View style={styles.container}>
      <Opition
      icon="arrow-upward"
      title="Guardar"
      isSelected={selected === TransactionTypes.Input}
      selectedColor={colors.blue[500]}
      onPress={()=> onChange(TransactionTypes.Input)}
      />

      <Opition
      icon="arrow-downward"
      title="Resgatar"
      isSelected={selected === TransactionTypes.Output}
      selectedColor={colors.red[400]}
      onPress={()=> onChange(TransactionTypes.Output)}
      />
    </View>
  )
}
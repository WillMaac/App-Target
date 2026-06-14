import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { TransactionType } from '@/components/TransactionType';
import { useTransactionsDataBase } from '@/database/useTransactionsDatabase';
import { TransactionTypes } from '@/utils/TransactionsTypes';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

export default function Transaction() {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState(TransactionTypes.Input);
  const [isCreating, setCreating] = useState(false);
  const [observation, setObeservation] = useState('');

  const params = useLocalSearchParams<{ id: string }>();
  const transactionsDatabase = useTransactionsDataBase();

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert('Atenção', 'Preencha o valor');
      }

      setCreating(true);

      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1: amount,
        observation,
      })

      Alert.alert("Sucesso", "Transação salva com sucesso!", [{
        text: "Ok",
        onPress: ()=> router.back()
      }
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a transação.');
      console.log(error);
      setCreating(false);
    }
  }
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco"
          onChangeText={setObeservation}
        />
        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}

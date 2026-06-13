import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { Alert, View } from 'react-native';
import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useTargetDatabase } from '@/database/useTargetDatabase';

export default function Target() {
  const [isProcessing, setProcessing] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        'Atenção',
        'Preencha nome e o valor precisa ser maior que zero.',
      );
    }

    setProcessing(true);

    if (params.id) {
    } else {
      create();
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount })

      Alert.alert('Nova Meta', 'Meta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a meta.');
      console.log(error);
      setProcessing(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
          onChangeText={setName}
          value={name}
        />

        <CurrencyInput
          label="Valor alvo(R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}

import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { Alert, View } from 'react-native';
import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { useEffect, useState } from 'react';
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
      updete();
    } else {
      create();
    }
  }

  async function updete() {
    try {
      await targetDatabase.update({ id: Number(params.id), name, amount });
      Alert.alert('Sucesso!', 'Meta atualizada com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Não foi possível atualizar a meta.');
      console.log(error);
      setProcessing(false);
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount });

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

  async function fetcDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert('Não foi possível carregar os detalhes da meta.');
      console.log(error);
    }
  }
  useEffect(() => {
    if (params.id) {
      fetcDetails(Number(params.id));
    }
  }, [params.id]);
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

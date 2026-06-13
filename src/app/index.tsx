import { HomeHeader } from '@/components/Home';
import { View, StatusBar, Alert } from 'react-native';
import { Target, TargetProps } from '@/components/Target';
import { List } from '@/components/List';
import { Button } from '@/components/Button';
import { router, useFocusEffect } from 'expo-router';
import { useTargetDatabase } from '@/database/useTargetDatabase';
import { useCallback, useState } from 'react';
import { Loading } from '@/components/Loading';
import { numberToCurrency } from '@/utils/numberToCurrency';

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6.184,90' },
  output: { label: 'Saídas', value: 'R$ 6.184,90' },
};

export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const targetDatabase = useTargetDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: `${Number(item.percentage).toFixed(0)}%`,
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas.');
      console.log(error);
      return [];
    }
  }

  async function fetchData() {
    const targetData = await fetchTargets();
    setTargets(targetData);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />

      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.push(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta. Toque em uma nova meta para criar."
        contentContainerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.push('/target')} />
      </View>
    </View>
  );
}

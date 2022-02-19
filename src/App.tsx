import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Wrapper from './styles/App.styles';

interface IBitcoinDataProps {
  '15m': number;
  buy: number;
  last: number;
  sell: number;
  symbol: string;
}

interface Currencies {
  [key: string]: IBitcoinDataProps;
}

const getBCData = async (): Promise<Currencies> =>
  (await fetch('https://blockchain.info/ticker')).json();

const intervalTime = 30000;

const App: React.FunctionComponent = () => {
  const { data, isLoading, error, refetch } = useQuery<Currencies>(
    'bc-data',
    getBCData
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;
  return (
    <Wrapper>
      <p>Hello world</p>
    </Wrapper>
  );
};

export default App;

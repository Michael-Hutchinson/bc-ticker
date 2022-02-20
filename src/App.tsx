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
  const [currency, setCurrency] = useState('USD');
  const { data, isLoading, error, refetch } = useQuery<Currencies>(
    'bc-data',
    getBCData
  );

  const handleCurrencySelection = (e: any) => {
    setCurrency(e.currentTarget.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;
  return (
    <Wrapper>
      <>
        <h2>Bitcoin price</h2>
        <select value={currency} onChange={handleCurrencySelection}>
          {data &&
            Object.keys(data).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <div>
          <h2>
            {data && data[currency].symbol}
            {data && data[currency].last}
          </h2>
        </div>
      </>
    </Wrapper>
  );
};

export default App;

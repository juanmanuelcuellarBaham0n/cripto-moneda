import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useFetch, TApiResponse } from "../../hooks/useFetch";
import axios from "axios";

const Auth = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [marketsForCoin, setMarketsForCoin] = useState<any>(null);

  const [coinSelected, setCoinSelected] = useState<any>(null);
  const [marketSelected, setMarketSelected] = useState<any>(null);

  let navigate = useNavigate();

  const { logout } = useAuth();

  const { data }: TApiResponse = useFetch(
    "https://api.coinlore.net/api/tickers/"
  );

  useEffect(() => {
    if (data) {
      setCoins(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (coinSelected !== undefined) {
      let id = JSON.parse(coinSelected)?.id;
      axios
        .get(`https://api.coinlore.net/api/coin/markets/?id=${id}`)
        .then((response) => {
          setMarketsForCoin(response.data);
        });
    } else {
      setMarketsForCoin(null);
    }
  }, [coinSelected]);

  useEffect(() => {
    if (marketSelected !== undefined) {
      let id = JSON.parse(coinSelected)?.id;
      axios
        .get(`https://api.coinlore.net/api/coin/markets/?id=${id}`)
        .then((response) => {
          setMarketsForCoin(response.data);
        });
    } else {
      setMarketsForCoin(null);
    }
  }, [marketSelected]);

  const handleChangeCoin = (e: any) => {
    if (e.target.value == 'no-selected') {
      resetValues();
    } else {
      let coin = JSON.stringify(coins[e.target.value]);
      setCoinSelected(coin);
    }
  };

  const handleChangeMarket = (e: any) => {
    if (e.target.value !== 'no-selected') {
      let market = JSON.stringify(marketsForCoin[e.target.value]);
      setMarketSelected(market);
    }
  };

  const resetValues = () => {
    setCoinSelected(null);
    setMarketSelected(null);
  }

  const goToLogin = () => {
    navigate("/");
    logout();
  };

  return (
    <div className="container mt-3">
      <select
        onChange={handleChangeCoin}
        className="form-select"
        aria-label="Default select example"
      >
        <option key="no-selected" value={"no-selected"}>
          Selecciona
        </option>
        {coins.length > 0
          ? coins.map((coin: any, idx: number) => {
              return (
                <option key={coin.id} value={idx}>
                  {coin.symbol}
                </option>
              );
            })
          : null}
      </select>
      {coinSelected ? (
        <select
          onChange={handleChangeMarket}
          className="form-select"
          aria-label="Default select example"
        >
          <option key="no-selected" value={"no-selected"}>
          Selecciona
        </option>
          {marketsForCoin &&
            marketsForCoin.map((item: any, idx: number) => {
              return (
                <option key={idx} value={idx}>
                  {item.name}
                </option>
              );
            })}
        </select>
      ) : null}
      <br />
      <span>Moneda: </span>
      {coinSelected && marketSelected && JSON.parse(coinSelected)?.symbol}
      <br />
      <span>USD: </span>
      {coinSelected && marketSelected && JSON.parse(coinSelected)?.price_usd}
      <br />
      <br />
      <p>Cambio de moneda:</p>
      <span>Base: </span>{" "}
      {marketSelected && coinSelected && JSON.parse(marketSelected)?.base}
      <br />
      <span>Quote: </span>{" "}
      {marketSelected && coinSelected && JSON.parse(marketSelected)?.quote}
      <br />
      <span>USD: </span>{" "}
      {marketSelected && coinSelected && JSON.parse(marketSelected)?.price_usd}
      <br />
      <button
        type="button"
        onClick={goToLogin}
        className="btn btn-primary mt-3"
      >
        Logout
      </button>
    </div>
  );
};

export default Auth;

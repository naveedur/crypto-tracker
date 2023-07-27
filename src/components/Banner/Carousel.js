import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";
import { Container } from "react-bootstrap";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const carouselStyle = {
    height: "50%",
    display: "flex",
    alignItems: "center",
  };

  const carouselItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  };

  const profitTextStyle = {
    fontWeight: 500,
  };

  const greenProfitStyle = {
    color: "green",
  };

  const redProfitStyle = {
    color: "red",
  };

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;
    const profitStyle = profit ? greenProfitStyle : redProfitStyle;

    return (
      <Link className={carouselItemStyle} to={`/coins/${coin.id}`} key={coin.id}>
        <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
        <div>
          {coin?.symbol}&nbsp;
          <span style={{ ...profitTextStyle, ...profitStyle }}>
            {profit ? "+" : "-"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </div>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Container style={carouselStyle}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </Container>
  );
};

export default Carousel;

import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { Container, Row, Col, Image } from "react-bootstrap";
import CoinInfo from "../components/CoinInfo";
import {SingleCoin} from "../config/api"

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <div className="d-flex justify-content-center aligin-item-center">Loading...</div>;

  return (
    <Container className="pt-5">
      <Row>
        <Col className="mb-4" md={4} style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <Image
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            className="mb-3"
          />
          <h3 className="font-weight-bold">{coin?.name}</h3>
          <p className="font-weight-bold" dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] }}>
            
          </p>
          <div>
            <span className="font-weight-bold">Rank:</span>&nbsp; &nbsp;
            <span>{numberWithCommas(coin?.market_cap_rank)}</span>
          </div>
          <div>
            <span className="font-weight-bold">Current Price:</span>&nbsp;
            &nbsp;
            <span>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </span>
          </div>
          <div>
            <span className="font-weight-bold">Market Cap:</span>&nbsp; &nbsp;
            <span>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </span>
          </div>
        </Col>
        <Col md={8} style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <CoinInfo coin={coin} />
        </Col>
      </Row>
    </Container>
  );
};

export default CoinPage;

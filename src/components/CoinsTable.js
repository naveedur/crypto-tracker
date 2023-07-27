import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Form, Spinner, Pagination } from "react-bootstrap";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const rowStyle = {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  };

  const containerStyle = {
    textAlign: "center",
  };

  const headingStyle = {
    margin: 18,
    fontFamily: "Montserrat",
  };

  const textFieldStyle = {
    marginBottom: 20,
    width: "100%",
  };

  const tableHeadStyle = {
    backgroundColor: "#EEBC1D",
  };

  const tableCellStyle = {
    color: "black",
    fontWeight: "700",
    fontFamily: "Montserrat",
  };

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <Container style={containerStyle}>
      <h4 style={headingStyle}>Cryptocurrency Prices by Market Cap</h4>
      <Form.Control
        label="Search For a Crypto Currency.."
        placeholder="Search For a Crypto Currency.."
        style={textFieldStyle}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <Spinner animation="border" variant="gold" style={{ margin: "20px auto" }} />
      ) : (
        <Table striped bordered hover responsive>
          <thead style={tableHeadStyle}>
            <tr>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                <th
                  style={tableCellStyle}
                  key={head}
                  align={head === "Coin" ? "" : "right"}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((row) => {
                const profit = row.price_change_percentage_24h > 0;
                const profitStyle = {
                  color: profit ? "rgb(14, 203, 129)" : "red",
                  fontWeight: 500,
                };
                return (
                  <tr
                    onClick={() => navigate(`/coins/${row.id}`)}
                    style={rowStyle}
                    key={row.name}
                  >
                    <td
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: 15,
                      }}
                    >
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10 }}
                      />
                      <div
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                          }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: "darkgrey" }}>{row.name}</span>
                      </div>
                    </td>
                    <td align="right">
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </td>
                    <td align="right" style={profitStyle}>
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td align="right">
                      {symbol}{" "}
                      {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                      M
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}

      <Pagination style={{ padding: 20, width: "100%", display: "flex", justifyContent: "center" }}>
        <Pagination.Prev
          onClick={() => {
            setPage(page - 1);
            window.scroll(0, 450);
          }}
          disabled={page === 1}
        />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={() => {
            setPage(page + 1);
            window.scroll(0, 450);
          }}
          disabled={page === Math.ceil(handleSearch().length / 10)}
        />
      </Pagination>
    </Container>
  );
};

export default CoinsTable;

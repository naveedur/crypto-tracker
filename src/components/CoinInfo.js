import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Spinner } from "react-bootstrap";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const formatTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  };

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    // Convert the timestamp to a readable date format
    const formattedData = data.prices.map((coin) => ({
      time: formatTimestamp(coin[0]),
      price: coin[1],
    }));
    setFlag(true);
    setHistoricData(formattedData);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div className="container">
      {!historicData || !flag ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: 250 }}>
          <Spinner animation="border" variant="gold" />
        </div>
      ) : (
        <>
          <ResponsiveContainer width="90%" height={400}>
            <LineChart data={historicData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                dataKey="price"
                name={`Price (Past ${days} Days) in ${currency}`}
                type="monotone"
                stroke="#EEBC1D"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setFlag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Function to generate data for AM modulation
const generateAmData = () => {
  const data = []
  const samples = 200 // Number of data points
  const carrierFreq = 5 // Carrier frequency
  const messageFreq = 0.5 // Message signal frequency
  const modulationIndex = 0.7 // Modulation index (should be < 1)

  for (let i = 0; i < samples; i++) {
    const t = (i / samples) * 2 * Math.PI // Time variable
    const carrier = Math.cos(carrierFreq * t)
    const message = Math.cos(messageFreq * t)
    const amSignal = (1 + modulationIndex * message) * carrier

    data.push({
      time: i,
      portadora: carrier,
      sinal: message,
      'Sinal AM': amSignal,
    })
  }
  return data
}

export function AmPlot() {
  const data = generateAmData()

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" label={{ value: 'Tempo', position: 'insideBottomRight', offset: -5 }}/>
        <YAxis label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="portadora"
          stroke="#8884d8"
          dot={false}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="sinal"
          stroke="#82ca9d"
          dot={false}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="Sinal AM"
          stroke="#ff7300"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
} 
// Trend Chart - STRICT IMPLEMENTATION
import './TrendChart.css';

const TrendChart = ({ data, label, color = '#a855f7' }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="trend-chart">
      <h4 className="chart-label">{label}</h4>
      <div className="chart-container">
        <div className="chart-bars">
          {data.map((item, index) => (
            <div key={index} className="chart-bar-wrapper">
              <div 
                className="chart-bar"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  background: color
                }}
              >
                <span className="bar-value number">{item.value}</span>
              </div>
              <span className="bar-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendChart;

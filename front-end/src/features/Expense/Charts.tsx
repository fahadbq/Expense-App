import { Card } from "antd";
import { useState, useEffect } from "react";
import "./Expense.css";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useAppSelector } from "../../app/store/hooks";

interface DataEntry {
  name: string;
  value: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 5) * cos;
  const my = cy + (outerRadius + 5) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: "10px" }}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 5}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        // style={{ fontSize: "8px" }}
      >{`$${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

// Component
const Charts = ({
  data,
  categoriesData,
}: {
  data: DataEntry[];
  categoriesData: DataEntry[];
}) => {
  const [calculatedPercentage, setCalculatedPercentage] = useState<
    { amount?: number }[]
  >([]);

  const [calculateCategoryExpense, setcalculateCategoryExpense] = useState<
    { expenseAmount?: number; name: string }[]
  >([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const { budgetData } = useAppSelector((state: any) => {
    return state.settings;
  });

  // Calculate Expense spent
  useEffect(() => {
    if (data.length > 0 && budgetData.length > 0) {
      const calculateExpenses = data.reduce((prev: any, curr: any) => {
        return prev + curr.amount;
      }, 0);

      const totalExpensePercentage = (
        (calculateExpenses / budgetData[0]?.amount) *
        100
      ).toFixed(2);

      const remainingPercentage = 100 - Number(totalExpensePercentage);

      setCalculatedPercentage([
        { amount: Number(totalExpensePercentage) },
        { amount: remainingPercentage },
      ]);
    }
  }, [data, budgetData]);

  // Caclulate Expense based on each category
  useEffect(() => {
    if (data.length > 0 && categoriesData.length > 0) {
      const result = categoriesData
        .map((category: any) => {
          const expenses = data.filter((item: any) => {
            return category._id === item.categoryId;
          });

          const calculateExpenses = expenses.reduce((prev: any, curr: any) => {
            return prev + curr.amount;
          }, 0);

          if (expenses.length > 0) {
            return {
              ...category,
              expenses: expenses,
              expenseAmount: calculateExpenses,
            };
          }

          return undefined;
        })
        .filter((item: any) => item !== undefined);

      setcalculateCategoryExpense(result);
    }
  }, [data, categoriesData]);

  useEffect(() => {
    if (data.length <= 0) {
      setCalculatedPercentage([
        { amount: 0 },
        { amount: budgetData[0]?.amount || 0 },
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (data.length <= 0) {
      setcalculateCategoryExpense([
        { expenseAmount: budgetData[0]?.amount || 0, name: "Uncategoried" },
      ]);
    }
  }, [data, categoriesData]);

  return (
    <div className="card-container">
      <Card
        title="Budget Overview"
        bordered={false}
        style={{ width: 380, backgroundColor: "#E4EBF5 " }}
        className="card-item"
      >
        <div className="chart-container">
          <PieChart width={180} height={160}>
            <Pie
              data={calculatedPercentage}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {data.map((entry: object, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
          <div>
            <h3 style={{ marginBottom: "25px" }}>
              Total Budget
              <div>{`$${
                budgetData[0]?.amount ? budgetData[0]?.amount : "0"
              }`}</div>
            </h3>

            <h3>
              Total Expenses
              <div>{`$${
                calculatedPercentage[0]?.amount
                  ? calculatedPercentage[0]?.amount
                  : "0"
              }`}</div>
            </h3>
          </div>
        </div>
      </Card>

      <Card
        title="Category wise split (Total Expenses)"
        bordered={false}
        style={{ width: 380, backgroundColor: "#E4EBF5 " }}
        className="card-item"
      >
        <div className="chart-container">
          <PieChart width={340} height={160}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={calculateCategoryExpense}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={60}
              fill="#8884d8"
              dataKey="expenseAmount"
              onMouseEnter={(entry, index) => {
                setActiveIndex(index);
              }}
            />
          </PieChart>
        </div>
      </Card>
    </div>
  );
};

export default Charts;

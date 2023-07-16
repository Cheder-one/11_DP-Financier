import {
  FaDollarSign,
  FaEuroSign,
  FaPoundSign,
  FaYenSign,
  FaRubleSign,
  FaLiraSign,
  FaMoneyBillAlt,
  FaChartLine,
  FaChartBar,
  FaCoins,
  FaWallet,
  FaCreditCard,
  FaCalculator,
  FaExchangeAlt,
  FaPiggyBank,
  FaChartPie,
  FaReceipt,
  FaMoneyCheck,
  FaMoneyBillWave,
  FaBriefcase,
  FaBalanceScale,
  FaHandHoldingUsd,
  FaPercent,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaHandshake,
  FaTrophy
} from "react-icons/fa";

const iconsArray = [
  FaDollarSign,
  FaEuroSign,
  FaPoundSign,
  FaYenSign,
  FaRubleSign,
  FaLiraSign,
  FaMoneyBillAlt,
  FaChartLine,
  FaChartBar,
  FaCoins,
  FaWallet,
  FaCreditCard,
  FaCalculator,
  FaExchangeAlt,
  FaPiggyBank,
  FaChartPie,
  FaReceipt,
  FaMoneyCheck,
  FaMoneyBillWave,
  FaBriefcase,
  FaBalanceScale,
  FaHandHoldingUsd,
  FaPercent,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaHandshake,
  FaTrophy
];

const formattedIconsArray = iconsArray.map((Icon, index) => {
  const key = `icon-${index}`;
  return <Icon />;
});

export default formattedIconsArray;
console.log(formattedIconsArray);

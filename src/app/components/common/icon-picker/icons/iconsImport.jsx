import { chunk } from "lodash";
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
import EmptyIcon from "./emptyIcon";

const iconsArray = [
  EmptyIcon,
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

const chunkedIconsArray = (num = 5) => chunk(iconsArray, num);

export default chunkedIconsArray;

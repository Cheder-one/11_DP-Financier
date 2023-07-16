import React, { useState, useRef, useEffect } from "react";
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
import Table from "react-bootstrap/Table";
import { IconContext } from "react-icons";

const IconPicker = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const iconPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        iconPickerRef.current &&
        !iconPickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const iconOptions = [
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

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    // onSelect(icon);
    setIsOpen(false);
  };

  return (
    <div className="icon-picker" ref={iconPickerRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Select an Icon</button>
      {isOpen && (
        <Table striped bordered hover>
          <tbody>
            {iconOptions
              .reduce((rows, Icon, index) => {
                if (index % 5 === 0) {
                  rows.push([]);
                }
                rows[rows.length - 1].push(
                  <td
                    key={index}
                    className={`icon-option ${
                      selectedIcon === Icon ? "selected" : ""
                    }`}
                    onClick={() => handleIconSelect(Icon)}
                  >
                    <div className="flex justify-center">
                      <Icon />
                    </div>
                  </td>
                );
                return rows;
              }, [])
              .map((row, index) => (
                <tr key={index}>{row}</tr>
              ))}
          </tbody>
        </Table>
      )}
      {selectedIcon && (
        <IconContext.Provider
          value={{ size: "20px", className: "react-icons" }}
        >
          {selectedIcon}
        </IconContext.Provider>
      )}
    </div>
  );
};

export default IconPicker;

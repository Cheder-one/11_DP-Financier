/* eslint-disable no-irregular-whitespace */
import PropTypes from "prop-types";
import { pick, values } from "lodash";
import Marquee from "react-fast-marquee";

import { useLocalStorage } from "../../../hooks";

const MarqueeComponent = ({ user, actualQuotes }) => {
  const { currencies } = user;
  const [isMarquee, setIsMarquee] = useLocalStorage({
    marquee: true
  });

  const toggleMarqueeHide = () => {
    setIsMarquee((prev) => !prev);
  };

  const userCurrenciesRates = values(
    pick(
      actualQuotes.Valute,
      currencies.map((cur) => cur.code)
    )
  );

  const marqueeData = userCurrenciesRates.map((exchRate) => {
    let { CharCode, Value } = exchRate;
    Value = Value.toFixed(2);
    return ` ${CharCode}: ${Value} `;
  });

  return (
    <div
      className="flex justify-center cursor-pointer h-6 my-3"
      onClick={toggleMarqueeHide}
    >
      {isMarquee && (
        <Marquee pauseOnHover={true}>{marqueeData.join("")}</Marquee>
      )}
    </div>
  );
};

MarqueeComponent.propTypes = {
  user: PropTypes.object.isRequired,
  actualQuotes: PropTypes.object.isRequired
};

export default MarqueeComponent;

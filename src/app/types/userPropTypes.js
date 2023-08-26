import PropTypes from "prop-types";

const userPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  gender: PropTypes.oneOf(["male", "female"]).isRequired,
  avatarUrl: PropTypes.string.isRequired,
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      entity: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      transactions: PropTypes.arrayOf(PropTypes.string.isRequired)
        .isRequired,
      icon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
      }).isRequired,
      comment: PropTypes.string.isRequired
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      accounts: PropTypes.arrayOf(PropTypes.string.isRequired)
        .isRequired,
      transactions: PropTypes.arrayOf(PropTypes.string.isRequired)
        .isRequired
    })
  ).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["income", "expense"]).isRequired,
      account: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired
    })
  ).isRequired,
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    })
  ).isRequired
});

export default userPropTypes;

export const ERRORS = {
  usernameAlreadyExist: {
    code: "username_already_exist",
    message: "Username already exist",
  },
  accountHasItems: {
    code: "account_has_items",
    message: "Items can only be inserted once",
  },
  infectedAccount: {
    code: "infected_account",
    message: "This account is infected and cannot perform this operation",
  },
  cannotReportTwice: {
    code: "cannot_report_twice",
    message: "A user cannot report other twice",
  },
  invalidTradePoints: {
    code: "invalid_trade_points",
    message: "The points between the items does not match"
  },
  notEnoughItems: {
    code: "not_enough_items",
    message: "The quantity of items exceeds those available",
  },
  traderInfected: {
    code: "trader_infected",
    message: "At least one of the accounts is infected. The trade cannot proceed",
  },
}

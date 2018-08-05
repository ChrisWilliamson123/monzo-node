class MonzoClient {
  constructor(accountId, accessToken) {
    this.accountId = accountId;
    this.accessToken = accessToken;
  }

  setBudgetingPot(pot) {
    this.budgetingPot = pot;
  }
}

module.exports = MonzoClient;

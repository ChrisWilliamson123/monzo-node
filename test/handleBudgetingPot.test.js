const handleBudgetingPot = require('../src/handleBudgetingPot');
const potTransaction = require('../src/api/potTransaction');
const setOverspendAmount = require('../src/api/setOverspendAmount');

jest.mock('../src/api/setOverspendAmount');

describe('Handle budgeting pot', () => {
  const monzoClient = {budgetingPot: {id: 'id123'}};

  describe('Under budget', () => {
    it('Should deposit into the budgeting pot if the user has saved money', async () => {
      jest.spyOn(potTransaction, 'deposit').mockImplementation(() => {});
      const amountSaved = 1000;
      await handleBudgetingPot(amountSaved, monzoClient);
      expect(potTransaction.deposit.mock.calls[0][2]).toEqual(1000);
    });
  });

  describe('Over budget', () => {
    beforeAll(() => {
      jest.spyOn(potTransaction, 'withdraw').mockImplementation(() => {});

    });

    afterEach(() => {
      potTransaction.withdraw.mockReset();
    });

    it('Should withdraw from the budgeting pot if the user has overspent.', async () => {  
      const amountSaved = -1000;
      await handleBudgetingPot(amountSaved, monzoClient);
      expect(potTransaction.withdraw.mock.calls[0][2]).toEqual(1000);
    });

    describe('Amount overspent is over budgeting pot balance', () => {
      beforeAll(() => {
        setOverspendAmount.mockImplementation(() => {});
      });

      afterEach(() => {
        setOverspendAmount.mockReset();
      });
      it('Should withdraw the full amount budgeting pot balance if the amount overspent is more than the budgeting pot balance.', async () => {
        const budgetingPotBalance = 1000;
        const amountSaved = -2000;
        await handleBudgetingPot(amountSaved, monzoClient, budgetingPotBalance, {});
        expect(potTransaction.withdraw.mock.calls[0][2]).toEqual(budgetingPotBalance);
      });
      
      it('Should set the total monthly overspend amount to the difference between the budgeting pot balance and the daily overspend.', async () => {
        const budgetingPotBalance = 1000;
        const amountSaved = -2000;
        await handleBudgetingPot(amountSaved, monzoClient, budgetingPotBalance, {});
        expect(setOverspendAmount.mock.calls[0][0]).toEqual(budgetingPotBalance - Math.abs(amountSaved));
      });
    });
  })
});
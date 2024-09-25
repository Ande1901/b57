function calculateInvestment() {
  let investor = 1000000000;

  // invest 1
  let bankDeposit = 350000000;
  // invest 2
  let stateBonds = 650000000;

  // sisa dari invest 1 dan 2
  let left = investor - bankDeposit - stateBonds;

  // invest 3 ke perusahaan A
  let stockA = left * 0.35;
  // invest 4 ke perusahaan B (sisa)
  let stockB = investor - bankDeposit - stateBonds - stockA;

  let bankDepositReturn = bankDeposit * (1 + 0.035) * 2;
  let stateBondsReturn = stateBonds * (1 + 0.13) * 2;

  let stockAReturn = stockA * (1 + 0.145) * 2;
  let stockBReturn = stockB * (1 + 0.125) * 2;

  let totalAmount =
    bankDepositReturn + stateBondsReturn + stockAReturn + stockBReturn;

  console.log(
    `The total amount of money the investor will have after 2 years is: ${totalAmount.toFixed(
      2
    )}`
  );
}

calculateInvestment();

const { TEST_TRANSACTION_DISABLED, ALLOW_DANGEROUS_UPDATES } = process.env

if (TEST_TRANSACTION_DISABLED) {
  console.log('TEST_TRANSACTION_DISABLED', !!TEST_TRANSACTION_DISABLED)
}

const isTransactionDisabled = !!TEST_TRANSACTION_DISABLED

const testConfig = {
  allowDangerousUpdates: !isTransactionDisabled || !!ALLOW_DANGEROUS_UPDATES,
  isTransactionDisabled,
}

export default testConfig

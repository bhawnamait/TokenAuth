class ExternalPaymentServiceAdapter {
  constructor(externalPaymentService) {
    this.external = externalPaymentService;
  }

  createCharge({ customerId, amount, currency }) {
    // Forward the charge to the external service and return the new chargeId
    return this.external.createCharge({
      customerId,
      value: amount,
      currency,
    });
  }

  cancelCharge({ chargeId }) {
    this.external.cancelCharge({ chargeId });
  }

  updateCharge({ chargeId, amount, currency }) {
    // 1. Find the charge using listCharges
    const charges = this.external.listCharges();
    const charge = charges.find((c) => c.chargeId === chargeId);

    if (charge) {
      // 2. Cancel the existing charge
      this.external.cancelCharge({ chargeId });

      // 3. Recreate the charge with same customerId and new amount/currency
      return this.createCharge({
        customerId: charge.customerId,
        amount,
        currency,
      });
    }
  }

  listCharges() {
    // Transform charges from ExternalPaymentService format to required format
    const rawCharges = this.external.listCharges();

    return rawCharges.map((c) => ({
      chargeId: c.chargeId,
      customerId: c.customerId,
      amount: c.value,
      currency: c.currency,
    }));
  }
}

module.exports = ExternalPaymentServiceAdapter;

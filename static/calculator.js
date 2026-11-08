/**
 * Kzzakupbot Hub - Calculator Core Business Logic
 */

function calculateTender(data) {
    const costPrice = parseFloat(data.costPrice) || 0;
    const markupPercent = parseFloat(data.markupPercent) || 0;
    const taxSystem = data.taxSystem || 'snr_ip';
    const bidSecurityPercent = parseFloat(data.bidSecurityPercent) || 0;
    const contractSecurityPercent = parseFloat(data.contractSecurityPercent) || 0;
    const bankCommissionPercent = parseFloat(data.bankCommissionPercent) || 0;

    const markupMultiplier = 1 + (markupPercent / 100);
    const offerPrice = costPrice * markupMultiplier;
    const grossProfit = offerPrice - costPrice;

    let taxAmount = 0;
    if (taxSystem === 'nds') {
        taxAmount = offerPrice * 0.12;
    } else if (taxSystem === 'snr_ip') {
        taxAmount = offerPrice * 0.03;
    } else {
        taxAmount = grossProfit > 0 ? grossProfit * 0.20 : 0;
    }

    const bidSecurity = offerPrice * (bidSecurityPercent / 100);
    const contractSecurity = offerPrice * (contractSecurityPercent / 100);
    const totalGuaranteesAmount = bidSecurity + contractSecurity;
    const bankCommission = totalGuaranteesAmount * (bankCommissionPercent / 100);

    const netProfit = grossProfit - taxAmount - bankCommission;
    const margin = offerPrice > 0 ? (netProfit / offerPrice) * 100 : 0;

    return {
        offerPrice: Math.round(offerPrice * 100) / 100,
        grossProfit: Math.round(grossProfit * 100) / 100,
        taxAmount: Math.round(taxAmount * 100) / 100,
        bidSecurity: Math.round(bidSecurity * 100) / 100,
        contractSecurity: Math.round(contractSecurity * 100) / 100,
        bankCommission: Math.round(bankCommission * 100) / 100,
        netProfit: Math.round(netProfit * 100) / 100,
        margin: Math.round(margin * 100) / 100
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateTender };
}

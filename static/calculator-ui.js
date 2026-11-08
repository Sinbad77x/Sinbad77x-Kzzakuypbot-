/**
 * Kzzakupbot Hub - Calculator UI Controller
 */

document.addEventListener('DOMContentLoaded', function () {
    const calculateBtn = document.getElementById('calculateBtn');
    if (!calculateBtn) return;

    function formatMoney(amount) {
        return new Intl.NumberFormat('ru-RU').format(amount) + ' ₸';
    }

    function performCalculation() {
        const costPrice = document.getElementById('costPrice').value;
        const markupPercent = document.getElementById('markupPercent').value;
        const taxSystem = document.getElementById('taxSystem').value;
        const bidSecurityPercent = document.getElementById('bidSecurityPercent').value;
        const contractSecurityPercent = document.getElementById('contractSecurityPercent').value;
        const bankCommissionPercent = document.getElementById('bankCommissionPercent').value;

        const inputData = {
            costPrice,
            markupPercent,
            taxSystem,
            bidSecurityPercent,
            contractSecurityPercent,
            bankCommissionPercent
        };

        if (typeof calculateTender === 'function') {
            const results = calculateTender(inputData);

            document.getElementById('resOfferPrice').textContent = formatMoney(results.offerPrice);
            document.getElementById('resTaxAmount').textContent = formatMoney(results.taxAmount);
            document.getElementById('resGrossProfit').textContent = formatMoney(results.grossProfit);
            document.getElementById('resNetProfit').textContent = formatMoney(results.netProfit);
            document.getElementById('resMargin').textContent = results.margin.toFixed(2) + '%';
            document.getElementById('resBidSecurity').textContent = formatMoney(results.bidSecurity);
            document.getElementById('resContractSecurity').textContent = formatMoney(results.contractSecurity);
            document.getElementById('resBankCommission').textContent = formatMoney(results.bankCommission);
        }
    }

    calculateBtn.addEventListener('click', performCalculation);
    
    const inputs = document.querySelectorAll('.calc-form input, .calc-form select');
    inputs.forEach(input => {
        input.addEventListener('input', performCalculation);
    });

    performCalculation();
});

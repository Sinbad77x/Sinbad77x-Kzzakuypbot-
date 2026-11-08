/**
 * Kzzakupbot Hub - Calculator Unit Tests
 */

const { calculateTender } = require('./calculator.js');

function runTests() {
    console.log('Running Kzzakupbot Calculator Tests...');

    const testInput = {
        costPrice: 1000000,
        markupPercent: 20,
        taxSystem: 'snr_ip',
        bidSecurityPercent: 1,
        contractSecurityPercent: 3,
        bankCommissionPercent: 2
    };

    const res = calculateTender(testInput);

    assert(res.offerPrice === 1200000, `Expected offerPrice 1200000, got ${res.offerPrice}`);
    assert(res.grossProfit === 200000, `Expected grossProfit 200000, got ${res.grossProfit}`);
    assert(res.taxAmount === 36000, `Expected taxAmount 36000, got ${res.taxAmount}`);
    assert(res.bidSecurity === 12000, `Expected bidSecurity 12000, got ${res.bidSecurity}`);
    assert(res.contractSecurity === 36000, `Expected contractSecurity 36000, got ${res.contractSecurity}`);

    console.log('All Calculator Tests Passed Successfully!');
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(`Test Failed: ${message}`);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    runTests();
}

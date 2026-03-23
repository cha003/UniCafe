const bcrypt = require('bcryptjs');

async function test() {
    try {
        console.log('Starting bcrypt test with undefined...');
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(undefined, salt);
        console.log('Hash generated:', hash);
    } catch (err) {
        console.error('Bcrypt error (expected if undefined is invalid):', err.message);
    }
}

test();

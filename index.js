const Koa = require('koa');
const {RippleAPI} = require('ripple-lib');

const lastLedgerSpan = process.env.RIPPLED_LAST_LEDGER_SPAN || 1;
const url = process.env.RIPPLED_URL || "ws://localhost:5006";
const app = new Koa();

const api = new RippleAPI({server: url});

app.use(async function check(ctx) {
    try {
        await api.connect();

        const info = await api.getServerInfo();

        if (!info.completeLedgers) {
            ctx.status = 500;
            return;
        }

        const version = await api.getLedgerVersion();
        const ledger = await api.getLedger(version);
        const time = new Date(ledger.closeTime);

        const checkTime = new Date(new Date().setMinutes(new Date().getMinutes() - lastLedgerSpan));

        console.log(`time: ${time} > ${checkTime} = ${time > checkTime}`);
        console.log(`ledgers: ${info.completeLedgers}`);

        ctx.status = info.completeLedgers && time > checkTime ? 200 : 500;
        ctx.body = {
            completeLedgers: info.completeLedgers
        };
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            error: err.toString()
        };
    }
});

app.listen(3000);

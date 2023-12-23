import t from 'tap';
import createPlugin from '@extism/extism';

const plugin = await createPlugin('./build/assembly/plugin.wasm', {
  useWasi: true,
  runInWorker: false,
});

async function run(input) {
  try {
    await plugin.call('run', input);
    const out = await plugin.call('peek');
    return out.string();
  } catch (e) {
    console.error(e);
  } finally {
    await plugin.call('reset');
  }
}

t.beforeEach(async () => {
  await plugin.call('_start');
});

t.test('create', async (t) => {
  t.same(await run('0xDEADBEEF'), 0xdeadbeef);

  t.same(await run('-0xDEADBEEF'), '-0xDEADBEEF');
});

t.test('add', async (t) => {
  t.same(await run('0xDEAD0000 0xBEEF +'), 0xdeadbeef);

  t.same(await run('0x8 0x5 +'), 0xd);

  t.same(await run('-0x8 -0x5 +'), '-0xD');
});

t.test('sub', async (t) => {
  t.same(await run('0xDEADBEEF 0xBEEF -'), 0xdead0000);

  t.same(await run('0x8 0x5 -'), 0x3);

  t.same(await run('-0x8 -0x5 -'), '-0x3');
});

t.test('mul', async (t) => {
  t.same(await run('0xDEADBEEF 0x100 *'), 0xdeadbeef00);
});

t.test('div', async (t) => {
  t.same(await run('0xDEADBEEF 0x2 /'), 0x6f56df77);

  t.same(await run('0xDEADBEEF 16 /'), 0xdeadbee);

  t.same(await run('0xDEADBEEF 0 /'), 0);
});

t.test('fact', async (t) => {
  t.same(
    await run(`
        /* define factorial */
        fact: dup 1 > [ dup 1 - fact * ] ? ;
      
        100 fact
    `),
    0x1b30964ec395dc24069528d54bbda40d16e966ef9a70eb21b5b2943a321cdf10391745570cca9420c6ecb3b72ed2ee8b02ea2735c61a000000000000000000000000n,
  );
});

t.end();

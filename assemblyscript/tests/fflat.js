import t from "tap";
import createPlugin from "@extism/extism";

const plugin = await createPlugin("./build/src/plugin.wasm", { useWasi: true, runInWorker: false });

async function run(input) {
  try {
    await plugin.call("run", input);
    const out = await plugin.call("peek");
    return out.string();
  } catch (e) {
    console.error(e);
  } finally {
    await plugin.call("reset");
  }
}

t.beforeEach(async () => {
  await plugin.call("_start");
});

t.test("create", async (t) => {
  t.same(
    await run('0xDEADBEEF'),
    0xDEADBEEF
  );

  t.same(
    await run('-0xDEADBEEF'),
    "-0xDEADBEEF"
  );
});

t.test("add", async (t) => {
  t.same(
    await run('0xDEAD0000 0xBEEF +'),
    0xDEADBEEF
  );

  t.same(
    await run('0x8 0x5 +'),
    0xD
  );

  t.same(
    await run('-0x8 -0x5 +'),
    '-0xD'
  );
});

t.test("sub", async (t) => {
  t.same(
    await run('0xDEADBEEF 0xBEEF -'),
    0xDEAD0000
  );

  t.same(
    await run('0x8 0x5 -'),
    0x3
  );

  t.same(
    await run('-0x8 -0x5 -'),
    '-0x3'
  );
});

t.test("mul", async (t) => {
  t.same(
    await run('0xDEADBEEF 0x100 *'),
    0xDEADBEEF00
  );
});

t.test("div", async (t) => {
  t.same(
    await run('0xDEADBEEF 0x2 /'),
    0x6F56DF77
  );

  t.same(
    await run('0xDEADBEEF 16 /'),
    0xdeadbee
  );
});

t.test("fact", async (t) => {
  t.same(
    await run(`
        /* define factorial */
        fact: dup 1 > [ dup 1 - fact * ] ? ;
      
        100 fact
    `),
    0x1B30964EC395DC24069528D54BBDA40D16E966EF9A70EB21B5B2943A321CDF10391745570CCA9420C6ECB3B72ED2EE8B02EA2735C61A000000000000000000000000n
  );
});

t.end();

const payload = {
  fullName: 'Trae Bot',
  email: `trae-bot+${Date.now()}@example.com`,
  phone: '+5511999999999',
  projectType: 'saas',
  referralSource: 'cli',
};

async function main() {
  try {
    const post = await fetch('http://localhost:5500/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const postText = await post.text();
    console.log('POST', post.status, postText);
    const get = await fetch('http://localhost:5500/api/early-access');
    const getText = await get.text();
    console.log('GET', get.status, getText);
  } catch (e) {
    console.error('ERR', e?.message ?? String(e));
    process.exit(1);
  }
}

main();

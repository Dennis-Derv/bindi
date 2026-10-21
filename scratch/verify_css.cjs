async function check() {
  const htmlRes = await fetch('http://localhost:3000');
  const html = await htmlRes.text();
  const cssMatch = html.match(/href="([^"]+\.css)"/);
  console.log('HTML Status:', htmlRes.status);
  console.log('Found CSS Link:', cssMatch ? cssMatch[1] : 'NONE');
  if (cssMatch) {
    const cssRes = await fetch('http://localhost:3000' + cssMatch[1]);
    const css = await cssRes.text();
    console.log('CSS HTTP Status:', cssRes.status);
    console.log('CSS File Size:', css.length, 'bytes');
    console.log('Header styles:', css.includes('.bkc-header'));
    console.log('Gold brand highlight (#FBBF24):', css.includes('FBBF24'));
    console.log('Hero image card styles:', css.includes('.hero-main-image-card'));
    console.log('Hero title text-5xl responsive rule:', css.includes('text-5xl'));
    console.log('Card styles:', css.includes('.bkc-card'));
    console.log('Button styles:', css.includes('.btn-primary'));
  }
}

check().catch(console.error);

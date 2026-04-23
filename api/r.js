import { appendFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const ROUTES = {
  marketing: 'https://gerald-cmo.vercel.app/?ref=upwork&job=marketing-strategy',
  gtm:       'https://gerald-cmo.vercel.app/?ref=upwork&job=gtm-strategy',
  hubspot:   'https://gerald-cmo.vercel.app/?ref=upwork&job=hubspot-architecture',
  ghl:       'https://gerald-cmo.vercel.app/?ref=upwork&job=ghl-architecture',
  consult:   'https://gerald-cmo.vercel.app/?ref=upwork&job=consulting',
};

export default function handler(req, res) {
  const { route } = req.query;
  const destination = ROUTES[route];

  if (!destination) {
    res.status(404).send('Not found');
    return;
  }

  const visit = {
    timestamp: new Date().toISOString(),
    route: `/${route}`,
    destination,
    userAgent: req.headers['user-agent'] || 'unknown',
    ip: (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown',
    referer: req.headers['referer'] || '',
  };

  // Structured log — visible in Vercel Dashboard → Functions → Logs
  console.log(JSON.stringify(visit));

  // Best-effort file append to /tmp (per-container, not persistent across cold starts)
  try {
    appendFileSync(join(tmpdir(), 'visits.json'), JSON.stringify(visit) + '\n');
  } catch (_) {}

  res.redirect(302, destination);
}

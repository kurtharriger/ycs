import debug from 'debug';
import { ensureAdmin } from '../scripts/ensure-admin';

const log = debug('ycs:env');

interface BuildInfo {
  environment: string;
  vercelEnv: string;
  commit: string;
  branch: string;
  region: string;
  buildTime: string;
}

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await ensureAdmin();

    const buildInfo: BuildInfo = {
      environment: process.env.NODE_ENV || 'development',
      vercelEnv: process.env.VERCEL_ENV || 'local',
      commit: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
      branch: process.env.VERCEL_GIT_COMMIT_REF || 'local',
      region: process.env.VERCEL_REGION || 'local',
      buildTime: new Date().toISOString(),
    };

    log('\n=== Build Information ===');
    log('Environment:', buildInfo.environment);
    log('Vercel Environment:', buildInfo.vercelEnv);
    log('Commit:', buildInfo.commit);
    log('Branch:', buildInfo.branch);
    log('Region:', buildInfo.region);
    log('Build Time:', buildInfo.buildTime);
    log('========================\n');

    // Log environment variables with sensitive values masked
    log('\n=== Environment Variables ===');
    const envVars: [string, string | undefined][] = Object.entries(process.env)
      .sort(([a], [b]) => a.localeCompare(b));

    for (const [key, value] of envVars) {
      const isSensitive =
        key.includes('SECRET') ||
        key.includes('KEY') ||
        key.includes('TOKEN') ||
        key === 'DATABASE_URL';
      log(`${key}: ${isSensitive ? '*****' : value}`);
    }
    log('========================\n');
  }
}
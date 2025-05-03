import debug from 'debug';

const log = debug('ycs:env');

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const buildInfo = {
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
    const envVars = Object.entries(process.env)
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
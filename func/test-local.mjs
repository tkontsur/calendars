import { handler as dailyHandler } from './daily/index.mjs';
import { handler as weeklyHandler } from './weekly/index.mjs';

const dryRunEvent = { dryRun: true };
const testType = process.argv[2] || 'both';

async function testLocal() {
  if (testType === 'daily' || testType === 'both') {
    console.log('=== Testing Daily Handler (Dry Run) ===');
    try {
      await dailyHandler(dryRunEvent);
    } catch (error) {
      console.error('Daily handler error:', error);
    }
  }

  if (testType === 'weekly' || testType === 'both') {
    console.log('\n=== Testing Weekly Handler (Dry Run) ===');
    try {
      await weeklyHandler(dryRunEvent);
    } catch (error) {
      console.error('Weekly handler error:', error);
    }
  }
}

testLocal();
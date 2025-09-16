import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import os from 'node:os';
import config from './allure-config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function saveHistory() {
  const baseTmp = await fs.mkdtemp(path.join(os.tmpdir(), 'allure-history-'));
  const allureResultsDir = path.resolve(__dirname, '../reports/allure-report');
  const historySourcePath = path.join(allureResultsDir, config.historyDir);

  try {
    execSync(`git clone -b ${config.branchName} ${config.repoUrl} ${baseTmp}`, { stdio: 'inherit' });

    const historyDestPath = path.join(baseTmp, config.historyDir);

    if (await fs.pathExists(historyDestPath)) {
      await fs.remove(historyDestPath);
    }
    await fs.copy(historySourcePath, historyDestPath);

    execSync('git add .', { cwd: baseTmp, stdio: 'inherit' });
    execSync('git config user.email "41898282+github-actions[bot]@users.noreply.github.com"', { cwd: baseTmp, stdio: 'inherit' });
    execSync('git config user.name "github-actions[bot]"', { cwd: baseTmp, stdio: 'inherit' });
    execSync(`git commit -m "Update history"`, { cwd: baseTmp, stdio: 'inherit' });
    execSync(`git push origin ${config.branchName}`, { cwd: baseTmp, stdio: 'inherit' });

    console.log('History успешно сохранена в удалённый репозиторий.');
  } catch (error) {
    console.error('Ошибка при сохранении history:', error);
  } finally {
    await fs.remove(baseTmp);
  }
}

await saveHistory();

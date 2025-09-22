import 'dotenv/config';

const config = Object.freeze({
  repoUrl: process.env.TEST_ALLURE_REPO_URL,
  branchName: process.env.TEST_ALLURE_BRANCH_NAME ?? 'allure-history',
  historyDir: process.env.TEST_ALLURE_HISTORY_DIR ?? 'history'
});

export default config;

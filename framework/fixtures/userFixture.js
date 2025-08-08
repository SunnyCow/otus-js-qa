export const generateUserCredentials = () => {
  return {
    username: `user_${Date.now()}`,
    password: 'Pa$$word1'
  }
}

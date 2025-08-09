const generateUserCredentials = (options = {}) => {
  const { valid = true, reason = 'weakPassword' } = options;

  if (!valid) {
    switch (reason) {
      case 'weakPassword':
        return {
          username: `user_${Date.now()}`,
          password: '123'
        };
      case 'missingUsername':
        return {
          username: '',
          password: 'Pa$$word1'
        };
      case 'missingPassword':
        return {
          username: `user_${Date.now()}`,
          password: ''
        };
      default:
        throw new Error(`Unknown invalid credentials reason: ${reason}`);
    }
  }

  return {
    username: `user_${Date.now()}`,
    password: 'Pa$$word1'
  };
};

export default generateUserCredentials;

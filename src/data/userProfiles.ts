// Static user profile data for test/demo use

// Helper function to get the correct image path based on environment
const getImagePath = (imagePath: string) => {
  const basePath = import.meta.env.PROD ? '/selfheal-demo-app' : '';
  return `${basePath}${imagePath}`;
};

export const userProfiles = [
  {
    userId: 1,
    email: 'demo1@example.com',
    password: 'Qw!@d..**~cwcw',
    name: 'Demo One',
    avatar: getImagePath('/static/avatars/demo1.svg')
  },
  {
    userId: 2,
    email: 'demo2@example.com',
    password: '@qqwdSC1eEem__o12',
    name: 'Demo Two',
    avatar: getImagePath('/static/avatars/demo2.svg')
  },
  {
    userId: 3,
    email: 'testuser@example.com',
    password: 'test!!1-23Z~ww',
    name: 'Test User',
    avatar: getImagePath('/static/avatars/testuser.svg')
  }
];

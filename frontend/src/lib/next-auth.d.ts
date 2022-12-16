// This file was created so that I could override the Next-Auth type declaration file
// that was needed so that I can in the index.tsx file I can have access to the username prop
// {data?.user?.username ? <Chat /> : <Auth /> }

// With this file we are combining the interfaces below with the interfaces of the actual Next.js
// next-auth library

import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
  }
}

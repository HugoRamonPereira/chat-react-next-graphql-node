import React from 'react';
import type { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { Box } from '@chakra-ui/react';
import Chat from '../components/Chat';
import Auth from '../components/Auth/Auth';
import { Session } from 'next-auth';

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log('Here is the session', session);

  const reloadSession = () => {};

  return (
    <Box>
      { session?.user?.username ?
        <Chat /> : <Auth session={session} reloadSession={reloadSession} />
      }
    </Box>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  };
}

export default Home;

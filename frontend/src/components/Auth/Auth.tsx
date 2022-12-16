import React, { useState } from 'react';
import { Button, Center, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');

  const onSubmit = async () => {
    try {
      /**
       * create username mutation to send our username to the GraphQL API
       */
    } catch (error) {
      console.log('onSubmit error', error);

    }
  };

  return (
    <div>
      <Center height='100vh' border='1px solid red'>
        <Stack align='center' spacing={10}>
          {session ? (
            <>
              <Text fontSize={'3xl'}>Create a username</Text>
              <Input
                placeholder='Enter a username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Button width='100%' onClick={onSubmit}>Save</Button>
            </>
          ) : (
            <>
              <Text fontSize='3xl'>MessengerQL</Text>
              <Button onClick={() => signIn('google')} leftIcon={<Image height='20px' src='/images/google.png' />}>Continue with Google</Button>
            </>
          ) }
        </Stack>
      </Center>
    </div>
  );
};

export default Auth;

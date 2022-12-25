import React, { useState } from 'react';
import { Button, Center, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import UserOperations from '../../graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from '../../../utils/types';
import { toast } from 'react-hot-toast';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');
  const [createUsername, { loading, error }] = useMutation<CreateUsernameData, CreateUsernameVariables>(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        throw new Error(error);
      }

      toast.success('Username successfully created! 🚀');

      // Reload session to get new username
      reloadSession();

    } catch (error: any) {
      toast.error(error?.message);
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

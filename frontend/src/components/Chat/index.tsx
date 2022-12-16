import { Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import * as React from 'react';

interface IChatProps {
}

const Chat: React.FunctionComponent<IChatProps> = (props) => {
  return (
    <div>
      Chat Component
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Chat;

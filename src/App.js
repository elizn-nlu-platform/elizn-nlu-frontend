import './App.css';
import { AppContext, getDefaultContext } from './context/app-context';
import MainRouter from './pages/router';
import Amplify, { Auth, Hub } from "aws-amplify";
import awsExports from './aws-exports';
import { loadAuthUserInfo } from './services/auth/auth-service';
import { useEffect, useState } from 'react';

Amplify.configure(awsExports);
Auth.configure({
  storage: window.sessionStorage
});

function App() {
  const [authUserInfo, setAuthUserInfo] = useState();

  async function loadContext() {
    const authUser = await loadAuthUserInfo();
    if (authUser) {
      setAuthUserInfo(authUser);
    }
  }

  async function init() {
    // How listens
    Hub.listen('auth', async (data) => {
      const event = data.payload.event;
      if (event === "signIn") {
        await loadContext();
      } else if (event === "signOut") {
        // TODO
      }
    });
    await loadContext();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <AppContext.Provider value={{ ...getDefaultContext(), authUserInfo }}>
      <MainRouter />
    </AppContext.Provider>
  );
}

export default App;

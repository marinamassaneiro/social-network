import {
  loginUserEmail,
  logout,
  signinGoogle,
  signinUserEmail,
  statusUser,
} from '../src/lib/auth.js';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '../src/lib/exports.js';

jest.mock('../src/lib/exports.js');

describe('function of Firebase should been called once', () => {
  it('login using email', () => {
    loginUserEmail();
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  it('new user using email', () => {
    signinUserEmail();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  it('new user or login using Google', () => {
    signinGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });

  it('to know if is logged', () => {
    statusUser();
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  });

  it('logout', () => {
    logout();
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

describe('function of Firebase should been called with parameters', () => {
  const email = 'abobrinha@frita.com';
  const password = 'abobrinha123';

  it('login using email and password', () => {
    loginUserEmail(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({
      currentUser: {
        displayName: 'acelga',
        userUid: 'uid',
      },
    }, email, password);
  });

  it('new user using email and password', () => {
    signinUserEmail(email, password);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({
      currentUser: {
        displayName: 'acelga',
        userUid: 'uid',
      },
    }, email, password);
  });
});

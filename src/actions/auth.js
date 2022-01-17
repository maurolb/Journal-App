import Swal from 'sweetalert2';
import { getAuth, updateProfile ,signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { googleProvider } from '../firebase/firebase-config';
import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = ( email, password ) => {
  return ( dispatch ) => {

    dispatch( startLoading() );

    const auth = getAuth();
    return signInWithEmailAndPassword( auth, email, password )
      .then( ({ user }) => {
        dispatch( login( user.uid, user.displayName ) );
        dispatch( finishLoading() );
      })
      .catch(( err ) => {
        console.log( err );
        dispatch( finishLoading() );
        Swal.fire('Error', err.message, 'error');
      });
  };
};

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
  return ( dispatch ) => {
    const auth = getAuth();
    createUserWithEmailAndPassword( auth, email, password )
      .then( async ({ user }) => {
        await updateProfile( user, {displayName: name} );
        dispatch( login( user.uid, user.displayName ) );
      })
      .catch(( err ) => {
        console.log( err );
        Swal.fire('Error', err.message, 'error');
      });
      
  };
};

export const startGoogleLogin = () => {
  return ( dispatch ) => {
    const auth = getAuth();
    signInWithPopup( auth, googleProvider )
      .then(({ user }) => {
          dispatch( login( user.uid, user.displayName ) );
      });
  };
};

export const login = ( uid, displayName ) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName
    }
  };
};

export const startLogout = () => {
  return async ( dispatch ) => {
    await getAuth().signOut();
    dispatch( logout() );
    dispatch( noteLogout() );
  };
};

export const logout = () => ({
  type: types.logout
});
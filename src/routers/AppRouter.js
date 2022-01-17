import React, { useEffect, useState } from "react";
import { getAuth } from 'firebase/auth';
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRoutes } from "./AuthRoutes";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";

 
export const AppRouter = () => {

  const dispatch = useDispatch();
  const [checking, setChecking] = useState( true );
  const [isLogedIn, setIsLogedIn] = useState( false );

  useEffect(() => {
    getAuth().onAuthStateChanged( async (user) => {
      if( user?.uid ) {
        dispatch( login( user.uid, user.displayName ) );
        setIsLogedIn(true);
        dispatch( startLoadingNotes( user.uid ) );
      } else {
        setIsLogedIn( false );
      }
      setChecking( false );
    });
    
  }, [ dispatch, setChecking, setIsLogedIn ]);


  if( checking ) {
    return (
      <h1>Wait...</h1>
    );
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/auth/*"
            element={
              <PublicRoute isLogedIn={ isLogedIn }>
                <AuthRoutes /> 
              </PublicRoute>
            } 
          />

          <Route path="/"
            element={
              <PrivateRoute isLogedIn={ isLogedIn }>
                <JournalScreen />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
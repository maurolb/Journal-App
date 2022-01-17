import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector( state => state.auth );

  const handleLogout = () => {
    dispatch( startLogout() );
  };

  const handleAddNew = () => {
    dispatch( startNewNote() );
  };

  return (
    <aside className="journal__sidebar">

      <div className="journal__sidebar-navbar">
        <h3 className="mt-1">
          <span> { name }</span>
        </h3>

        <button 
          className="btn-logout"
          onClick={ handleLogout }
        >
          Logout <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>

      <div 
        className="journal__new-entry"
        onClick={ handleAddNew }
      >
        <i className="far fa-calendar-plus fa-3x"></i>
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />

    </aside>
  );
};

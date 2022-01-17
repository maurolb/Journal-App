import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active } = useSelector( state => state.notes );
  const noteDate = moment( active.date );

  const handleSave = () => {
    dispatch( startSaveNote( active ) );
  };

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if( file ) {
      dispatch( startUploading( file ) );
    };
  };

  return (
    <div className="notes__appbar">
      <span>{ noteDate.format('MMMM Do YYYY') }</span>

      <input 
        id="fileSelector"
        type="file"
        name="file"
        style={{display: 'none'}}
        onChange={ handleFileChange }
      />

      <div>
        <button 
          className="btn"
          onClick={ handlePictureClick }
        >
          <i className="fas fa-camera"></i> Picture
        </button>

        <button 
          className="btn"
          onClick={ handleSave }
        >
          <i className="fas fa-camera"></i> Save
        </button>
      </div>
    </div>
  );
};

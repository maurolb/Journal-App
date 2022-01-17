import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config({ 
  cloud_name: 'digxsi0uh', 
  api_key: '928725175596561', 
  api_secret: '_yqw68VOURRIBp-dfhyreSz_dHo',
  secure: true
});


describe('Tests on fileUpload', () => {
  
  test('should upload a file and return the url', async () => {
    const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png');
    const blob = await resp.blob();

    const file = new File( [blob], 'foto.png' );
    const url = await fileUpload( file );

    expect( typeof url ).toBe( 'string' );
  
    // borrar las imagenes subidas del test
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");
    await cloudinary.v2.api.delete_resources( imageId, {}, ()=> {});
  });

  test('should return an error', async () => {
    const file = new File( [], 'foto.png' );
    const url = await fileUpload( file );

    expect( url ).toBe( null );
  });


});

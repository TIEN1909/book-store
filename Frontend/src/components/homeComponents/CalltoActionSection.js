import React from 'react';
import VideoBg from './Book.mp4';
const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      {/* <div className="container"> */}
      {/* <div className="row"> */}
      <div className="col-xs-12">
        <div className="subscribe-wrapper">
          <div className="subscribe-head">
            <video src={VideoBg} autoPlay loop muted />
          </div>
          <div className="subscribe-bottom">
            <h2>Join Our Newsletter</h2>
            <p>
              Signup to be the first to hear about exclusive deals, special
              offers and upcoming collections
            </p>
            <form className="form-section">
              <input
                placeholder="Enter email for weelky newsletter..."
                name="email"
                type="email"
              />
              <input value="Subscribe" name="subscribe" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default CalltoActionSection;

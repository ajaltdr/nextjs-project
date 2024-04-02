import AppStore from '../public/app_store.webp';
import GooglePlay from '../public/google_play.webp';

import Image from "next/image";

const ReferFriend = () => {
  return (
    <>
      <div className="wrapper">
        <div className="header-container">
          <div className="header">
            <div className="header-msg">Hello, Guest</div>
            <div className="header-welcome">
              <p>Welcome to City Express Japan!</p>
            </div>
          </div>
        </div>
        <div className="body-container">
          <div className="box box-default">
            <div className="box-body p-5">
              <section className="form-v1-container">
                <h5 className="text-center" style={{ color: '#0A4F9E' }}>
                  Referral Code
                </h5>
                <div id="referral-code" className="referral-code">
                  {/* {searchParams.get('referral_code')} */}
                </div>
                <p className="mt-2" style={{ color: '#0A4F9E' }}>
                  Please use this refer code while registering City Express Japan Mobile
                  Application.
                </p>
                {/* <div className="copy">
                  <Button className="copy-btn" onClick={copyReferralCode}>
                    Copy To Clipboard
                  </Button>
                </div> */}
              </section>
            </div>
          </div>
        </div>
        <div className="link-container">
          <h3 className="link-title">Download "City Express Japan" mobile application</h3>
          <a
            href="https://play.google.com/store/apps/details?id=jp.co.Ctxpress.Eapplication.p00011a"
            target="_blank"
            rel="noreferrer"
          >
             <Image
              src={GooglePlay}
              alt="Google Logo"
              className="img"
              width={100}
              height={24}
              priority
            />
          </a>
          <a
            href="https://apps.apple.com/us/app/city-express-japan/id1512891887?l=ja&ls=1&fbclid=IwAR1RYcBqZK0KFYPWM5fd0LSvbhDXPCnIsecLgbu2SWRTXv5zfmCvidPWPwc"
            target="_blank"
            rel="noreferrer"
          >
             <Image
              src={AppStore}
              alt="AppStore Logo"
              className="img"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default ReferFriend;
import './sidebar.scss';
import Logo from '../../assets/svg/logo.svg';
import Mode from '../../assets/svg/icon-moon.svg';
import Sun from '../../assets/svg/icon-sun.svg';
import Profile from '../../assets/img/image-avatar.jpg';

function Sidebar(props) {
  return (
    <div className="sidebar row flex-direction-colomun justify-content-between">
      <div className="logo center">
        <img src={Logo} alt="logo" width="40" />
      </div>

      <div className="admin-profil">
        <div
          className={`${
            props.switch ? 'display-none' : 'display-block'
          } mode-dark-light`}
          onClick={props.toggleswitch}
        >
          <img src={Sun} alt="mode dark light" width="20" />
        </div>
        <div
          className={`${
            props.switch ? 'display-block' : 'display-none'
          } mode-dark-light`}
          onClick={props.toggleswitch}
        >
          <img src={Mode} alt="mode dark light" width="20" />
        </div>
        <div className="admin-photo">
          <img src={Profile} alt="Profile" width="40" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

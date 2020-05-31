import React from 'react';

import './Header.css'

const Header = () => {

    return(  
      <div className="Header">
        <div class="header-grid">
          <div class="title">
              Shopping 
          </div>

          <div class="user">
              <span class="profile-icon"> J </span>
              João Vitor
          </div>
        </div>
      </div>
    );
  };

export default Header;
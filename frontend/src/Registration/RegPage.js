// Page code
import TextBox from "./textBox";
import React, { useState } from 'react';
import './RegPage.css';

function RegPage() {
    return (
      <div className="Registration">
        WELCOME, COMPLETE YOUR LOGIN FOOL <br></br>
        <label>
          <TextBox placeholder="Username" />
        </label>
        <label>
          <TextBox placeholder="Password" />
        </label>
        <label>
          <TextBox placeholder="Confirm Password" />
        </label>
      </div>
    );
}

export default RegPage;
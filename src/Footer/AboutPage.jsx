import React from 'react'
import '../Styles/AboutPage.css'

function AboutPage() {
  return (
    <>
     <div className="containerAbout">
      <div className="boxAbout1">
        <div id='abt'>
          About us
        </div>
        <div id='desc'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique voluptate eveniet asperiores, ipsam blanditiis unde quas aliquid expedita commodi quibusdam doloribus eius aliquam! Laudantium nostrum cum explicabo quibusdam, inventore maiores.</p>
        </div>
      </div>
      <div className="boxAbout2">
         <div id='abt'>
          Upcoming Features
        </div>
        <div id='desc'>
          <ul>
            <li>Like button</li>
            <li>Comment feature</li>
            <li>Share button</li>
            <li>Play count</li>
          </ul>
        </div>
      </div>  
    </div> 
    </>
  )
}

export default AboutPage

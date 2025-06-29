import React from 'react';
import './MakingProcess.css';
import bgImage from '../../Images/6d51188c5a7c19ed0b6085fedb40b1604d7e12cd.png';

const MakingProcess = () => {
  return (
    <section
      className="making-process-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay" />
      <div className="content">
        <h2>Dive deep in our making process<br />right from dough to delivery</h2>
        <button className="read-more-btn">Read More</button>
      </div>
    </section>
  );
};

export default MakingProcess;

import React from "react";
import "./Footer.css";
import {FaGithubSquare} from "react-icons/lib/fa";


const footer = () => (
    <footer className="footer">
      <p>Copyright &copy; 2018 Code Battle
        <a
            href="https://github.com/maxrjohnson23/Code-Battle"
            target="_blank" rel="noopener noreferrer">
          <FaGithubSquare size={20} className="github-icon"/>
        </a>
      </p>
      <p>Created by:
        <a href="https://github.com/maxrjohnson23" target="_blank"
           rel="noopener noreferrer">MJ</a>
        <a href="https://github.com/zachtjohnson01" target="_blank"
           rel="noopener noreferrer">ZJ</a>
        <a href="https://github.com/pat-knight" target="_blank"
           rel="noopener noreferrer">PK</a>
        <a href="https://github.com/Gaccettu" target="_blank"
           rel="noopener noreferrer">GA</a>
      </p>
    </footer>
);

export default footer;
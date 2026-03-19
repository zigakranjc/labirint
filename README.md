<div align="center">
  <h1>THE JUNGLE MAZE</h1>
  <p><i>An interactive web-based maze game featuring dynamic animations and collision logic.</i></p>
</div>

<hr />

<h2>Project Overview</h2>
<p>
  <strong>The Jungle Maze</strong> is a browser-based experience where a lion navigates a complex environment, interacting with various African animals including a giraffe, zebra, and antelope. The project focuses on path-finding visualization and sprite-based animation within a 2D canvas.
</p>

<h2>Project Structure</h2>
<p>The project is organized into the following directory tree:</p>

<pre>
labirint/
├── audio/
│   ├── music.mp3
│   └── roar.mp3
├── img/
│   ├── labirintResitev1.png
│   ├── labirintResitev.png
│   ├── labirint.png
│   ├── spritesheetLion.png
│   ├── spritesheetGiraffe.png
│   ├── spritesheetZebra.png
│   ├── spritesheetAntelope.png
│   ├── spritesheetWaves.png
│   ├── antilopaStop.png
│   ├── zebraStop.png
│   ├── zirafaStop.png
│   ├── zadiAbout.png
│   ├── zadi1.png
│   ├── naslov.png
│   └── ozadje1.jpg
├── index.html
├── script.js
└── style.css
</pre>

<h2>Technical Features</h2>
<ul>
  <li><strong>Canvas Rendering:</strong> Utilizes the HTML5 Canvas API for high-performance 2D graphics and frame-by-frame sprite animation.</li>
  <li><strong>Path Logic:</strong> Characters follow a predefined coordinate array (path) with adjustable speeds and delays.</li>
  <li><strong>Collision System:</strong> Integrated distance-based collision detection that triggers visual overlays and sound effects.</li>
  <li><strong>Dynamic Environment:</strong> Includes a CSS-animated "river patch" that uses keyframe shifts on a background sprite.</li>
  <li><strong>Audio Integration:</strong> Features background music and situational sound effects managed via JavaScript.</li>
</ul>

<h2>File Descriptions</h2>
<table>
  <tr>
    <th>File/Folder</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>index.html</code></td>
    <td>Defines the document structure, audio elements, and external library links.</td>
  </tr>
  <tr>
    <td><code>style.css</code></td>
    <td>Handles the jungle theme, layout positioning, and the river flow animation.</td>
  </tr>
  <tr>
    <td><code>script.js</code></td>
    <td>Contains the core game loop, animation logic, and collision detection.</td>
  </tr>
  <tr>
    <td><code>audio/</code></td>
    <td>Stores all sound assets including background loops and effect clips.</td>
  </tr>
  <tr>
    <td><code>img/</code></td>
    <td>Contains textures, character spritesheets, and UI background images.</td>
  </tr>
</table>

<h2>Dependencies</h2>
<p>
  The project utilizes the following external resources:
</p>
<ul>
  <li><strong>SweetAlert2:</strong> For stylized pop-up notifications and end-game alerts.</li>
  <li><strong>Google Fonts:</strong> The "Griffy" font family for thematic typography.</li>
  <li><strong>Tenor Embed:</strong> Used for displaying contextual GIFs during collision events.</li>
</ul>

<h2>How to Run</h2>
<ol>
  <li>Clone the repository to your local machine.</li>
  <li>Ensure the <code>labirint/</code> folder structure is preserved so internal paths remain valid.</li>
  <li>Open <code>index.html</code> in any modern web browser.</li>
  <li>Click the <strong>Start</strong> button to initialize the game and enable audio playback.</li>
</ol>

<hr />

<div align="center">
  <p>Developed by Žiga Kranjc</p>
</div>

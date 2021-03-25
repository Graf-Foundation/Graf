<template>
  <div>
    <div class="about-section">
      <h1>About Us Page</h1>
      <p>We Make Graf</p>
    </div>
    <h2 style="text-align:center">Developers</h2>
      
      
    <div class="ui six column grid">
      <div class="column">
        <div class="ui fluid card">
          <div class="image">
            <img src="../assets/Face2.png" >
          </div>
          <div class="content">
            <a class="header">James Weir</a>
            <div class="meta">
              <span class="date">Project Leader</span>
            </div>
            <div class="description">
              Some info would be here I guess.
            </div>
          </div>
          <div class="extra content">
            <a href="mailto:weirj@rpi.edu">
              <i class="at icon"></i>
              weirj@rpi.edu
            <br>
            </a>
            <a href="https://github.com/JPWeir">
              <i class="github square icon"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="ui fluid card">
          <div class="image">
            <img src="../assets/Face2.png" >
          </div>
          <div class="content">
            <a class="header">Nicholas Desmarais</a>
            <div class="meta">
              <span class="date">Dad</span>
            </div>
            <div class="description">
              Info.
            </div>
          </div>
          <div class="extra content">
            <a href="mailto:desman@rpi.edu">
              <i class="at icon"></i>
              desman@rpi.edu
            <br>
            </a>
            <a href="https://github.com/N-Desmarais">
              <i class="github square icon"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="ui fluid card">
          <div class="image">
            <img src="../assets/Face2.png" >
          </div>
          <div class="content">
            <a class="header">Max Herman</a>
            <div class="meta">
              <span class="date">Node Guy</span>
            </div>
            <div class="description">
              Info.
            </div>
          </div>
          <div class="extra content">
            <a href="mailto:hermam3@rpi.edu">
              <i class="at icon"></i>
              hermam3@rpi.edu
            <br>
            </a>
            <a href="https://github.com/max-herman">
              <i class="github square icon"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="ui fluid card">
          <div class="image">
            <img src="../assets/Face2.png" >
          </div>
          <div class="content">
            <a class="header">Max Stewart Steele</a>
            <div class="meta">
              <span class="date">Made this page again</span>
            </div>
            <div class="description">
              Info.
            </div>
          </div>
          <div class="extra content">
            <a href="mailto:stewam8@rpi.edu">
              <i class="at icon"></i>
              stewam8@rpi.edu
            <br>
            </a>
            <a href="https://github.com/maxstewartsteele">
              <i class="github square icon"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="ui fluid card">
          <div class="image">
            <img src="../assets/Face2.png" >
          </div>
          <div class="content">
            <a class="header">Joseph Casente</a>
            <div class="meta">
              <span class="date">Fell down the stairs</span>
            </div>
            <div class="description">
              Info.
            </div>
          </div>
          <div class="extra content">
            <a href="mailto:casenj@rpi.edu">
              <i class="at icon"></i>
              casenj@rpi.edu
            <br>
            </a>
            <a href="https://github.com/jcasente">
              <i class="github square icon"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="ui fluid card">
          <div class="image">
            <img src="../assets/Face2.png" >
          </div>
          <div class="content">
            <a class="header">Micheal Fitzgerald</a>
            <div class="meta">
              <span class="date">Design :(</span>
            </div>
            <div class="description">
                Info.
            </div>
          </div>
          <div class="extra content">
            <a href="mailto:fitzgm6@rpi.edu">
              <i class="at icon"></i>
              fitzgm6@rpi.edu
            <br>
            </a>
            <a href="https://github.com/fitzichael">
              <i class="github square icon"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  
 
    <br>
    <br>
    <br>
    <center>
        <div>
            <router-link to="/">Return to main site --></router-link>
        </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "Aboutv2",
};
</script>

<style scoped>

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #3cb15f;
  color: white;
}

</style>


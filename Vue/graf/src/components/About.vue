<template>
  <div>
    <div class="about-section">
      <h1>About Us Page</h1>
      <p>We Make Graf</p>
    </div>
    <h2 style="text-align:center">Developers</h2>

    <div class="row">
      <div class="column">
        <div class="card">
          <img src="../assets/Face.png" alt="James" style="width:50%" />
          <div class="container">
            <h2 class="name">James Weir</h2>
            <p class="title">Project Leader</p>
            <p class="description">Some info would be here I guess.</p>
            <p>weirj@rpi.edu</p>
            <p><a class="button" href="mailto:weirj@rpi.edu">Contact</a></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img src="../assets/Face.png" alt="Nic" style="width:50%" />
          <div class="container">
            <h2 class="name">Nicholas Desmarais</h2>
            <p class="title">Dad</p>
            <p class="description">Some info</p>
            <p>desman@rpi.edu</p>
            <p><a class="button" href="mailto:desman@rpi.edu">Contact</a></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img src="../assets/Face.png" alt="Max" style="width:50%" />
          <div class="container">
            <h2 class="name">Max Herman</h2>
            <p class="title">Node guy</p>
            <p class="description">Info</p>
            <p>hermam3@rpi.edu</p>
            <p><a class="button" href="mailto:hermam3@rpi.edu">Contact</a></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img src="../assets/Face.png" alt="Max" style="width:50%" />
          <div class="container">
            <h2 class="name">Max Stewart Steele</h2>
            <p class="title">Made this page</p>
            <p class="description">More info</p>
            <p>stewam8@rpi.edu</p>
            <p><a class="button" href="mailto:stewam8@rpi.edu">Contact</a></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img src="../assets/Face.png" alt="Micheal" style="width:50%" />
          <div class="container">
            <h2 class="name">Michael Fitzgerald</h2>
            <p class="title">Doesn't like design</p>
            <p class="description">INFO</p>
            <p>fitzgm6@rpi.edu</p>
            <p><a class="button" href="mailto:fitzgm6@rpi.edu">Contact</a></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img src="../assets/Face.png" alt="Joseph" style="width:50%" />
          <div class="container">
            <h2 class="name">Joseph Casente</h2>
            <p class="title">Fell down the stairs</p>
            <p class="description">INFO in text form</p>
            <p>casenj@rpi.edu</p>
            <p><a class="button" href="mailto:casenj@rpi.edu">Contact</a></p>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="row">
      <div class="column2">
        <div class="card">
          <h2>About the project</h2>
          <div class="container"></div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 16.66666%;
  margin-bottom: 16px;
  padding: 0 8px;
}
.column2 {
  float: left;
  width: 50%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(20, 22, 24, 0.664);
  margin: 8px;
  background-color: white; 
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #3cb15f;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after,
.row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: rgb(0, 0, 0);
}

.description {
  height: 50px;
  color: grey;
}

.name {
  text-align: center;
  height: 25px;
  font-size: 20px;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: rgb(0, 0, 0);
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>

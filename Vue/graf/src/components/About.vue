<template>
  <div>
    <div class="about-section">
      <h1>About Us Page</h1>
      <p>We Make Graf</p>
    </div>
    <h2 style="text-align:center">Developers</h2>

    <div class="ui six column grid">
      <div class="column" v-for="(member,name) in members" v-bind:key="name">
        <div class="ui fluid card">
          <div class="image">
            <img src="../assets/Face2.png" >
          </div>
          <div class="content">
            <a class="header">{{name}}</a>
            <div class="meta">
              <span class="date">{{member['Title']}}</span>
            </div>
            <div class="description">
              {{member['Info']}}
            </div>
          </div>
          <div class="extra content">
            <a :href="`mailto:${member['Email']}`" >
              <i class="at icon"></i>
              {{member['Email']}}
            <br>
            </a>
            <a :href="`${member['Email']}`" target = "_blank" rel="noopener noreferrer">
              <i class="github square icon"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>

    <br><br><br>

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
  data:
  function() {
    return {
        members: {
          "James Weir": {
            "Title" : "Project Leader",
            "Info" : "Some info would be here I guess.",
            "Email" : "weirj@rpi.edu",
            "GitHub" : "https://github.com/JPWeir",
          },
          "Nicholas Desmarais": {
            "Title" : "Lead Developer",
            "Info" : "Dad.",
            "Email" : "desman@rpi.edu",
            "GitHub" : "https://github.com/N-Desmarais",
          },
          "Max Stewar Steele": {
            "Title" : "Senior Developer",
            "Info" : "Made this page.",
            "Email" : "stewam8@rpi.edu",
            "GitHub" : "https://github.com/maxstewartsteele",
          },
          "Michael Fitzgerald": {
            "Title" : "Frontend Developer",
            "Info" : "Design :( .",
            "Email" : "fitzgm6@rpi.edu",
            "GitHub" : "https://github.com/fitzichael",
          },
          "Max Herman": {
            "Title" : "Backend Developer",
            "Info" : "Node Guy.",
            "Email" : "hermam3@rpi.edu",
            "GitHub" : "https://github.com/max-herman",
          },
          "Joseph Casente": {
            "Title" : "Backend Developer",
            "Info" : "Fell down the stairs.",
            "Email" : "casenj@rpi.edu",
            "GitHub" : "https://github.com/jcasente",
          }
        }
    }
  }
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

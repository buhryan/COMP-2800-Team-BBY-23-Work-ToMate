<svelte:head>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v7.0"></script>
</svelte:head>

<style>
.social-media-buttons {
  text-align: center
}
.fb-share-button {
  top: -6px;
}
</style>
<div class="tm-main">

  <div class="tm-welcome-section">
    <div class="container tm-navbar-container">
      <div class="row">
        <div class="col-xl-12">
          <nav class="navbar navbar-expand-sm">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item" id="navitem">
                <a href="/about-Us">About us</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div class="container text-center tm-welcome-container">
      <div class="tm-welcome">
        <div class="logo">
          <i class="far fa-clock" />
          <h1 class="text-uppercase mb-3 tm-site-name">Work ToMate</h1>
          <p class="tm-site-description">Improves your productivity</p>
        </div>
      </div>
    </div>

  </div>

  <div class="container">

    <div class="row tm-albums-container grid">
      <div class="col-sm-6 col-12 col-md-6 col-lg-3 col-xl-3 tm-album-col">
        <a href="/timer">
          <figure class="effect-sadie">
            <img src="img/timer.png" alt="A clock" class="img-fluid">
            <figcaption>
              <h2>Start a Timer</h2>
              <p>
                Organize work periods and break times to increase productivity.
              </p>
            </figcaption>
          </figure>
        </a>
      </div>
      <div class="col-sm-6 col-12 col-md-6 col-lg-3 col-xl-3 tm-album-col">
        <a href="/task-Lists">
          <figure class="effect-sadie">
            <img src="img/lists.png" alt="A clipboard with tasks along with a pen" class="img-fluid">
            <figcaption>
              <h2>Task Lists</h2>
              <p>Create or view your task lists!</p>
            </figcaption>
          </figure>
        </a>
      </div>
      <div class="col-sm-6 col-12 col-md-6 col-lg-3 col-xl-3 tm-album-col">
        <a href="/team">
          <figure class="effect-sadie">
            <img src="img/teams.png" alt="Group of people" class="img-fluid">
            <figcaption>
              <h2>Team</h2>
              <p>Join a team of people and share a task list!</p>
            </figcaption>
          </figure>
        </a>
      </div>
      <div class="col-sm-6 col-12 col-md-6 col-lg-3 col-xl-3 tm-album-col">
        <a href="/friends">
          <figure class="effect-sadie">
            <img src="img/friends.png" alt="Two guys with arms around their shoulders" class="img-fluid">
            <figcaption>
              <h2> Connect with a Friend</h2>
              <p>Connect with people that you've friended!</p>
            </figcaption>
          </figure>
        </a>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="tm-tag-line">
          <h2 class="tm-tag-line-title">Use your time wisely.</h2>
        </div>
      </div>
    </div>
    <div class="social-media-buttons">
     <!-- Twitter share found on their website
       Source: https://publish.twitter.com/# -->
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        class="twitter-share-button"
        data-show-count="false"
        data-size="large">
      </a>
      <!-- Facebook share found on their developers website page
       Source: https://developers.facebook.com/docs/plugins/share-button/#example -->
      <div
        class="fb-share-button"
        data-href="https://worktomate.web.app"
        data-layout="button"
        data-size="large">
      </div>

      <div>
        <a
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fworktomate.web.app%2F&amp;src=sdkpreparse"
          class="fb-xfbml-parse-ignore">
        </a>
      </div>

       <div id="fb-root"></div>
    </div>


    <footer class="row">
      <div class="col-xl-12">
        <p class="text-center p-4">
          Copyright &copy;
          <span class="tm-current-year">2020</span>
          Work ToMate - Design: Team 23
        </p>
      </div>
    </footer>
  </div>
  <!-- .container -->

</div>
<!-- .main -->

<svelte:head>
  <script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

<script>
  window.onSignIn = (googleUser) => {
     const profile = googleUser.getBasicProfile();
     console.log('ID: ' + profile.getId());
     console.log('Name: ' + profile.getName());
     console.log('Image URL: ' + profile.getImageUrl());
     console.log('Email: ' + profile.getEmail());
  };
  
</script>


<style>

h1 {
        color: #ee8152;
    }
    
</style>
<h1>Google Sign In Page</h1>
<div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn" />
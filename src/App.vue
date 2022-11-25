<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue'
  export default {
    components: {
      Header,
      Footer,
    }
  }
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #000000;
}

nav a.router-link-exact-active {
  color: #f27700;
}

a:hover {
    color: #f27700;
    text-decoration: underline;
}
.navbar-expand-lg .navbar-collapse {
    flex-basis: 100%;
}
nav a.router-link-exact-active {
    color: #d75a31;
}
</style>

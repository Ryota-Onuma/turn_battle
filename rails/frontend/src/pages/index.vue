<template>
  <section id="index">
    <h1>Topページ</h1>
    <router-link to="/about">Aboutへ</router-link>
  </section>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
#index {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  box-sizing: border-box;
  .tweet {
    margin: 30px;
    border: 1px solid skyblue;
    padding: 10px 20px;
    .title {
      font-size: 1.5rem;
    }
  }
}
</style>

<template>
  <div id="app">
    <SimpleData :data="simple" #simple="data">
      <h1>{{ data }}</h1>
    </SimpleData>
    <RemoteDataMatch :data="remote">
      <template #notAsked>
        <div>
          <h1>...We want something here...</h1>
          <button @click="onAsk">Ask</button>
        </div>
      </template>
      <template #asking>
        <h1>...Loading...</h1>
      </template>
      <template #failure="e">
        <div>
          <h1>...{{ e }}...</h1>
          <button @click="onAsk">Ask Again</button>
        </div>
      </template>
      <template #success="a">
        <div>
          <h1>...{{ a }}...</h1>
          <button @click="onAsk">Are You sure?</button>
        </div>
      </template>
    </RemoteDataMatch>
  </div>
</template>

<script>
import SimpleData from './components/SimpleData'
import { RemoteData, RemoteDataMatch } from './components/RemoteData'

export default {
  name: 'app',
  components: {
    SimpleData,
    RemoteDataMatch
  },
  data() {
    return {
      simple: "Simple Data",
      remote: RemoteData.NotAsked
    }
  },
  methods: {
    onAsk() {
      this.remote = RemoteData.Asking
      setTimeout(() => {
        const randomBool = Math.random() >= 0.5
        if (randomBool) {
          this.remote = RemoteData.Success("Woot Woot!")
        } else {
          this.remote = RemoteData.Failure("Womp! Womp!")
        }
      }, 1000)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

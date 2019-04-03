import './styles/styles.css';
import SimpleData from './components/SimpleData'
import { RemoteData, RemoteDataMatch } from './components/RemoteData'

export default {
  data() {
    return {
      simple: 'Simple Data',
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
  },
  render() {
    return (
      <div id="app">
        <SimpleData data={this.simple} scopedSlots={{ simple: (data) =>
          <h1>{ data }</h1>
        }}/>
        <RemoteDataMatch data={this.remote} scopedSlots={{
          notAsked: () =>
            <div>
              <h1>...We want something here...</h1>
              <button onClick={this.onAsk}>Ask</button>
            </div>
          ,asking: () =>
            <h1>...Loading...</h1>
          ,failure: (e) =>
            <div>
              <h1>...{e}...</h1>
              <button onClick={this.onAsk}>Ask Again</button>
            </div>
          ,success: (a) =>
            <div>
              <h1>...{a}...</h1>
              <button onClick={this.onAsk}>Are You sure?</button>
            </div>
        }}/>
      </div>
    )
  }
}
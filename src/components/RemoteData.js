import { taggedSum } from 'daggy'

const RemoteData = taggedSum('RemoteData', {
  NotAsked: [],
  Asking: [],
  Failure: ['e'],
  Success: ['a'],
})

RemoteData.prototype.map = function (f) {
  return this.cata({
    NotAsked: () => this,
    Asking: () => this,
    Failure: e => RemoteData.Failure(f(e)),
    Success: a => RemoteData.Success(f(a))
  })
}

const RemoteDataMatch = {
  props: ['data'],
  render() {
    return this.data.cata({
      NotAsked: () => this.$scopedSlots.notAsked(),
      Asking: () => this.$scopedSlots.asking(),
      Failure: e => this.$scopedSlots.failure(e),
      Success: a => this.$scopedSlots.success(a)
    })
  }
}

export { RemoteData, RemoteDataMatch }
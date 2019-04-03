export default {
  props: ['data'],
  render() {
    return this.$scopedSlots.simple(this.data)
  }
}
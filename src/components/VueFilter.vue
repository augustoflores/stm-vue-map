<template>
  <md-list>
    <md-list-item>
      <md-icon>move_to_inbox</md-icon>
      <span class="md-list-item-text">Inbox</span>
    </md-list-item>

    <md-list-item>
      <md-icon>send</md-icon>
      <span class="md-list-item-text">Sent Mail</span>
    </md-list-item>

    <md-list-item>
      <md-icon>delete</md-icon>
      <span class="md-list-item-text">Trash</span>
    </md-list-item>

    <md-list-item>
      <md-icon>error</md-icon>
      <span class="md-list-item-text">Spam</span>
    </md-list-item>
  </md-list>
</template>

<script>
export default {
  name: 'VueFilter',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

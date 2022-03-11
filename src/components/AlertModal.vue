<template>
  <div
    class="alert-container"
    style="z-index: 1500"
  >
    <div
      v-for="(msg, key) in messages"
      :key="key"
      class="alert show"
    >
      <div class="alert-header d-flex align-items-center">
        <span
          :class="`bg--${msg.style}`"
        ></span>
        <p>{{ msg.title }}</p>
        <button
          type="button"
          @click="clearToast(key)"
        >X</button>
      </div>
      <div class="alert-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/emitter'
export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 6000)
    },
    clearToast (index) {
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    emitter.on('alert-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>

<style lang="scss">
  .alert-container{
    width: 20%;
    position: fixed;
    top: 0;
    right: 0;
    padding-right: 12px;
    .alert{
      background-color: #fff;
      width: 100%;
      font-size: 20px;
      letter-spacing:2px;
      margin-bottom: 20px;
      .alert-header{
        background: #ccc;
        padding: 4px;
        span{
          padding: 8px;
          margin-right: 8px;
          display: inline-block;
          width: 10px;
          height: 10px;
          &.bg--danger{
            background-color: red;
          }
          &.bg--success{
            background-color: green;
          }
        }
        p{
          margin-right: auto;
          font-weight: 600;
          text-align: center;
          font-size: 16px;
        }
        button{
          background:transparent;
          font-weight: bold;
          border-radius:none;
          outline:none;
          border: none;
          cursor: pointer;
        }
      }
      .alert-body{
        padding: 4px;
        background-color: lighten(#ccc, 20%);
        font-size: 16px;
      }
    }
  }
</style>

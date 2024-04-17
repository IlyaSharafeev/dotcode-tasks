<template>
  <div class="home">
    <router-link to="/tasks/1" class="btn air">Task №1</router-link>
    <router-link to="/tasks/2" class="btn air">Task №2</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  background-color: #eaeaea;

  .btn {
    background-color: #7676ff;
    color: #eaeaea;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 15px;
    cursor: pointer;
    width: 250px;
    text-transform: uppercase;

    &:hover {
      background-color: #6666ff;
    }
  }

  .air {
    margin: 0 1em;
    border-radius: 15px;
    font-size: 1.3em;
    font-weight: bold;
    line-height: 2.3;
    box-shadow: 0 60px 12px -18px hsla(0, 0%, 0%, 0.1),
      0 60px 20px -12px hsla(0, 0%, 0%, 0.1);
    animation: float 1s infinite ease-in-out alternate;
  }

  .air-2 {
    animation-delay: 0.3s;
  }

  @keyframes float {
    100% {
      transform: translateY(20px);
      box-shadow: 0 40px 10px -18px hsla(0, 0%, 0%, 0.2),
        0 40px 16px -12px hsla(0, 0%, 0%, 0.2);
    }
  }
}
</style>

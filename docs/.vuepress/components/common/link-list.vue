<template>
  <div class="link-list">
    <div v-for="(list, index) in linkList" :key="index">
      <h3 class="header">{{ list.type }}</h3>
      <ul>
        <ol v-for="(item, idx) in list.children" :key="idx" class="link-item">
          <a :href="item.link">{{ item.title }}</a>
        </ol>
      </ul>
    </div>
  </div>
</template>

<script>
import linkList from "./linkList.json";
export default {
  data() {
    return {
      linkList: linkList,
    };
  },
};
</script>

<style lang="scss">
.header {
  height: 70px;
  line-height: 70px;
}
.link-item {
  height: 50px;
  line-height: 50px;
}
</style>

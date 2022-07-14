<template>
  <router-view/>
</template>

<style>
body,html{
  padding: 0;
  margin: 0;
}

.page_content{
  display: block;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 30px;
}

/* flex布局类名 */
.flex-float{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex{
  display: flex;
  align-items: center;
}
</style>

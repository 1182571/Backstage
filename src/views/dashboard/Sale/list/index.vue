<template>
  <div>
    <h3>门店{{ title }}</h3>
    <ul>
      <li>
        <span class="rindex">0</span>
        <span>肯德基</span>
        <span class="rvalue">1234</span>
      </li>
      <li>
        <span class="rindex">1</span>
        <span>肯德基</span>
        <span class="rvalue">1234</span>
      </li>
      <li>
        <span class="rindex">2</span>
        <span>肯德基</span>
        <span class="rvalue">1234</span>
      </li>
      <li>
        <span class="rindex">3</span>
        <span>肯德基</span>
        <span class="rvalue">1234</span>
      </li>
      <li>
        <span>4</span>
        <span>肯德基</span>
        <span class="rvalue">1234</span>
      </li>
      <li>
        <span>5</span>
        <span>肯德基</span>
        <span class="rvalue">1234</span>
      </li>
      <li>
        <span>6</span>
        <span>肯德基</span>
        <span class="rvalue">1234</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["activename"],
  computed: {
    title() {
      return this.activename == "sale" ? "销售额" : "访问量";
    },
  },
};
</script>

<style>
ul {
  list-style: none;
  width: 100%;
  height: 300px;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}
</style>

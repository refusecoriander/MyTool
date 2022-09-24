<template>
    <div class="container">
      <div>
        <div class="block">
          <iframe id="Iframe" :src="bdTokenUrl" scrolling="no" style="border:0px; width:100%;height:100%;"></iframe>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  
  export default {
    components: {
    },
    data: function () {
      return {
        bdTokenUrl: 'http://172.245.60.107:8888/c9b3323e/',
        value1: "",
      };
    },
    mounted() {
      /**
       * iframe-宽高自适应显示   
       */
      document.getElementById('Iframe').src=document.getElementById('Iframe').src;
      const oIframe = document.getElementById('Iframe');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
      oIframe.style.height = (Number(deviceHeight) - 120) + 'px'; //数字是页面布局高度差
    },
    methods: {
    }
  };
  </script>
  <style lang="less" scoped>
  </style>
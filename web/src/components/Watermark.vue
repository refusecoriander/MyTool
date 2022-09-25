<template>
  <el-container class="container">
    <el-main>
      <el-row class="menu" >
        <el-col :span="24">
          <h1 style="color:white" >短视频/图集在线去水印解析</h1>
        </el-col>
        <el-col style="padding-right:20px;padding-left:20px">
          <div class="main" v-loading="loading">
            <div class="grid-content">
              <el-input placeholder="请粘贴分享链接" v-model="input" id="url" lass="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="视频">
                  <el-option label="视频" value="1"></el-option>
                  <el-option label="图集" value="2"></el-option>
                </el-select>
                <el-button slot="append" @click="onSubmit">解析</el-button>
              </el-input>
            </div>
            <div class="waterfall" v-if="iseen">
              <div class="item" v-for="url in images_url" :key="url">
                <el-image :src="url" :preview-src-list="images_url">
                </el-image>
              </div>
            </div>
          </div>
        </el-col>
        <el-col  style="margin-top:10px">
          <el-popover placement="bottom" width="400" trigger="click" style="margin-right:20px;">
            <p><strong>目前支持 </strong>抖音/皮皮虾/火山/微视/微博/绿洲/最右/轻视频/instagram/哔哩哔哩/快手/全民小视频/皮皮搞笑/全民k歌/巴塞电影/陌陌/Before避风/开眼/Vue
              Vlog/小咖秀/西瓜视频</p>
            <p><strong>温馨提示 </strong>粘贴视频地址时<u>无需删除文案</u><small> 但如果视频链接正确但解析失败请删掉文案后重试</small></p>
            <el-button class="warning" type="primary" icon="el-icon-warning-outline" slot="reference">提示</el-button>
          </el-popover>
          <el-button @click="sendcoversrc" plain>下载封面</el-button>
          <el-button @click="sendurlsrc" plain>下载视频</el-button>
          <el-button @click="sendmusicsrc" plain>下载音乐</el-button>
        </el-col>
      </el-row>
      <el-row class="show" >
        <el-col style="height:100%">
          <iframe id="Iframe" :src="downsrcs" scrolling="no" style=" border:0px; width:100%;height:100%;"></iframe>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      downsrcs: '',
      info: {},
      input: '',
      select: '',
      music: false,
      seen: false,
      iseen: false,
      loading: false,
      images_url: {}
    }
  },
  /* 
    mounted(){
      document.getElementById('Iframe').src=document.getElementById('Iframe').src;
      const oIframe = document.getElementById('Iframe');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
      oIframe.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
    }, */
  methods: {

    onSubmit() {
      this.loading = true
      const url = /http[s]?:\/\/[\w.]+[\w/]*[\w.]*\??[\w=&:\-+%]*[/]*/.exec(this.input)
      if (this.select == '1' || this.select == '') {
        this.axios.get('https://tenapi.cn/video/?url=' + url).then((res) => {
          if (res.data.url != null) {
            if (res.data.music != null) {
              this.music = true
            }
            this.seen = true
            this.info = res.data
            this.loading = false
            this.$notify.success({
              title: '解析成功',
              message: '请及时下载音视频',
            });
          } else {
            this.seen = false
            this.loading = false
            this.$notify.error({
              title: '解析失败',
              message: '视频不存在或接口失效'
            });
          }
        })
      } else {
        this.seen = false
        this.axios.get('https://tenapi.cn/images/?url=' + url).then((res) => {
          if (res.data.code == 200) {
            this.iseen = true
            this.loading = false
            this.images_url = res.data.images
            this.$notify.success({
              title: '解析成功',
              message: '图集暂不支持批量下载，请长按下载或右键另存为'
            });
          } else {
            this.iseen = false
            this.loading = false
            this.$notify.error({
              title: '解析失败',
              message: '图集不存在或接口失效'
            });
          }
          console.log(this.images_url);
        })
      }
    },
    sendcoversrc(downsrcs) {
      document.getElementById('Iframe').src = document.getElementById('Iframe').src = this.info.cover;
    },
    sendurlsrc(downsrcs) {
      document.getElementById('Iframe').src = document.getElementById('Iframe').src = this.info.url;
    },
    sendmusicsrc(downsrcs) {
      document.getElementById('Iframe').src = document.getElementById('Iframe').src = this.info.music;
    },
  }
}
</script>

<style lang="less" scoped>
::selection {
  background: rgba(0, 149, 255, .1);
}

body:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: .3;
  z-index: -1;
  content: "";
  position: fixed;
  background-image: linear-gradient(135deg, #CE9FFC 10%, #7367F0 100%);
}

.el-main {
  background-color: rgb(0, 0, 0);
  padding: 10px;
}

.menu{
  padding: 5px;
  background-color: rgb(0, 0, 0);
  height: 15%;
}
.show{
  padding: 5px;
  background-color: #000000;
  height: 85%;
}

.grid-content {
  margin-top: 1em;
  border-radius: 4px;
  min-height: 50px;
}

.el-select .el-input {
  width: 80px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;

}

.download h3 {
  margin-top: 2em;
}

.download button {
  margin-right: 0.5em;
  margin-left: 0.5em;
}

.waterfall {
  -moz-column-count: 3;
  -webkit-column-count: 3;
  column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-gap: 1em;
  column-gap: 1em;
}

.item {
  padding: 5px;
  break-inside: avoid;
}

.item img {
  width: 100%;
  margin-bottom: 10px;
}

.typo {
  text-align: left;
}

.typo a {
  color: #2c3e50;
  text-decoration: none;
}

hr {
  height: 10px;
  margin-bottom: .8em;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, .12);
}
</style>

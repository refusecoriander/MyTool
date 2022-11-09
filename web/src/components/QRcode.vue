<template>
  <main class="qrcode">
    <el-tabs style="height:100%" :stretch="true" type="border-card">
      <el-tab-pane label="二维码生成">
        <h1>在下面输入链接</h1>
        <hr />
        <div style="margin-top: 15px; margin-bottom: 10px;">
          <el-input placeholder="请在这里输入要生成的内容！" v-model="text" class="input-with-select">
            <el-button slot="append">
              <a style="color: black; text-decoration: none;" :href="href" target="_blank" download="下载的二维码" rel="noopener noreferrer">
                下载二维码</a>
            </el-button>
          </el-input>
        </div>
        <div class="code" ref="code">
          <vue-qr qid="qrid" :text="text" :size="size" :bgSrc="bgSrc" :logoSrc="logoSrc" :callback="callBack"
            :logoScale="logoScale" :colorDark="colorDark" :colorLight="colorLight" :backgroundColor="backgroundColor">
          </vue-qr>
        </div>
      </el-tab-pane>
      <el-tab-pane label="扫描二维码">
        <div class="reader" >
          <h1>二维码 识别、读取、解码</h1>
          <hr />

          <button class="sweep" @click="media()">扫一扫</button>
          <button class="sweep">
            <input type="file" @change="upload($event)" />从相册选择
          </button>

          <div class="imgurl">
            <!-- <img :src="imgurl" alt="当前识别的二维码" /> -->
            <img :src="imgurl2" alt="当前识别的二维码" />
          </div>

          <textarea class="result" cols="76" rows="6" v-model="result" placeholder="二维码识别结果！"></textarea>

          <canvas class="canvas" ref="canvas"></canvas>
        </div>
      </el-tab-pane>
    </el-tabs>

  </main>
</template>
<script>
// https://www.npmjs.com/package/vue-qr
import VueQr from "vue-qr";
import jsQR from "jsqr";
import Jimp from "jimp";

export default {
  name: "Qrcode",
  components: {
    VueQr,
    jsQR,
    Jimp
  },
  data() {
    return {
      href: "",
      text: "https://mytools.refusecoriander.top",  // 二维码内容
      size: 360,                            // 二维码宽高尺寸, 长宽一致, 包含外边距
      bgSrc: "",                            // 嵌入背景图地址，
      logoSrc: "https://raw.githubusercontent.com/MuGuiLin/QRCode/master/VueQRCode/src/assets/logo.png", // 嵌入至二维码中心的 LOGO 地址
      margin: 0,                            // 二维码图像的外边距, 默认20px
      colorDark: "black",                    // 实点的颜色
      colorLight: "#ffffff",                // 空白区的颜色
      backgroundColor: "#EEE",              // 背景色
      logoScale: 0.15,                      // 中间图的尺寸，不要设太大，太大会导致扫码失败的 默认0.2
      dotScale: 0.35,                       // 数据区域点缩小比例,默认为0.35

      timer: null,
      result: "https://mytools.refusecoriander.top",
      imgurl:
        "https://raw.githubusercontent.com/MuGuiLin/QRCode/master/VueQRCode/src/assets/github.com.png",
      imgurl2:
        "https://raw.githubusercontent.com/refusecoriander/new_vue/main/mytool.png",
      isAnimation: true,
      audio: Object,
      video: Object,
      cvsele: Object,
      canvas: Object,
    };
  },

  mounted() {
    this.audio = new Audio("../assets/tone.mp3");
    this.video = document.createElement("video");
    this.cvsele = this.$refs.canvas;
    this.canvas = this.cvsele.getContext("2d");
  },

  methods: {
    callBack(base64, pid) {
      // 生成的二维码 Data URI 可以在回调中取得,第一个参数为二维码 data URL, 第二个参数为 props 传过来的 qid(因为二维码生成是异步的,所以加个 id 用于排序)
      this.href = base64;
      console.log(base64, pid);
    },
    draw(begin, end) {
      this.canvas.beginPath();
      this.canvas.moveTo(begin.x, begin.y);
      this.canvas.lineTo(end.x, end.y);
      this.canvas.lineWidth = 3;
      this.canvas.strokeStyle = "red";
      this.canvas.stroke();
    },
    cance() {
      this.isAnimation = false;
      cancelAnimationFrame(this.timer);
      setTimeout(() => {
        this.cvsele.style.display = "none";
      }, 1000);
    },
    sweep() {
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        const { videoWidth, videoHeight } = this.video;
        this.cvsele.width = videoWidth;
        this.cvsele.height = videoHeight;
        this.canvas.drawImage(this.video, 0, 0, videoWidth, videoHeight);
        try {
          const img = this.canvas.getImageData(0, 0, videoWidth, videoHeight);
          this.imgurl = img;
          const obj = jsQR(img.data, img.width, img.height, {
            inversionAttempts: "dontInvert",
          });
          if (obj) {
            const loc = obj.location;
            this.draw(loc.topLeftCorner, loc.topRightCorner);
            this.draw(loc.topRightCorner, loc.bottomRightCorner);
            this.draw(loc.bottomRightCorner, loc.bottomLeftCorner);
            this.draw(loc.bottomLeftCorner, loc.topLeftCorner);
            if (this.result != obj.data) {
              this.audio.play();
              this.result = obj.data;
              this.cance();
              console.info("识别结果：", obj.data);

            }
          } else {
            console.error("识别失败啦，请检查二维码是否正确！");
          }
        } catch (err) {
          console.error("识别失败啦，请检查二维码是否正确！", err);
        }
      }
      if (this.isAnimation) {
        this.timer = requestAnimationFrame(() => {
          this.sweep();
        });
      }
    },
    media() {
      this.isAnimation = true;
      this.cvsele.style.display = "block";
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        }).then((stream) => {
          this.video.srcObject = stream;
          this.video.setAttribute("playsinline", true);
          this.video.setAttribute("webkit-playsinline", true);
          this.video.addEventListener("loadedmetadata", () => {
            this.video.play();
            this.sweep();
          });
        }).catch((error) => {
          this.cance();
          alert('对不起：未识别到扫描设备!');
          console.log(error.code + "：" + error.name + "，" + error.message);
        });
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia({
          video: { facingMode: "environment" },
        }, (stream) => {
          this.video.srcObject = stream;
          this.video.setAttribute("playsinline", true);
          this.video.setAttribute("webkit-playsinline", true);
          this.video.addEventListener("loadedmetadata", () => {
            this.video.play();
            this.sweep();
          });
        }, (error) => {
          this.cance();
          alert('对不起：未识别到扫描设备!');
          console.log(error.code + "：" + error.name + "，" + error.message);
        }
        );
      } else {
        if (navigator.userAgent.toLowerCase().match(/chrome/) && location.origin.indexOf("https://") < 0) {
          console.log("获取浏览器录音功能，因安全性问题，需要在localhost 或 127.0.0.1 或 https 下才能获取权限！");
        } else {
          this.cance();
          alert("对不起：未识别到扫描设备!");
        }
      }
    },
    upload(e) {
      this.cance();
      const file = e.target.files[0];
      const createObjectURL = window.createObjectURL || window.URL.createObjectURL || window.webkitURL.createObjectUR;
      this.result = "";
      this.imgurl = createObjectURL(file);
      const fReader = new FileReader();
      fReader.readAsDataURL(file);          // Base64 8Bit字节码
      // fReader.readAsBinaryString(file);  // Binary 原始二进制
      // fReader.readAsArrayBuffer(file);   // ArrayBuffer 文件流
      fReader.onload = (e) => {
        this.imgurl2 = e.target.result;
        e.target.result && Jimp.read(e.target.result).then(async (res) => {
          const { data, width, height } = res.bitmap;
          try {
            const resolve = await jsQR(data, width, height);
            this.result = resolve.data;
          } catch (err) {
            this.result = "识别失败，请检查二维码是否正确！";
          } finally {
            console.info("读取到的文件：", res);
          }
        }).catch((err) => {
          console.error("文件读取错误：", err);
        });
      };
    },
  },
};
</script>

<style lang="less">
.qrcode {
  height: 100%;
  .form {
    //margin: 30px;

    input {
      padding: 0 10px;
      width: 360px;
      height: 46px;
      font-size: 18px;
    }

    button {
      width: 150px;
      height: 50px;
      font-size: 18px;
      vertical-align: top;
      background: #42b983;
      border: 1px solid #767676;
      border-left: none;
    }
  }

  .code {
    margin: auto;
    padding: 8px;
    width: 346px;
    height: 360px;
    border-radius: 8px;
    border: 1px solid gray;
  }
}

.reader {
  font-size: 16px;
  .sweep {
    position: relative;
    margin: 5px;
    padding: 10px;
    width: 300px;
    font-size: 18px;
    cursor: pointer;
    color: white;
    background: #42b983;
    border: 1px solid #42b983;
    overflow: hidden;
    input {
      position: absolute;
      font-size: 100px;
      opacity: 0;
    }
  }
  .imgurl {
    margin: 5px;
    text-align: center;
    img {
      margin: 5px;
      padding: 5px;
      border: 1px solid gray;
      border-radius: 8px;
      width: 280px;
      height: 260px;
    }
  }
  .result {
    width:100%;
    height: auto;
    //box-sizing:border-box;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 8px;
    font-size: 16px;
  }
  .canvas {
    display: none;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
</style>
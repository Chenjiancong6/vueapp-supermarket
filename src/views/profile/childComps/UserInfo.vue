<template>
  <div class="user-info">
    <div class="avatar-all">
      <!-- 饿了么UI头像 -->
      <!-- http://192.168.0.104:8888/file/upload -->
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <div class="info">
      <div v-if="userInfo.nickname">{{userInfo.nickname}}</div>
      <div class="login" link="/login" v-if="!userInfo.nickname">
        <span @click="loginClick">登录</span>/
        <span @click="registerClick">注册</span>
      </div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt />
        <span class="phone-number">暂无绑定手机号</span>
      </div>
    </div>

    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: {
        avatar: ""
      }
    };
    // vuex
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res, file);
      this.userInfo.avatar = URL.createObjectURL(file.raw);
    },
    //1
    beforeAvatarUpload(file) {
      // console.log(file);
      const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      return isJPG; //&& isLt2M;
    },

    loginClick() {
      this.$router.push("/login");
    },
    registerClick() {
      this.$router.push("/register");
    },
    refresh() {
      //隐式定义,获取头像和用户名
      this.userInfo.avatar = localStorage.getItem("avatar");
      // console.log(this.userInfo.avatar);
      this.userInfo.nickname = sessionStorage.getItem("nickname");

      localStorage.clear(); //刷新时把本地存储清除掉
      sessionStorage.clear();
    }
  },
  created() {
    this.refresh();
  }
};
</script>

<style scoped>
.user-info {
  height: 85px;
  background-color: var(--color-tint);
  padding: 6px 15px;
  display: flex;
  color: #fff;
  margin-top: 1px;
}

avatar-all {
  color: #fff !important;
  z-index: 999;
}

.arrow {
  /* 返回箭头 */
  width: 20px;
  line-height: 85px;
}
.arrow img {
  width: 20px;
}
.info {
  /* 中部信息 */
  flex: 1;
  padding-left: 15px;
}
.phone img {
  width: 20px;
  height: 30px;
  vertical-align: middle;
  margin-left: -5px;
}
.phone-number {
  font-size: 13px;
}
.info .login {
  margin-top: 15px;
}

/* 饿了么css */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fff !important;
  z-index: 999;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 68px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-top: 6px;
  display: block;
  background-color: #fff !important;
  z-index: 999;
}
</style>

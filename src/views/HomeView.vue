<script setup>
</script>

<template>
  <main>
    <div class="main-banner">
      <video autoplay muted loop id="bg-video">
        <source src="../assets/videos/lol-kda-hpb.mp4" type="video/mp4" />
      </video>
      <div class="video-overlay header-text">
        <div class="caption">
          <h6>CHƠI GAME VÀ GIẢI TRÍ BẤT TẬN</h6>
          <h2>Cửa hàng linh kiện máy tính cao cấp</h2>
          <h2><em> DANGLE-PC</em></h2>
          <div class="main-button scroll-to-section">
            <router-link to="/auth/signup">
              <h5>Đăng ký tài khoản và mua sắm ngay !</h5>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h3 class="text-center">Đơn vị đồng hành cùng DANGLE-PC</h3>
      <div class="row mt-5 justify-content-around">
        <img style="max-height: 128px;" class="align-self-center" src="../assets/images/logo_logitech.png" alt="Logo Logitech">
        <img style="max-height: 64px;" class="align-self-center" src="../assets/images/logo_intel.png" alt="Logo Intel">
        <img style="max-height: 128px;" class="align-self-center" src="../assets/images/logo_nvidia.png" alt="Logo NVIDIA">
      </div>
    </div>
  </main>
</template>
<style scoped>
  .sponsor-img{
    /* max-width: 64px; */
    max-height: 64px;
    object-fit: cover;
  }
</style>
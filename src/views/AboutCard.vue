<script setup>

import {getFilmById} from '@/servises/servisKinopoisk.js'
import {ref, onMounted, onUnmounted} from 'vue'

const props = defineProps({
  id:{
    type:String,
    required: true
  }
})
const film = ref(null);
const isLoading = ref(false);
const error = ref(null);
let isMounted = true;
onUnmounted(()=>{
  isMounted=false
})
const fetchFilm = async()=>{
  try{
    isLoading.value = true;
    error.value = null;
    const data = await getFilmById(props.id)
    console.log('film data:', data)
    if(isMounted){
      film.value = data 
    } 

  }catch(err){
    if(isMounted) {
      error.value= err.message;
  }
}finally{
  if(isMounted){
    isLoading.value = false;
  }
}
}
onMounted(async()=>{
  fetchFilm()
})



</script>

<template>
  <main class="film-page">

    <router-link to="/" class="back">
      <span>←</span>
      Назад
    </router-link>

    <div v-if="isLoading" class="load">
      Загрузка...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="film" class="film-card">

      <div class="poster-wrapper">
        <img
          :src="film.posterUrl"
          alt="Постер фильма"
          class="poster"
        >
      </div>

      <div class="info">

        <div class="title">
          <h1>{{ film.nameRu }}</h1>

          <span v-if="film.year" class="year">
            {{ film.year }}
          </span>
        </div>

        <div class="meta">
          <span v-if="film.filmLength">
            {{ film.filmLength }} мин
          </span>
        </div>

        <div class="divider"></div>

        <p class="description">
          {{ film.description }}
        </p>

      </div>

    </div>

  </main>
</template>
<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;

  background:
    radial-gradient(
      circle at 15% 10%,
      rgba(120, 90, 255, 0.12),
      transparent 35%
    ),
    radial-gradient(
      circle at 85% 20%,
      rgba(0, 140, 255, 0.08),
      transparent 35%
    ),
    linear-gradient(
      135deg,
      #f5f5f7 0%,
      #eef0f6 50%,
      #f5f5f7 100%
    );

  color: #1d1d1f;

  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "SF Pro Display",
    "Segoe UI",
    sans-serif;
}

.film-page {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
  padding: 40px 0 80px;
}

/* Назад */

.back {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 35px;

  color: #1d1d1f;
  font-size: 16px;
  font-weight: 500;

  text-decoration: none;

  transition:
    gap 0.25s ease,
    opacity 0.25s ease;
}

.back:hover {
  gap: 12px;
  opacity: 0.65;
}

.back span {
  font-size: 20px;
}

/* Основная карточка */

.film-card {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 60px;

  padding: 40px;

  background: rgba(255, 255, 255, 0.72);

  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);

  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 30px;

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.08);

  animation: filmAppear 0.5s ease;
}

/* Постер */

.poster-wrapper {
  width: 100%;

  border-radius: 22px;
  overflow: hidden;

  background: #f5f5f7;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.14);
}

.poster {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition: transform 0.5s ease;
}

.poster-wrapper:hover .poster {
  transform: scale(1.025);
}

/* Информация */

.info {
  display: flex;
  flex-direction: column;

  justify-content: center;
}

/* Заголовок */

.title {
  display: flex;
  align-items: center;
  gap: 15px;

  flex-wrap: wrap;
}

.title h1 {
  margin: 0;

  color: #1d1d1f;

  font-size: clamp(32px, 4vw, 52px);
  font-weight: 650;

  line-height: 1.05;
  letter-spacing: -1.5px;
}

.year {
  padding: 7px 12px;

  color: #5f5f66;

  background: rgba(120, 90, 255, 0.1);

  border: 1px solid rgba(120, 90, 255, 0.12);
  border-radius: 10px;

  font-size: 14px;
  font-weight: 500;
}

/* Длительность */

.meta {
  margin-top: 18px;

  color: #86868b;

  font-size: 16px;
}

/* Разделитель */

.divider {
  width: 100%;
  height: 1px;

  margin: 28px 0;

  background: rgba(0, 0, 0, 0.08);
}

/* Описание */

.description {
  margin: 0;

  color: #515154;

  font-size: 18px;
  line-height: 1.7;
}

/* Загрузка */

.load {
  position: fixed;

  left: 50%;
  bottom: 30px;

  transform: translateX(-50%);

  padding: 14px 22px;

  background: rgba(255, 255, 255, 0.85);

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.12);

  color: #1d1d1f;

  font-size: 15px;
  font-weight: 500;

  z-index: 20;

  animation: notificationAppear 0.35s ease;
}

/* Ошибка */

.error {
  position: fixed;

  left: 50%;
  bottom: 30px;

  transform: translateX(-50%);

  padding: 14px 22px;

  background: rgba(255, 245, 245, 0.9);

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 80, 80, 0.15);
  border-radius: 16px;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.12);

  color: #ff3b30;

  font-size: 15px;
  font-weight: 500;

  z-index: 20;

  animation: notificationAppear 0.35s ease;
}

/* Анимации */

@keyframes filmAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes notificationAppear {
  from {
    opacity: 0;
    transform: translate(-50%, 15px);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* Планшет */

@media (max-width: 800px) {
  .film-card {
    grid-template-columns: 280px 1fr;
    gap: 35px;

    padding: 30px;
  }

  .description {
    font-size: 16px;
  }
}

/* Телефон */

@media (max-width: 600px) {
  .film-page {
    width: calc(100% - 24px);

    padding-top: 20px;
  }

  .film-card {
    display: flex;
    flex-direction: column;

    gap: 25px;

    padding: 18px;

    border-radius: 24px;
  }

  .poster-wrapper {
    width: 100%;
    max-width: 300px;

    margin: 0 auto;
  }

  .info {
    padding: 5px;
  }

  .title h1 {
    font-size: 32px;
  }

  .description {
    font-size: 16px;
    line-height: 1.6;
  }

  .divider {
    margin: 22px 0;
  }
}
</style>
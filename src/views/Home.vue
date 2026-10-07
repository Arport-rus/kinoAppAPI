<script setup>
import Card from '@/components/Card.vue';

import {ref, onMounted} from 'vue'

import {getFilms} from '@/servises/servisKinopoisk'

const movies = ref([]);
const yearFrom = ref(2025)
const yearTo = ref(2026)
const error = ref(null)
const isLoading = ref(false)

const moveGlow = (event)=>{
  //получаем кнопку
  const button = event.currentTarget
  //получаем позицию и размер
  const rect = button.getBoundingClientRect()

  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

 
  button.style.setProperty('--x', `${x}px`)
  button.style.setProperty('--y', `${y}px`)
}

const fetchFilms = async ()=>{
  try{
    isLoading.value = true
    error.value = false
    movies.value = await getFilms(yearFrom.value, yearTo.value)
  }catch(err){
    error.value = err.message
  }finally{
    isLoading.value = false
  }
}

onMounted(()=>{
  fetchFilms()
})


</script>
<template>
  <div class="filter">
    <input v-model="yearFrom" placeholder="Год от">
    <input v-model="yearTo" placeholder="Год до">
    <button
  class="search-button"
  @click="fetchFilms()"
  @mousemove="moveGlow"
>
  <span>Найти</span>
</button>
  </div>

  <div v-if="isLoading" class="load">
    Загрузка...
  </div>

  <div v-else-if="error" class="error">
    Произошла ошибка
  </div>

  <div class="col">
    <Card
      v-for="movie in movies"
      :key="movie.kinopoiskId"
      :movie="movie"
    />
  </div>
</template>

<style>
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
/* Общий контейнер фильтра */
.filter {
  width: min(900px, calc(100% - 40px));

  position: fixed;

  top: 30px;
  left: 50%;
  transform: translateX(-50%);

  padding: 20px;

  display: flex;
  align-items: center;
  gap: 12px;

  background: rgba(255, 255, 255, 0.78);

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.5);

  border-radius: 22px;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.12);

  box-sizing: border-box;

  z-index: 10;
}


/* Поля */
.filter input {
  flex: 1;
  min-width: 0;

  padding: 14px 16px;

  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;

  background: rgba(245, 245, 247, 0.8);

  font-size: 15px;
  color: #1d1d1f;

  outline: none;

  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.filter input::placeholder {
  color: #86868b;
}

.filter input:focus {
  background: white;
  border-color: rgba(0, 0, 0, 0.18);

  box-shadow:
    0 0 0 4px rgba(0, 0, 0, 0.04);
}

/* Кнопка */
.filter button {
  padding: 14px 24px;

  border: none;
  border-radius: 14px;

  background: #1d1d1f;
  color: white;

  font-size: 15px;
  font-weight: 500;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.filter button:hover {
  background: #000;

  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.15);
}

.filter button:active {
  transform: scale(0.97);
}

/* Сетка фильмов */
.col {
  width: min(1200px, calc(100% - 40px));

  margin: 0 auto;

  padding-top: 180px;
  padding-bottom: 80px;

  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 30px;
}


/* Загрузка */
.load {
  position: fixed;

  right: 30px;
  bottom: 30px;

  padding: 14px 20px;

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

  z-index: 10;

  animation: notificationAppear 0.35s ease;
}

/* Ошибка */
.error {
  position: fixed;

  right: 30px;
  bottom: 30px;

  padding: 14px 20px;

  background: rgba(255, 245, 245, 0.88);

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 80, 80, 0.15);

  border-radius: 16px;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.12);

  color: #ff3b30;

  font-size: 15px;
  font-weight: 500;

  z-index: 200;

  animation: notificationAppear 0.35s ease;
}

@keyframes notificationAppear {

  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }

}

/*       АДАПТИВНОСТЬ        */


/* Планшет */
@media (max-width: 900px) {

  .col {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    padding-top: 170px;

    gap: 24px;
  }

}


/* Телефон */
@media (max-width: 600px) {

  .filter {
    width: calc(100% - 24px);

    top: 15px;

    padding: 14px;

    flex-direction: column;

    border-radius: 20px;
  }


  .col {
    width: calc(100% - 24px);

    grid-template-columns: 1fr;

    padding-top: 280px;

    gap: 20px;
  }


  .load,
  .error {
    right: 15px;
    bottom: 15px;

    max-width: calc(100% - 30px);

    box-sizing: border-box;
  }

}
.search-button {
  --x: 50%;
  --y: 50%;

  position: relative;

  overflow: hidden;

  padding: 14px 26px;

  border: none;
  border-radius: 14px;

  background: #1d1d1f;

  color: white;

  font-size: 15px;
  font-weight: 500;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.3s ease;
}


/* Свечение под курсором */

.search-button::before {
  content: "";

  position: absolute;

  left: var(--x);
  top: var(--y);

  width: 100px;
  height: 100px;

  transform: translate(-50%, -50%);

 background: radial-gradient(
  circle,
  rgba(255, 255, 255, 0.55) 0%,
  rgba(96, 165, 250, 0.25) 35%,
  transparent 70%
);
  pointer-events: none;

  opacity: 0;

  transition: opacity 0.3s ease;
}


/* Показываем свечение */

.search-button:hover::before {
  opacity: 1;
}


/* Текст всегда поверх свечения */

.search-button span {
  position: relative;

  z-index: 2;
}


/* Небольшая реакция самой кнопки */

.search-button:hover {
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.18);

  transform: translateY(-1px);
}


.search-button:active {
  transform: scale(0.97);
}
</style>
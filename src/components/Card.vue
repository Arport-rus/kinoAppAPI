<script setup>
defineProps({
  movie: Object
})
</script>


<template>
  <div class="block">

    <div class="poster">
      <img
        :src="movie.posterUrlPreview || movie.posterUrl"
        alt="Постер фильма"
      >
    </div>

    <div class="info">
  <h2>{{ movie.nameRu }}</h2>

  <span>{{ movie.year }}</span>

  <router-link :to="`/about/${movie.kinopoiskId}`">
    Узнать подробнее
    <span class="arrow">→</span>
  </router-link>
</div>

  </div>
</template>

<style scoped>

.block {
  width: 100%;
  box-sizing: border-box;

  overflow: hidden;

  background: #ffffff;

  border-radius: 24px;

  border: 1px solid rgba(0, 0, 0, 0.06);

  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.06);

  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;

  cursor: pointer;
}

.block:hover {
  transform: translateY(-8px);

  box-shadow:
    0 20px 45px rgba(0, 0, 0, 0.12);
}


/* Постер */

.poster {
  width: 100%;
  aspect-ratio: 2 / 3;

  overflow: hidden;

  background: #f5f5f7;
}

.poster img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition: transform 0.5s ease;
}

.block:hover .poster img {
  transform: scale(1.04);
}


/* Информация */

.info {
  padding: 20px;
}

.info h2 {
  margin: 0 0 8px;

  color: #1d1d1f;

  font-size: 20px;
  font-weight: 600;

  line-height: 1.2;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

.info span {
  color: #86868b;

  font-size: 15px;
}


/* Ссылка */

.info a {
  display: flex;
  align-items: center;
  gap: 6px;

  width: fit-content;

  margin-top: 20px;

  color: #0071e3;

  font-size: 15px;
  font-weight: 500;

  text-decoration: none;

  transition:
    gap 0.25s ease,
    transform 0.25s ease;
}

.info a:hover {
  gap: 10px;
}

.arrow {
  color: #0071e3 !important;
  font-size: 18px !important;
}


/* Телефон */

@media (max-width: 600px) {

  .block {
    border-radius: 20px;
  }

  .info {
    padding: 16px;
  }

  .info h2 {
    font-size: 18px;
  }

}

</style>



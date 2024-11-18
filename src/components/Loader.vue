<template>
    <div class="wrapper">
        <div class="loader">
            <div class="one"></div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loader{
    width:1.5rem;
    height:1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    --border-width: 0.2rem;
}

.loader .one {
    height: 100%;
    width: 100%;
    border: var(--border-width) solid white;
    transform: rotate(45deg);
    border-radius: 0 50% 50% 50%;
    position: relative;
    animation: move 0.5s linear infinite alternate-reverse;
}
.loader .one::before {
    content: "";
    position: absolute;
    height: 55%;
    width: 55%;
    border-radius: 50%;
    border: var(--border-width) solid transparent;
    border-top-color: white;
    border-bottom-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: rotate 1s linear infinite;
}

@keyframes rotate {
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
@keyframes move {
    to {
        transform: translateY(15px) rotate(45deg);
    }
}
</style>
<script setup
        lang="ts">
</script>
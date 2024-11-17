<script setup>
import Loader
  from "@/components/Loader.vue";

const props = defineProps(['suggestions', 'value', 'isSuggestionLoading']);
const emit = defineEmits(['input', 'select']);
</script>

<template>
    <div class="wrapper">
        <input @input="$emit('input', $event.target.value)">
        <loader v-if="isSuggestionLoading"></loader>
        <ul v-else-if="suggestions && suggestions.length">
            <li v-for="suggestion in suggestions" @click="$emit('select', suggestion)">
                {{suggestion.name}} <div v-if="suggestion.state">{{ suggestion.state }}</div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.wrapper {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
}
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    background: #f9f9f9;
    border: 1px solid #ddd;
    color: black;
    max-height: 150px;
    overflow-y: auto;
}
li {
    padding: 8px;
    cursor: pointer;
}
li:hover {
    background-color: #e0e0e0;
}
</style>
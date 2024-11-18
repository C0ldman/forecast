<script setup>
import Loader
  from "@/components/Loader.vue";
import {
  ref
} from "vue";
import useData
  from "@/composables/useData.js";

const emit = defineEmits(['select']);
const suggestion = ref('');
const suggestions = ref(null);

const { updateSuggestions, isSuggestionLoading } = useData();

const fetchSuggestions = async (event) => {
  suggestions.value = await updateSuggestions(event.target.value);
}

const selectCity = (city) => {
  suggestion.value = '';
  suggestions.value = '';
  emit('select', city);
}

</script>

<template>
    <div class="wrapper">
        <input @input="fetchSuggestions">
        <loader v-if="isSuggestionLoading"></loader>
        <ul v-else-if="suggestions && suggestions.length" class="suggestion-list">
            <li v-for="suggestion in suggestions" @click="selectCity(suggestion)" :key="suggestion.lat">
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
.suggestion-list {
    position: absolute;
    top: 1.3rem;
    width: 100%
}
ul {
    position: relative;
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
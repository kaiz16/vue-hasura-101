<template>
  <h1>Hello world</h1>
  <div>
    <label>Todo title</label>
    <br />
    <input type="text" v-model="newTodo" />
    <br />
    <label>Todo description</label>
    <br />
    <input type="text" v-model="newTodoDesc" />

    <div v-for="todo in todos" :key="todo.id">
      
      <p><b>{{ todo.id }}</b> {{ todo.title }}</p>
    </div>
    <div>
      <button @click="addTodo">Submit</button>
    </div>
  </div>
</template>

<script>
import { GetTodos } from "./graphql/queries.js";
import { AddTodo } from "./graphql/mutations.js";
import { useSubscription } from "@vue/apollo-composable";
import { useMutation } from "@vue/apollo-composable";
import { ref, watchEffect } from "vue-demi";
export default {
  name: "App",
  setup() {
    const todos = ref([]);
    const newTodo = ref("");
    const newTodoDesc = ref("");
    const { result } = useSubscription(GetTodos);
    watchEffect(() => {
      if (result.value) {
        todos.value = result.value.todos;
        console.log(todos.value);
      }
    });

    const addTodo = async () => {
      const { mutate: addTodoMutation } = useMutation(AddTodo);

      const { data } = await addTodoMutation({
        title: newTodo.value,
        description: newTodoDesc.value,
        is_completed: false,
      });
      console.log(data);
    };

    return {
      todos,
      newTodo,
      newTodoDesc,
      addTodo,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div class="container mt-2">
    <template v-if="isTasksEmpty">
      <div class="empty-data">
        <img src="../assets/images/empty-data.svg" alt="Não há tarefas cadastradas" class="empty-data-image">
        <b-button to="/form" size="lg" variant="success" class="m-5">Cadastrar Tarefa</b-button>
      </div>
    </template>
    <template v-else>
      <div v-for="(task, index) in tasks" :key="index">
        <b-card class="m-3" :title="task.subject" style="box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);"> 
          <b-card-text>{{ task.description }}</b-card-text>
          <b-button variant="outline-secondary" @click="edit(index)">Editar</b-button>
          <b-button class="m-2" variant="outline-danger" @click="destroy(task, index)">Excluir</b-button>
        </b-card>
      </div> 
    </template>
    <b-modal ref="modalRemove" hide-footer title="Exluir tarefa">
      <div class="d-blok text-center">
        Deseja realmente excluir essa tarefa? {{ taskDeleting.subject }}
        <div class="mt-3 d-flex justify-content-end">
          <b-button variant="outline-secondary" @click="hideModal">Cancelar</b-button>
          <b-button class="m-2" variant="outline-danger" @click="confirmDestroy">Confirmar</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'list',
  data(){
    return {
      tasks: [],
      taskDeleting: []      
    }
  },
  created(){
    this.tasks = (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [])
  },
  methods: {
    edit(index){
      this.$router.push({ name: 'form', params: { index } })
    },
    destroy(task, index){
      this.taskDeleting = task;
      this.taskDeleting.index = index;
      this.$refs.modalRemove.show()      
    },
    hideModal(){
      this.$refs.modalRemove.hide()
    },
    confirmDestroy(){
      this.tasks.splice(this.taskDeleting.index, 1)
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      this.hideModal()
      this.$toast.success("Tarefa excluída com sucesso!");
    }
  },
  computed: {
    isTasksEmpty(){
       return this.tasks.length === 0
    }
  },
}
</script>

<style>
  .empty-data {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2.5rem;
  }

  .empty-data-image {
    max-width: 300px;
  }
</style>

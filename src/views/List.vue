<template>
  <div class="container mt-2">
    <template v-if="isTasksEmpty">
      <div class="empty-data">
        <img src="../assets/images/empty-data.svg" alt="Não há tarefas cadastradas" class="empty-data-image">
        <b-button to="/form" size="lg" variant="success" class="m-5">Cadastrar Tarefa</b-button>
      </div>
    </template>
    <template v-else>
      <div v-for="task in tasks" :key="task.id">
        <b-card 
          class="m-3 task-card"
          :class="{'finished-task' : isFinished(task) }"
          :title="task.subject"
          > 
          <b-card-text>{{ task.description }}</b-card-text>
          <b-button class="mr-2" variant="outline-secondary" @click="updateStatus(task.id, status.ARCHIVED)">Arquivar</b-button>
          <b-button class="mr-2" variant="outline-secondary" @click="updateStatus(task.id, status.FINISHED)">Concluir</b-button>
          <b-button class="mr-2" variant="outline-secondary" @click="edit(task.id)">Editar</b-button>
          <b-button class="mr-2" variant="outline-danger" @click="destroy(task)">Excluir</b-button>
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
import TaskModel from '@/models/TaskModel'
import Status from '@/enums/Status'

export default {
  name: 'list',
  data(){
    return {
      tasks: [],
      taskDeleting: [],
      status: Status    
    }
  },
  async created(){
    this.tasks = await TaskModel.params({
        status: [
          this.status.OPEN,
          this.status.FINISHED
        ]
      }).get()    
  },
  methods: {
    edit(id){
      this.$router.push({ name: 'form', params: { id } })
    },
    destroy(task){
      this.taskDeleting = task;
      this.$refs.modalRemove.show()      
    },
    hideModal(){
      this.$refs.modalRemove.hide()
    },
    async confirmDestroy(){
      this.taskDeleting.delete()
      this.hideModal()
      this.tasks = await TaskModel.params({
        status: [
          this.status.OPEN,
          this.status.FINISHED
        ]
      }).get()
      this.$toast.success("Tarefa excluída com sucesso!");
    },
    async updateStatus(taskId, status) {
      const task = await TaskModel.find(taskId);
      task.status = status;
      await task.save()

      this.tasks = await TaskModel.params({
        status: [
          this.status.OPEN,
          this.status.FINISHED
        ]
      }).get()
      this.$toast.success("Status alterado com sucesso!");
    },
    isFinished(task){
      return task.status === this.status.FINISHED
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
  .task-card {
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
  }
  
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

  .finished-task {
    opacity: .7;    
  }

  .finished-task > .card-body > h4, .finished-task > .card-body p {
    text-decoration: line-through;
  }
</style>

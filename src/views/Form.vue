<template>
  <div>
    <b-container>
      <b-form>
        <b-form-row>
          <b-form-group class="m-5" label="Status" label-for="status">
            <b-form-select v-model="form.status" :options="optionsList"></b-form-select>
          </b-form-group>
        </b-form-row>
        <b-form-row>
          <b-form-group class="m-5" label="Título" label-for="subject">
            <b-form-input
              id="subject"
              v-model.trim="$v.form.subject.$model"
              type="text"
              placeholder="Ex.: Lavar carro"
              autocomplete="off"
              :state="getValidation"
              aria-describedby="subject-feedback"
            >
            </b-form-input>
            <b-form-invalid-feedback id="subject-feedback">Campo obrigatório</b-form-invalid-feedback>
            
          </b-form-group>
        </b-form-row>
        <b-form-row>
          <b-form-group class="m-5" label="Descrição" label-for="description">
            <b-form-textarea
              id="description"
              v-model="form.description"
              type="text"
              placeholder="Ex.: Preciso levar o carro para lavar"
              autocomplete="off"
            >
            </b-form-textarea>
          </b-form-group>
        </b-form-row>
        <b-form-row>
          <b-form-group class="m-5">
            <b-button 
              type="submit" 
              variant="outline-primary" 
              @click="saveTask"
            >Salvar
            </b-button>
          </b-form-group>
        </b-form-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>

import { required, minLength } from 'vuelidate/lib/validators'
import TaskModel from '@/models/TaskModel'
import Status from '@/enums/Status'

export default {
  name: 'taskForm',
  data() {
    return {
      form: {
        subject: "",
        description: "",
        status: Status.OPEN
      },
      method: 'create',
      optionsList: [
        {
          value: Status.OPEN,
          text: 'Aberto'
        },
        {
          value: Status.FINISHED,
          text: 'Concluído'
        },
        {
          value: Status.ARCHIVED,
          text: 'Arquivado'
        }
      ]
    };
  },
  validations: {
    form: {
        subject: {
          required,
          minLength: minLength(3),
        },
        description: {

        },
      },
  },
  methods: {
    async saveTask() {
      // form validation
      this.$v.$touch()
      if(this.$v.$error) return

      if(this.method === 'update') {
        this.form.save()   
        this.$toast.success("Tarefa criada com sucesso!")
        this.$router.push({ name: 'list'})
        return
            
      }
      const task = new TaskModel(this.form); 
      task.save()
      this.$toast.success("Tarefa atualizada com sucesso!") 
      this.$router.push({ name: 'list'})   
    },    
  },
  computed: {
    getValidation(){
      // if(this.$v.form.subject.$dirty === false){
      //   return null
      // }
      
      return !this.$v.form.subject.$error
    }
  },
  async created() {
    const id = this.$route.params.id    
    if(id){
      this.method = 'update'
      const task = await TaskModel.find(id)  
      this.form = task;
    }
  },
};
</script>

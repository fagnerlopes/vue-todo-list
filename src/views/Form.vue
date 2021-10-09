<template>
  <div>
    <b-container>
      <b-form>
        <b-form-row>
          <b-form-group class="m-5" label="Título" label-for="subject">
            <b-form-input
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
              :disabled="!getValidation"
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

export default {
  name: 'formTask',
  data() {
    return {
      form: {
        subject: "",
        description: "",
      },
      method: 'create'
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
    saveTask() {
      let tasks = JSON.parse(localStorage.getItem('tasks'))
      const index = this.$route.params.index

      
      if(this.method === 'update') {
        this.$toast.success("Tarefa criada com sucesso!");
        tasks[index] = this.form;
      } else {
        this.$toast.success("Tarefa atualizada com sucesso!");
        tasks.push(this.form)
      }  
      localStorage.setItem('tasks', JSON.stringify(tasks))
      this.$router.push({ name: 'list'})
      
    }
  },
  computed: {
    getValidation(){
      if(this.$v.form.subject.$dirty === false){
        return null
      }
      
      return !this.$v.form.subject.$error
    }
  },
  created() {
    const index = this.$route.params.index
    if(index === 0 || index !== undefined){
      this.method = 'update'
      let tasks = JSON.parse(localStorage.getItem('tasks'))
      this.form = tasks[index];
      // let task = tasks.find((el, index) => {
      //   return this.$route.params.index === index
      // })
      // this.form = task;
    }
  },
};
</script>

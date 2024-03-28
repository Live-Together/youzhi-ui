<template>
  <div>
    <input type="file" @change="onChange">
    <button @click="submit">提交</button>
  </div>
</template>

<script>
import axios from 'axios'

let fileObj
export default {
    data() {
        return {

        }
    }, 
    methods: {
        onChange(e) {
            console.log(e.target.files[0])
            fileObj = e.target.files
        },
        submit() {
            let formData = new FormData()
            // formData.append('user', "asd")
            formData.append('files', fileObj)
            axios.post("/api/file", formData)
        }
    }
}
</script>

<style>

</style>
<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  
};
</script>

<style>
:root {
  --red: #fc345c;
  --teal: #49beb7;
  --mint: #afffdf;
  --light: #eafff7;
}
@import url('https://v1.fontapi.ir/css/Shabnam');
*
{
  /* font-family: Shabnam, sans-serif; */
   font-family: 'B Koodak';  
   
}
input[type=text],input[type=password]{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; 
}
.enfont{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; 
}
.pointer{
  cursor: pointer;
}
/* *{
  overflow: hidden;
} */
input[type=number]{
   font-family: 'B Koodak';  

}

</style>

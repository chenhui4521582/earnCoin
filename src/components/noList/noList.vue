<template>
    <div class="no-list">
        <img src="@/assets/images/no-list.png" alt="">
        <p>{{message}}</p>
        <slot />
    </div>
</template>
<script>
export default {
    name:"noList",
    props:{
        message:{
            type:String,
            default:"空空如也"
        }
    }
}
</script>
<style lang="less" scoped>
.no-list{
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
    text-align: center;
    img{
        width: 1.52rem;
    }
    p{
        font-size: .2rem;
        color: #BBBBBB;
        margin-top: .2rem;
    }
}
</style>



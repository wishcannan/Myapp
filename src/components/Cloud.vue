<script setup>
import { ElMessage } from 'element-plus';
import useClipboard from 'vue-clipboard3';
import profile_img from '../assets/yi.jpg';
defineProps({
  msg: String,
})
</script>
<script>
export default {
    data(){
        return{
            items:[
                {name:'他不懂',author:'张杰',language:'国语',bz:''},
                {name:'房间',author:'刘瑞琦',language:'国语',bz:''},
                {name:'谁',author:'廖俊涛',language:'国语',bz:''},
                {name:'奇迹再现',author:'毛华锋',language:'国语',bz:''},
                {name:'你听得到',author:'周杰伦',language:'国语',bz:''},
                {name:'青春修炼手册',author:'TFBOYS',language:'国语',bz:''},
                {name:'特别的人',author:'方大同',language:'国语',bz:''},
                {name:'去有风的地方',author:'清音',language:'国语',bz:''},
                {name:'当你',author:'王心凌',language:'国语',bz:''},
                {name:'天天',author:'陶喆',language:'国语',bz:''},
                {name:'房间',author:'刘瑞琦',language:'国语',bz:''},
                {name:'素颜',author:'许嵩',language:'国语',bz:''},
                {name:'小情歌',author:'苏打绿',language:'国语',bz:''},
                {name:'龙卷风',author:'周杰伦',language:'国语',bz:''},
                {name:'红色高跟鞋',author:'蔡健雅',language:'国语',bz:''},
                {name:'有何不可',author:'许嵩',language:'国语',bz:''},
                {name:'其实都没有',author:'杨宗纬',language:'国语',bz:''},
                {name:'小幸运',author:'田馥甄',language:'国语',bz:''},
                {name:'阴天',author:'莫文蔚',language:'国语',bz:''},
                {name:'阴天快乐',author:'陈奕迅',language:'国语',bz:''},
                {name:'忽然之间',author:'莫文蔚',language:'国语',bz:''},
                {name:'我们的明天',author:'周杰伦',language:'国语',bz:''},
                {name:'空白格',author:'蔡健雅',language:'国语',bz:''},
                {name:'流沙',author:'陶喆',language:'国语',bz:''},
            ],
            currentRow: -1,
            keywords:'',
            isSearch:false,
            songlist:[],
            p_img:profile_img,
        };
    },
    watch:{
    },
    methods:{
        fuzhi(value){
            const { toClipboard } = useClipboard();
            let Msg = '点歌 '+ value
            toClipboard(Msg)
            ElMessage({
                message:value+' 成功复制到剪贴板',
                type:'success'
            })
        },
        handleSelect(){
            if(this.keywords != ''){
                this.songlist = []
                let n = new RegExp(this.keywords)
                for(let i in this.items){
                    if(n.test(this.items[i].name) || n.test(this.items[i].author)){
                        this.songlist.push(this.items[i])
                    }
                }
                this.isSearch = true
            }else{
                this.isSearch = false
            } 
        },
        randonlookbtn(){
            const { toClipboard } = useClipboard();
            let Msg = '点歌 '+ this.items[Math.floor(Math.random()*this.items.length)].name
            toClipboard(Msg)
            ElMessage({
                message:'复制成功',
                type:'success'
            })
        }
    },
    computed:{
        hasData(){
            return !this.songlist.length && this.isSearch
        }
    }
}
</script>


<template>
    <div class="container">
        <div class="row">
            <el-avatar shape="square" :size="250"
            :src=p_img
            />
            <h4 class="pleft">擅长的歌 {{this.items.length }}</h4>
        </div>
        <div class="row">
            <div class="col-md-9">
                <el-input placeholder="搜索" @input="handleSelect" v-model="keywords" class="searchinput"></el-input>
            </div>
            <div class="col-md-3">
                <!-- <button type="button" title="从下面的歌单里随机挑一首" class="randonlook">随便看看</button> -->
                <el-button round="round" class="randonlook" title="从下面的歌单里随机挑一首" @click="randonlookbtn">随便看看</el-button>
            </div>
        </div>
        <div class="row">
            <table>
                <thead>
                    <tr>
                        <th class="th1">歌名</th>
                        <th class="th2">歌手</th>
                        <th class="th3">语言</th>
                        <th class="th4">备注</th>
                    </tr>
                </thead>
                <tbody v-show="hasData">
                    <td colspan="4">
                        歌单里没有诶~隐藏歌单碰碰运气!
                    </td>
                </tbody>
                <tbody v-if="isSearch">
                    <tr v-for="(item,index) in songlist" :key="index" :class="{ 'highlight-row': currentRow === index }"
                    @mouseover="currentRow = index" @mouseout="currentRow = -1" @click="fuzhi(item.name)">
                        <td>{{item.name}}</td>
                        <td>{{item.author}}</td>
                        <td>{{item.language}}</td>
                        <td>{{item.bz}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="(item, index) in items" :key="index" :class="{ 'highlight-row': currentRow === index }"
                    @mouseover="currentRow = index" @mouseout="currentRow = -1" @click="fuzhi(item.name)">
                        <td>{{item.name}}</td>
                        <td>{{item.author}}</td>
                        <td>{{item.language}}</td>
                        <td>{{item.bz}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <footer>
                Copyright © 奇奇怪怪的东西又增加了
            </footer>
        </div>
    </div>
</template>

<style scoped>
.row {
    display: flex;
    flex-direction:row;
    width: 100%;
    justify-content:space-between;
}
.pleft{
    align-items:flex-start;
    widows: 100%;
    display: flex;
    flex:0 0 auto;
    margin-left: 0;
    align-items: start;
    font-size:70px;
}
.col-md-9{
    flex: 0 0 auto;
    width: 75%;
    display: flex;
    align-items: center;
}
.searchinput{
    flex: 0 auto 0 auto;
    width: 100%;
    height: 30px;
    margin-left: 10px;
}
.randonlook{
    margin:10px auto 10px auto;
    width: 80%;
}
.col-md-3{
    display: flex;
    flex: 0 0 auto auto;
    width: 25%;
    align-items: start;
}
.container {
    width: 100%;
    margin: auto;
    min-width: 550px;
    height: 100vh;
}
table {
    width: 100%;
    border-collapse: collapse;
    border-color: #dc3545;;
    color: #212529;
    table-layout: fixed;
    background-color: #e0e0e0;
    border-radius: 1em;
}
table tr th:nth-child(1){
    width: 40%;
}
table tr th:nth-child(2){
    width: 20%;
}
table tr th:nth-child(3){
    width: 20%;
}
table tr{
    background-color: initial;
    border-bottom: #f5f5f5 solid;
    line-height: 2em;
}
.highlight-row {
    background-color: #f5f5f5;
  }
thead {
    border-bottom: 1px solid #212529;
}
.Home_backToTopBtn{
    position: fixed;
    right: 45px;
    bottom: 100px;
    width: 40px;
    height: 40px;
    z-index: 999;
    box-shadow: 0px 0px 4px 4px #ecefef;
    border-radius: 600px;
}
footer {
    margin-top: 2rem;
    border-top: 1px solid #212529;
    padding: 2rem 0;
    width: 100%;
}

</style>
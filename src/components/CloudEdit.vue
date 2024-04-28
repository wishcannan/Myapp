<script setup>
import { ElMessage } from 'element-plus';
import useClipboard from 'vue-clipboard3';
import profile_img from '../assets/yi.jpg';
import { inject, onMounted, ref } from 'vue';
import {request} from '../utils/axios.js';


//宝贝路由
const router = inject('$test')


//变量
var items=[{name:'他不懂',author:'张杰',language:'国语',bz:''},
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
            {name:'流沙',author:'陶喆',language:'国语',bz:''},]

const keywords = ref('')
const tableData = ref(items)
const p_img = profile_img

const languagelist = [
    {'value':'国语','label':'国语'},
    {'value':'日语','label':'日语'},
    {'value':'英语','label':'英语'},
]

const songdata = {
    "songname": ref(''),
    "songauthor": ref(''),
    "songlanguage": ref(''),
    "bz":ref(''),
    "songtype":"",
}

//对话栏 el-dialog
const dialogVisible = ref(true)
const buzz =ref(0)



//函数
async function getsonglist(){
    let a = await request(
        {
            url:'/selectsong',
            method:'get',
        }
    )
    items = a
    tableData.value = items
}
function insertlist(){
    let b = {
        "songname":songdata.songname.value,
        "songauthor": songdata.songauthor.value,
        "songlanguage": songdata.songlanguage.value,
        "bz":songdata.bz.value,
        "songtype":songdata.songtype,
    }
    let a = request({
        url:'/insertsong',
        method:'post',
        data:b
    }).then((res) => {
        // console.log(res)
        if(res.data == 1){
            ElMessage({
                message:'添加成功',
                type:'success'
            })
            getsonglist()
        }else{
            ElMessage({
                message:'添加失败',
                type:'error'
            })
        }
        songdata.songname.value = ''
        songdata.songauthor.value = ''
        songdata.bz.value = ''
    })
}
function handleClick(row){
    console.log('name',row)
    let b = {
        "songname":row.name,
        "songauthor": row.author,
        "songlanguage": row.language,
        "bz":row.bz,
        "songtype":row.songtype,
    }
    let a = request({
        url:'/deletesong',
        method:'post',
        data:b
    }).then((res) => {
        // console.log(res)
        if(res.data == 1){
            ElMessage({
                message:'删除成功'+row.name,
                type:'success'
            })
            getsonglist()
            keywords.value = ''
        }else{
            ElMessage({
                message:'删除失败',
                type:'error'
            })
        }
        songdata.songname.value = ''
        songdata.songauthor.value = ''
        songdata.bz.value = ''
    })
}
function handleSelect(){
    if(keywords.value !== ''){
        const arr = ref([]);
        let n = new RegExp(keywords.value)
        arr.value = items.filter(item => n.test(item.name) || n.test(item.author))
        if(arr.value){
            tableData.value = arr.value
        }
    }else{
        tableData.value = items
    }
}
function randonlookbtn(){
    const { toClipboard } = useClipboard();
    let Msg = '点歌 '+ items[Math.floor(Math.random()*items.length)].name
    toClipboard(Msg)
    ElMessage({
        message:'复制成功',
        type:'success'
    })
}
function routeredit(){
    router.push('/')
}
function handleClose(){
    // console.log(buzz.value == 16)
    if(buzz.value == 16){
        dialogVisible.value = false
    }
}

onMounted(() =>{
    getsonglist()
    songdata.songlanguage.value = languagelist[0].value
})
</script>


<template>
    <el-dialog v-model="dialogVisible" title="提问:织女星距离牵牛星多少光年" width="30%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-input-number v-model="buzz" size="small" :controls="false"></el-input-number>
        <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="handleClose"
                >Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <div class="container">
        <el-row type="flex" justify="center" align="middle">
            <el-col :span="23">
                <a href="https://live.bilibili.com/32212815">
                    <el-avatar shape="circle" :size="250" class="rotate-avatar"
                    :src=p_img />
                </a>
            </el-col>
            <el-col :span="1">
                <el-button round="round" title="前往神秘地址" @click="routeredit" class="shenmi"></el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <p class="p1">擅长的歌 {{tableData.length }}</p>
                <p class="p2">点击删除可就删除了</p>
            </el-col>
        </el-row>
        <el-row class="top1">
            <el-col :span="6">
                <el-input placeholder="歌名" v-model="songdata.songname.value" class="searchinput"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="歌手" v-model="songdata.songauthor.value"></el-input>
            </el-col>
            <el-col :span="6">
                <el-select v-model="songdata.songlanguage.value" placeholder="请选择">
                    <el-option v-for="item in languagelist" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="备注" v-model="songdata.bz.value"></el-input>
            </el-col>
        </el-row>
        <el-row class="top1">
            <el-col :span="24">
                <el-button round="round" title="歌名和歌手不要为空" @click="insertlist" class="insertbutton">添加歌曲</el-button>
            </el-col>
        </el-row>
        <el-row class="top1">
            <el-col :span="18">
                <el-input placeholder="搜索" @input="handleSelect" v-model="keywords" class="searchinput"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button round="round" class="randonlook" title="从下面的歌单里随机挑一首" @click="randonlookbtn">随便看看</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="tableData" stripe style="width: 100%" empty-text="歌单里没有诶~隐藏歌单碰碰运气!">
                <el-table-column prop="name" label="歌名" align="center"  min-width="40%"/>
                <el-table-column prop="author" label="歌手" align="center"  min-width="20%"/>
                <el-table-column prop="language" label="语言" align="center"  min-width="20%"/>
                <el-table-column fixed="right" label="删除" align="center"  min-width="20%">
                    <template #default="dele">
                        <el-button link type="primary" size="small" @click="handleClick(dele.row)">删除这首</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <footer>
                Copyright © 奇奇怪怪的东西又增加了
            </footer>
        </el-row>
    </div>
</template>

<style scoped>
.rotate-avatar:hover{
    transform:rotate(360deg);
    -ms-transform:rotate(360deg); 
    -moz-transform:rotate(360deg); 
    -webkit-transform:rotate(360deg); 
    -o-transform:rotate(360deg); 
    transition:1s;
    -webkit-transition:1s;
    -moz-transition:1s;
    -o-transition:1s;
    animation: spin 2s linear infinite;
}

.p1{
    font-size:70px;
    margin: 10px;
}
.p2{
    color:#6c757d;
}
.top1 {
    margin-bottom: 2vh;
}
.searchinput{
    width: 100%;
}
.randonlook{
    width: 80%;
}
.container {
    width: 100%;
    margin: auto;
    height: 100vh;
}
footer {
    margin-top: 2rem;
    border-top: 1px solid #212529;
    padding: 2rem 0;
    width: 100%;
}
.insertbutton{
    width: 20%;
}
.shenmi{
    width: 20%;
    background-color: burlywood;
}
.el-input-number .el-input__inner{
  text-align: center;
}
</style>

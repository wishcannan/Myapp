<script setup>
import { ElMessage } from 'element-plus';
import useClipboard from 'vue-clipboard3';
import profile_img from '../assets/yi.jpg';
import { inject, onMounted, ref } from 'vue';
import {request} from '../utils/axios.js';
import lbAudio from 'lb-audio-v3';
import 'lb-audio-v3/style'


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

const musicList = [
 {
  name: '花言葉',
  author: '初音ミク',
  url: 'https://music.163.com/song/media/outer/url?id=28936926.mp3',
  img: 'https://p2.music.126.net/g1ikvH5SCA7GdefM1UvXbA==/8890651022334795.jpg',
  lrc: `[00:02.77]\n[00:05.98]花言葉\n[00:09.08]\n[00:16.53]いつからか気づいてた終わらない物語\n[00:23.42]心の中は窮屈でまた想像を消した\n[00:30.56]\n[00:31.09]昨日我慢した涙が止まない雨になって\n[00:37.80]雨雲は増え続けるだけさ\n[00:41.86]陽射しはまだ見えない\n[00:45.23]\n[00:45.80]偽りとか言い訳とか\n[00:49.62]相槌で塞いだ口の奥に\n[00:54.81]追いやられた心根が泣いていた\n[01:00.32]\n[01:01.65]止めどない雨に打たれないように\n[01:06.57]洞穴で閉じこもってる僕は弱虫コウモリ\n[01:13.54]花畑を眺めていた\n[01:17.18]鮮やかに咲く黄色い花\n[01:21.30]この場所じゃ似合わないね\n[01:24.62]君の名前はなんだっけ\n[01:28.06]忘れちゃって思い出せないなぁ\n[01:34.23]\n[01:47.02]雨上がりの景色でも 変わらない空模様\n[01:53.88]自信や希望を運ぶ鳥は翼が折れてた\n[02:01.66]ゆらゆら泳ぐ恋も全てが幻なら\n[02:08.39]叶わない笹舟を飛ばして\n[02:12.29]慰めの海にしよう\n[02:15.20]\n[02:16.15]朝になれば楽になると抑圧した靄は\n[02:23.34]どこの誰が片付けるの？\n[02:27.26]教えてくれませんか？\n[02:31.65]\n[02:32.28]止めどなく風に吹かれ続けても\n[02:37.12]君はまだ笑っているね\n[02:40.78]いつか聞いた花言葉 明朗と憧れだっけ\n[02:47.78]夜があけていつか晴れた時 花びらが舞い\n[02:54.17]空の向こうまで飛んでゆけたらいいね\n[02:59.18]そこで咲き誇れたなら\n[03:02.28]\n[03:02.33]大切なことばかり\n[03:05.62]胸にしまいこんでしまうけれど\n[03:10.23]そろそろ芽を出す頃だ\n[03:13.08]\n[03:13.39]君のいる物語に行こう`
 },
 {
  name: '若被温柔包围',
  author: '松任谷由実',
  url: 'https://music.163.com/song/media/outer/url?id=445015.mp3',
  img: 'https://p2.music.126.net/Ok1rt3Ka_owixH5IsvGS2g==/109951164728031188.jpg',
  lrc: `[00:09.490]小さい頃は 神様がいて \n[00:18.340]不思議に夢を かなえてくれた \n[00:27.530]優しい気持ちで目覚めた朝は \n[00:36.560]大人になっても 奇跡は起こるよ \n[00:45.790] \n[00:46.260]カーテンを開いて 静かな木洩れ陽の \n[00:55.140]やさしさに 包まれたなら きっと \n[01:03.420]目にうつる すべての事は メッセージ \n[01:13.090] \n[01:21.990]小さい頃は神様がいて \n[01:31.010]毎日愛を届けてくれた \n[01:40.080]心の奥に しまい忘れた \n[01:49.190]大切な箱 開く時は今 \n[01:58.310] \n[01:58.890]雨上がりの庭で くちなしの香りの \n[02:07.930]やさしさに 包まれたなら きっと \n[02:16.070]目にうつる すべての事は メッセージ \n[02:26.540] \n[02:28.170]カーテンを開いて 静かな木洩れ陽の \n[02:37.230]やさしさに 包まれたなら きっと \n[02:45.570]目にうつる すべての事は メッセージ \n[02:58.120]`
 },
 {
  name: 'DAYBREAK FRONTLINE',
  author: 'Orangestar/IA',
  url: 'https://music.163.com/song/media/outer/url?id=458231454.mp3',
  img: 'https://p2.music.126.net/WT3eISFoAum31NVAIKgKWg==/109951165868174091.jpg',
  lrc: `[00:02.12]編曲：Orangestar\n[00:42.88]「眠れないんだ」 風もなく茹だりそうな夜に \n[00:46.39]君の声が耳元で揺らいだ 感傷に浸ってばっか \n[00:51.06]何も変わらない 笑えない日々を \n[00:53.52]抜け出そうぜ 君を連れ飛び出した\n[00:56.42]風が通り過ぎた 闇と混ざり合った \n[00:59.93]君の笑い声が 小さく藍の空に響いて\n[01:04.10]そんなんで生きていけんのか もう戻れないぜ \n[01:07.00]なんて揺らぎそうな想いは アクセルへ \n[01:08.93]このまま地平線を 追い越してやるんだ\n[01:10.68]最前線飛ばせ僕たちは\n[01:12.40]星もない夜 ただ東を目指して行く\n[01:15.97]13秒先もわかんなくたって 精一杯僕を生きていく\n[01:19.51]何も後悔なんてないさ 前を向け\n[01:22.90]止まらないさ きっと光の待つ方へ\n[01:39.31]暗闇に落ちた 先の見えないような道も \n[01:42.95]辿り着いたら 闇なんてなかった \n[01:45.78]きっと僕は僕を 信じ切っちゃいないから \n[01:49.45]いっそあの向こうへ 未だ見ぬ夜明けを 信じ歩いた\n[01:53.56]追い抜いた 走った 期待した 転んだ \n[01:55.39]迷った わかんなくなって でもjust feel alive \n[01:58.09]fear or light まだ僕らは歩いていく\n[02:00.51]こんなんじゃいつまで経っても\n[02:02.13]何処にも行けやしないさ \n[02:03.54]なんて拭えない想いもアクセルへ\n[02:05.30]どうせ止まれるはずないさ\n[02:07.12]夜に腐っていたって僕たちは \n[02:14.27]間違いなく明日に向かっていく\n[02:35.44]最前線飛ばせ僕たちは\n[02:37.13]白みだした星空 胸を鳴らしている \n[02:40.51]眠らないよう 上がるミュージックと \n[02:42.45]ぬるくなった水だけ持っていく 無駄なものは何もないさ\n[02:45.96]前を向け その方がきっと笑えるさって\n[02:49.79]最前線飛ばせ僕たちは \n[02:51.27]昇る太陽 その光を目指していく \n[02:54.84]幸せって今はわかんなくたって \n[02:56.65]精一杯僕を生きていく 何も後悔なんてないさ \n[02:59.76]前を向け 終わらないさ \n[03:02.28]一生僕らは生きて征け`
 },
 {
  name: 'No title',
  author: 'Reol/ギガP',
  url: 'https://music.163.com/song/media/outer/url?id=28941713.mp3',
  img: 'https://p1.music.126.net/cZPx3peGTuWEI_GaZB5CDg==/8892850045794893.jpg',
  lrc: `[00:09.790]ずっと夢見てた僕になれたかな\n[00:11.539]とうに帰れないとこまで来たみたい\n[00:14.220]自分の足で二段飛ばしてそうもっと\n[00:16.469]先へ駆けていけるはずだから ran away\n[00:19.180]深くなる傷を縫い付け\n[00:21.750]繋ぐパス軸に廻りだす\n[00:24.120]慣れた痛み、焦る呼吸とビート\n[00:26.299]気付かないふりしてまた一人\n[00:28.620]何が正当？ないな永劫\n[00:30.930]誰が間違った対価払うの\n[00:33.389]あんたが嫌いなあいつはきっとただ\n[00:36.200]「それだけ」で不正解なんだ\n[00:38.310]0点だって提言したって全然納得できない理由も\n[00:42.990]最前線はいつだってここだった\n[00:45.209]最善策は最初からなかった\n[00:47.630]緩やかに崩れ壊れてく\n[00:52.349]ゆるりゆるり首を絞めるように\n[00:54.729]昨日までの僕が殺されていく\n[00:57.130]緩やかに離れ離れ飽く\n[01:01.759]ぐらりんり君にきこえるのは\n[01:04.150]僕が知らない声になってく\n[01:06.870]\n[01:16.550]幼い頃から\n[01:18.940]気付いたら傍にいた\n[01:21.379]まるで空気のようだ\n[01:23.809]僕は君とぎゅっと手を繋いで\n[01:26.199]楽しいことも涙も\n[01:28.309]僕は君に話して聞かせた\n[01:30.589]僕を笑う人や貶す声が聞こえぬように君は歌った\n[01:35.699]この声を君が受信\n[01:37.830]また夜毎投影されてく憂い\n[01:40.389]使い捨てだっていって腐っても\n[01:42.769]止まらないハイファイ、ツァイトガイスト\n[01:45.279]一周巡る間のたった一瞬だけでも交わる鼓動、音、繋ぐ色 \n[01:52.250]次は僕が君に歌歌うから\n[01:55.100]緩やかに崩れ壊れてく\n[01:59.489]ゆるりゆるり首を絞めるように\n[02:01.680]昨日までの僕が殺されていく\n[02:04.269]緩やかに離れ離れ飽く\n[02:09.000]ぐらりんり君にきこえるのは\n[02:11.380]僕が知らない声になってく\n[02:14.290]緩やかに崩れ壊れてく\n[02:18.490]ゆるりゆるり首を絞めるように\n[02:20.979]昨日までの僕が殺されていく\n[02:23.449]緩やかに離れ離れ飽く\n[02:28.339]ぐらりんり君にきこえるのは\n[02:30.610]僕が知らない声になってく\n[02:33.600]いつか君に届くかな\n[02:35.520]いやそんな日はきっと来ないだろうな\n[02:38.390]声も体も持たぬ君に\n[02:40.710]救われた何億人の一人\n[02:43.000]赤青合わせ彩った音で世界が溢れた\n[02:47.500]巡り巡り出会ったこの音を聴くすべてが\n[02:53.559]緩やかに崩れ壊れてく\n[02:58.289]ゆるりゆるり首を絞めるように\n[03:00.649]昨日までの僕が殺されていく\n[03:03.179]緩やかに離れ離れ飽く\n[03:07.860]ぐらりんり君にきこえるのは\n[03:10.259]僕が知らない声になってく\n[03:13.190]緩やかに崩れ壊れてく\n[03:17.639]ゆるりゆるり首を絞めるように\n[03:19.770]昨日までの僕が殺されていく\n[03:22.310]緩やかに離れ離れ飽く\n[03:27.190]ぐらりんり君にきこえるのは\n[03:29.389]僕が知らない声になってく`
 },
 {
  name: 'Harmonia',
  author: 'ミト',
  url: 'https://music.163.com/song/media/outer/url?id=34852145.mp3',
  img: 'https://p2.music.126.net/LrSXxcxZP0WlKPpcAEfIxA==/3315027558535672.jpg',
  lrc: `[00:12.00]My older self as 100 is talking to me\n[00:20.28]Multiply the tiny things which I like doing\n[00:26.91]It will make the sky bluer and bluer\n[00:34.21]More than ever before\n[00:40.96]It will make me smile a little more\n[00:59.98]My older self as 100 is talking to me\n[01:08.71]Link together the notes I love\n[01:11.78]It’ll become a harmony\n[01:15.28]The sounds are sweeter and sweeter\n[01:21.90]Echoing nicely around me\n[01:56.78]The sky is bluer and bluer\n[02:03.82]More than ever before\n[02:10.32]It will make me smile a little more\n[02:16.64]What will I talk to younger self\n[02:23.51]If I were 100 years old`
 }
]

const keywords = ref('')
const tableData = ref(items)
const p_img = profile_img;

const languagelist = [
    {'value':'国语','label':'国语'},
    {'value':'日语','label':'日语'},
    {'value':'英语','label':'英语'},
];
const languagetype = [{text:'国语',value:'国语'},{text:'日语',value:'日语'},{text:'英语',value:'英语'}]
const songdata = {
    "songname": ref(''),
    "songauthor": ref(''),
    "songlanguage": ref(''),
    "bz":ref(''),
    "songtype":"",
}


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
function fuzhi(row,column,event){
    // console.log(row, event, column)
    const { toClipboard } = useClipboard();
    let Msg = '点歌 '+ row.name
    toClipboard(Msg)
    ElMessage({
        message:row.name+' 成功复制到剪贴板',
        type:'success'
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
    router.push('/Edit')
}

function filterHandler(value,row,column){
    const property = column['property'];    // column['property']值为属性名·
    return row[property] === value
}

onMounted(() =>{
    getsonglist()
    songdata.songlanguage.value = languagelist[0].value
})
</script>


<template>
    <div class="container">
        <el-container>
            <el-header>
                <el-col :span="8">
                    <lbAudio :musicList="musicList" :volume="25" :lyrics="true"></lbAudio>
                </el-col>
                <el-col :span="8">
                    <a href="https://live.bilibili.com/32212815">
                        <el-avatar shape="circle" :size="250" class="rotate-avatar" :src=p_img />
                    </a>
                </el-col>
                <el-col :span="1">
                    <el-button round="round" title="前往神秘地址" @click="routeredit" class="shenmi"></el-button>
                </el-col>
                <!-- <el-col :span="1" :push="6">
                    <el-button round="round" title="前往神秘地址" @click="routeredit" class="shenmi"></el-button>
                    </el-col> -->        
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="24">
                        <p class="p1">擅长的歌 {{tableData.length }}</p>
                        <p class="p2">轻点歌名可以复制</p>
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
                    <el-table :data="tableData" stripe style="width: 100%" @row-click="fuzhi" empty-text="歌单里没有诶~隐藏歌单碰碰运气!">
                        <el-table-column prop="name" label="歌名" align="center"  min-width="40%"/>
                        <el-table-column prop="author" label="歌手" align="center"  min-width="20%"/>
                        <el-table-column prop="language" label="语言" align="center"  min-width="20%" :filters=languagetype :filter-method="filterHandler"/>
                        <el-table-column prop="bz" label="备注" align="center"  min-width="20%"/>
                    </el-table>
                </el-row>
            </el-main>
            <el-footer>
                Copyright © 奇奇怪怪的东西又增加了
            </el-footer>
        </el-container>
    </div>
</template>

<style scoped>
.el-header{
    display: flex;
    height:100%;
}
.el-row{
    display:flex;
    flex-wrap: wrap;
}
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
.insertbutton{
    width: 20%;
}
.shenmi{
    width: 20%;
    background-color: burlywood;
}
</style>
